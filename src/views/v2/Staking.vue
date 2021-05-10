<template>
  <div class="container home">
    <BaseHeader :isBack="true" />
    <div class="content">
      <div class="stake" style="text-align: right">
        <router-link tag="span" to="/staking1" class="stake-btn">
          {{ $t('stake') }}
        </router-link>
      </div>
      <div class="items">
        <div class="item">
          <span class="item-label">{{ $t('sFILAssets') }}:</span>
          <span class="item-content">{{ wallet.walletSFil | decimals }}</span>
        </div>
        <!-- <div class="item">
          <span class="item-label">{{ $t('pledge') }}:</span>
          <span class="item-content">213213.232</span>
        </div> -->
      </div>
      <div class="items">
        <h4 class="item-title">{{ $t('borrow') }}</h4>
        <div class="item">
          <span class="item-label">{{ $t('loanApy') }}:</span>
          <span class="item-content">{{ loanCFil.APY | rate }} %</span>
        </div>
        <div class="item">
          <span class="item-label">{{ $t('paymentDue') }}:</span>
          <span class="item-content">{{ loanCFil.PaymentDue | decimals }}</span>
        </div>
        <div class="item">
          <span class="item-label">{{ $t('pledgeRate') }}:</span>
          <span class="item-content">{{ loanCFil.PledgeRate | rate }} % </span>
        </div>
        <!-- <div class="item">
          <span class="item-label">{{ $t('totalsFIL') }}:</span>
          <span class="item-content">213213.232</span>
        </div> -->
        <div class="item-btn">
          <span class="btn" @click="handleBorrow">{{ $t('borrow') }}</span>
          <span class="btn" @click="handleRepay">{{ $t('repay') }}</span>
        </div>
      </div>

      <div class="items">
        <h4 class="item-title">{{ $t('market') }}</h4>
        <div class="item">
          <span class="item-label">{{ $t('totalsFIL') }}:</span>
          <span class="item-content">{{ totalSupply | decimals }}</span>
        </div>
      </div>
    </div>
    <van-overlay class="mask" :show="showMask" @click.self="showMask = false">
      <div class="mask-content">
        <h4 class="mask-title">{{ $t('cFILLoan') }}</h4>
        <div class="form">
          <van-field
            class="field"
            center
            clearable
            v-model="value"
            :placeholder="$t('purchaseAmount')"
          />
          <!-- <span class="max">{{ $t('max') }}</span> -->
        </div>
        <div class="item">
          <span class="item-label">{{ $t('availableMarket') }}:</span>
          <span class="item-content">
            {{ systemInfo.avaiCFilAmount | decimals }}
          </span>
        </div>
        <div class="item">
          <span class="item-label">{{ $t('loanApy') }}:</span>
          <span class="item-content">{{ loanCFil.APY | rate }} %</span>
        </div>

        <div class="item">
          <span class="item-label">{{ $t('pledgeRate') }}:</span>
          <span class="item-content">{{ loanCFil.PledgeRate | rate }} % </span>
        </div>
        <!-- <div class="item">
          <span class="item-label">{{ $t('pledgeRate') }}:</span>
          <span class="item-content">213213.232</span>
        </div> -->
        <div class="footer">
          <div class="footer-btn" @click="handleConfirm">
            {{ $t('confirm') }}
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- repay -->
    <van-overlay
      class="mask"
      :show="showRepayMask"
      @click.self="showRepayMask = false"
    >
      <div class="mask-content">
        <h4 class="mask-title">{{ $t('cFILRepay') }}</h4>
        <div class="form">
          <van-field
            class="field"
            center
            clearable
            v-model="repayValue"
            :placeholder="$t('purchaseAmount')"
          />
          <!-- <span class="max">{{ $t('max') }}</span> -->
        </div>
        <div class="item">
          <span class="item-label">{{ $t('myLoan') }}:</span>
          <span class="item-content">{{ loanInvest.Lending | decimals }}</span>
        </div>
        <div class="item">
          <span class="item-label">{{ $t('pledgeRate') }}:</span>
          <!-- TODO: 计算 lending/pledge-->
          <span class="item-content">{{ pledgeRate | decimals }}</span>
        </div>
        <div class="item">
          <span class="item-label">{{ $t('walletBalance') }}:</span>
          <span class="item-content">{{ wallet.walletCFil | decimals }}</span>
        </div>
        <div class="item">
          <span class="item-label">{{ $t('loanApy') }}:</span>
          <span class="item-content">{{ loanCFil.APY | rate }} %</span>
        </div>
        <div class="footer">
          <div class="footer-btn" @click="handleRepayConfirm">
            {{ $t('confirm') }}
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      showMask: false,
      showRepayMask: false,
      currentRate: 0,
      value: '',
      repayValue: '',
      totalSupply: '',
    }
  },
  computed: {
    loanInvest() {
      console.log('this.$store.state.loanInvest', this.$store.state.loanInvest)
      return this.$store.state.loanInvest
    },
    pledgeRate() {
      return this.$store.getters.pledgeRate
    },
    wallet() {
      return this.$store.state.wallet
    },
    systemInfo() {
      return this.$store.state.systemInfo
    },
    loanCFil() {
      return this.$store.state.loanCFil
    },
  },
  async mounted() {
    this.totalSupply = await this.getTotalSupply()
  },
  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['init', 'stake', 'getTotalSupply']),
    getStyle(index) {
      let target = index % 5
      let arr = ['#F57620', '#B406C3', '#3655E7', '#7CB732', '#6D06C3']
      return `background: ${arr[target]}`
    },
    handleBorrow() {
      this.showMask = true
    },
    handleRepay() {
      this.showRepayMask = true
    },
    handleConfirm() {
      this.stake({
        mode: 4,
        value: this.value,
      })
    },
    handleRepayConfirm() {
      this.stake({
        mode: 5,
        value: this.repayValue,
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  z-index: 999;
}
.container {
  height: 100%;
  background: #414447;
  color: #fff;
  .content {
    padding-bottom: 24px;
  }
}
.content {
  padding: 0 32px;
}
.stake {
}
.stake-btn {
  display: inline-block;
  width: 127px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #6e4af7;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 10px;
  font-size: 18px;
  font-family: Montserrat;
  font-weight: 500;
  color: #ffffff;
}
.items {
  background: #3f4c5d;
  margin-top: 15px;
  opacity: 1;
  border-radius: 13px;
  padding: 16px 16px 0;
  font-size: 16px;
  font-family: Montserrat;
  font-weight: 500;
  // color: #ffffff;
  text-align: left;
  .item-title {
    margin-bottom: 20px;
    font-size: 22px;
    font-family: Montserrat;
    font-weight: 500;
    line-height: 27px;
    color: #ffffff;
    text-align: center;
  }
}
.item {
  display: flex;
  // margin-bottom: 20px;
  // color: #000;
  padding-bottom: 16px;
  &-label,
  &-content {
    flex: 1;
  }
  &-label {
    width: 150px;
  }
  &-content {
    text-align: center;
  }
  &-btn {
    display: flex;
    justify-content: space-between;
    .btn {
      width: 127px;
      height: 36px;
      line-height: 36px;
      background: #18ced2;
      margin-bottom: 36px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      border-radius: 10px;
      text-align: center;
    }
  }
}

.mask {
  &-content {
    width: 320px;
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #3f4c5d;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    padding-bottom: 20px;
    border-radius: 13px;
    font-size: 13px;
    font-family: Segoe UI;
    font-weight: bold;
    line-height: 16px;
    color: #ffffff;
  }
  &-title {
    padding: 12px 0;
    font-size: 22px;
    font-family: Montserrat;
    font-weight: 600;
    line-height: 27px;
    color: #ffffff;
  }
  &-text {
    margin-bottom: 24px;
    padding-left: 14px;
    text-align: left;
  }
  &-desc {
    margin-bottom: 16px;
    margin-left: 12px;
    font-size: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #fff;
    &-name {
      display: flex;
      align-items: center;
    }
    &-balance {
      width: 150px;
      height: 24px;
      line-height: 24px;
      background: #2c3546;
      margin-top: 10px;
      border-radius: 10px;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    &-btn {
      width: 108px;
      height: 32px;
      line-height: 32px;
      background: #18ced2;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      opacity: 1;
      border-radius: 10px;
      font-size: 15px;
      font-family: Segoe UI;
      font-weight: 600;
      color: #ffffff;
    }
  }
}
.form {
  display: flex;
  margin-bottom: 24px;
  padding: 0 16px;
  // background: #2c3546;
  .max {
    width: 58px;
    height: 42px;
    line-height: 42px;
    background: #1fced2;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 8px;
  }
  .field {
    height: 42px;
    line-height: 42px;
    background: #2c3546;
    margin-bottom: 10px;
    margin-right: 8px;
    color: #fff;
    border: none !important;
    border-radius: 10px;
  }
}
/deep/ .van-field__control {
  color: #fff;
}
</style>
