<template>
  <div class="container">
    <BaseHeader />
    <h4 class="title">{{ $t('walletBalance') }}</h4>
    <div class="content">
      <div class="balance-item bg1">
        <div class="balance-item-left">
          <p class="icon cFIL"></p>
          <p>cFIL</p>
          <p>{{ $t('balance') }}</p>
        </div>
        <p class="balance">{{ wallet.walletCFil | decimals }}</p>
        <router-link tag="p" to="/swap" class="balance-item-btn">
          {{ $t('swap') }}
        </router-link>
      </div>
      <div class="balance-item bg2">
        <div class="balance-item-left">
          <p class="icon CRFI"></p>
          <p>CRFI</p>
          <p>{{ $t('balance') }}</p>
        </div>
        <p class="balance">{{ wallet.walletCRFI | decimals }}</p>
      </div>
      <div class="balance-item bg3">
        <div class="balance-item-left">
          <!-- <p class="icon CRFI"></p> -->
          <p>sFIL</p>
          <p>{{ $t('balance') }}</p>
        </div>
        <p class="balance">{{ wallet.walletSFil | decimals }}</p>
        <router-link tag="p" to="/staking" class="balance-item-btn">
          {{ $t('stake') }}
        </router-link>
      </div>
      <h4 class="title">{{ $t('myPositions') }}</h4>
      <div style="text-align: right; margin-bottom: 24px; margin-right: 24px; ">
        <span @click="Withdraw" class="withdraw" style="background: #18CED2">
          {{ $t('withdrawAll') }}
        </span>
      </div>

      <div class="item" v-for="(item, index) in userList" :key="index">
        <div class="item-left">
          <p
            class="item-date"
            style="padding: 8px 0; flex: 1"
            v-html="
              item.Days != 0 ? item.Days + ' ' + $t('day') : $t('onDemand')
            "
          >
            {{}}
          </p>

          <p
            class="item-coin item-coin-c"
            :class="item.Type == 0 ? 'item-coin-c' : 'item-coin-f'"
          >
            {{ item.Type == 0 ? 'CRFI' : 'CFil' }}
          </p>
        </div>
        <div class="item-right">
          <span
            class="withdraw"
            :class="item.Type == 0 ? 'item-coin-c' : 'item-coin-f'"
            @click="WithdrawDemand(item.Type)"
            v-if="item.Days == 0"
          >
            {{ $t('withdraw') }}
          </span>
          <!-- <div class="item-rate" v-if="item.Type == 0">
            {{ item.CRFIInterestRate }}
            CRFI: +{{ item.CRFIInterestRate | rate }}% cFIL: +
            {{ item.CFilInterestRate | rate }}%
          </div>
          <div class="item-rate" v-else>
            cFIL: +
            {{ item.CFilInterestRate | rate }}% CRFI: +{{
              item.CRFIInterestRate | rate
            }}%
          </div> -->

          <div class="item-rate" v-if="item.Type == 0">
            <span> CRFI: {{ getRate(item) | rate }}% </span>
            <span>+</span>
            <span>
              CFIL:
              {{ getCFilRate(item) | rate }}%
            </span>
          </div>
          <div class="item-rate" v-else>
            <span>
              CFIL:
              {{ getCFilRate(item) | rate }}%
            </span>
            <span>+</span>
            <span> CRFI: {{ getRate(item) | rate }}% </span>
          </div>
          <p class="item-balance">{{ item.Amount | decimals }}</p>
          <div class="income-box" v-if="item.Type == 0">
            <div class="income">
              <!-- {{ $t('profit') }}: -->
              {{ item.EndTime && getEndTime(item.EndTime) }}
              <!-- {{ getEndTime(item.EndTime) }} -->
            </div>
            <div class="income">
              <p>CRFI {{ $t('profit') }}</p>
              <p class="income-text">+ {{ item.CRFIInterest | decimals }}</p>
            </div>
            <div class="income">
              <p>cFil {{ $t('profit') }}</p>
              <p class="income-text">+ {{ item.CFilInterest | decimals }}</p>
            </div>
          </div>
          <div class="income-box" v-else>
            <div class="income">
              <!-- {{ $t('profit') }}: -->
              {{ item.EndTime && getEndTime(item.EndTime) }}
            </div>
            <div class="income">
              <p>cFil {{ $t('profit') }}</p>
              <p class="income-text">+ {{ item.CFilInterest | decimals }}</p>
            </div>
            <div class="income">
              <p>CRFI {{ $t('profit') }}</p>
              <p class="income-text">+ {{ item.CRFIInterest | decimals }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import BigNumber from 'bignumber.js'
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      currentRate: 0,
    }
  },
  computed: {
    cfilPrice() {
      return this.$store.state.cfilPrice
    },
    crfiPrice() {
      return this.$store.state.crfiPrice
    },
    wallet() {
      return this.$store.state.wallet
    },
    userList() {
      return this.$store.state.userList
    },
    showLoading() {
      return this.$store.state.showLoading
    },
    text() {
      return this.currentRate.toFixed(0) + '%'
    },
  },
  async mounted() {},

  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['Withdraw', 'WithdrawDemand']),
    getEndTime(value) {
      return moment(value * 1000).format('YYYY-MM-DD')
    },
    getRate(data) {
      let { Type, Amount = 1, CRFIInterestRate } = data
      if (Amount == 0) {
        Amount = 1
      }

      if (Type == 1) {
        // CFil
        if (this.crfiPrice == 1 || this.cfilPrice == 1) {
          return CRFIInterestRate
        }
        let result = new BigNumber(this.crfiPrice)
          .times(new BigNumber(CRFIInterestRate))
          .div(new BigNumber(this.cfilPrice))
        return result.toString()
      } else {
        return CRFIInterestRate
      }
    },
    getCFilRate(data) {
      let { Type, CFilInterestRate } = data
      if (Type == 0) {
        if (this.crfiPrice == 1 || this.cfilPrice == 1) {
          return CFilInterestRate
        }
        let result = new BigNumber(this.cfilPrice)
          .times(new BigNumber(CFilInterestRate))
          .div(new BigNumber(this.crfiPrice))
        return result.toString()
      } else {
        return CFilInterestRate
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1f8aff;
  background: #3f495a url('../../assets/images/bg.png') no-repeat;
  background-size: cover;
  color: #fff;
  .content {
    flex: 1;
  }
}
.title {
  margin: 12px 0;
}
.balance-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 104px;

  margin: 0 21px 12px 15px;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  padding: 0 15px;
  font-size: 19px;
  font-family: Montserrat;
  font-weight: 500;
  color: #ffffff;
}
.balance-item-btn {
  position: absolute;
  right: 18px;
  bottom: 10px;
  width: 73px;
  height: 20px;
  line-height: 20px;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 5px;
  font-size: 10px;
  font-family: Montserrat;
  font-weight: 400;
  color: #1f8aff;
}
.withdraw {
  display: inline-block;
  //
  width: 73px;
  height: 20px;
  line-height: 20px;
  background: #ffffff;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 5px;
  text-align: center;
  font-size: 10px;
  font-family: Montserrat;
  font-weight: 400;
  color: #ffffff;
}
.bg1 {
  background: #2786ff;
}
.bg2 {
  background: #0fced2;
}
.bg3 {
  background: #6e4af7;
}

.item {
  display: flex;
  width: 328px;
  // height: 104px;
  margin: 0 auto 12px;
  background: #333b4b;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  border-radius: 10px;
  padding: 12px 10px;
  color: #fff;
  font-size: 10px;
  font-family: Segoe UI;
  &-left {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    width: 64px;
    height: 74px;
    background: #404b5d;
    margin-right: 12px;
    border-radius: 10px;
    // line-height: 1;
    font-size: 14px;
    font-family: Segoe UI;
    font-weight: bold;
    color: #ffffff;
    opacity: 1;
    .item-date {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
  &-coin {
    height: 24px;
    line-height: 24px;
    font-weight: 300;
    font-size: 12px;
  }
  &-coin-c {
    background: #18ced2;
  }
  &-coin-f {
    background: #2786ff;
  }

  &-right {
    flex: 1;
    text-align: right;
  }
  &-rate {
    text-align: left;
  }
  &-balance {
    margin: 10px 0 10px;
    font-size: 22px;
    font-weight: bold;
    line-height: 26px;
    color: #ffffff;
    opacity: 1;
  }
  .income-box {
    display: flex;
    justify-content: flex-end;
  }
  .income {
    margin-left: 10px;
    &-text {
      font-size: 9px;
      font-family: Segoe UI;
      font-weight: 400;
      line-height: 11px;
      color: #22d18c;
      opacity: 1;
    }
  }
}

.icon {
  display: inline-block;
  width: 26px;
  height: 26px;
}
.cFIL {
  height: 36px;
  width: 36px;
  background: url('../../assets/icon/cFIL-wallet.png') no-repeat;
  background-size: cover;
}
.CRFI {
  background: url('../../assets/icon/CRFI-wallet.png') no-repeat;
  background-size: cover;
}
</style>
