<template>
  <div class="item" @click.capture="showMask = true" :style="getStyle(index)">
    <div class="item-title">
      <span>APY</span>
      <span class="item-date">
        {{ info.Days != 0 ? info.Days + ' ' + $t('day') : $t('onDemand') }}
      </span>
    </div>
    <div class="item-rate">
      <span class="icon CRFI"></span>
      <span>
        CRFI: {{ info.CRFIInterestRate | rate }}%
        {{ getRate(info) }}
      </span>
      <span>+</span>
      <span class="icon cFIL"></span>
      <span
        >CFIL: {{ info.CFilInterestRate | rate }}%
        {{ getCFilRate(info) | rate }}
      </span>
    </div>
    <div class="item-total">
      <p>{{ $t('totalDeposit') }}</p>
      <p>
        {{ info.Amount || 0 | decimals }} {{ info.Type == 0 ? 'CRFI' : 'CFIL' }}
      </p>
    </div>
    <van-overlay class="mask" :show="showMask" @click.self="showMask = false">
      <div class="mask-content">
        <h4 class="mask-title">{{ $t('purchase') }}</h4>
        <div class="mask-text">
          <p>
            {{ info.Days != 0 ? info.Days + ' ' + $t('day') : 'On Demand' }}
          </p>
          <div class="mask-rate">
            <span class="icon CRFI"></span>
            <span>CRFI: {{ info.CRFIInterestRate | rate }}%</span>
            <span> - </span>
            <span class="icon cFIL"></span>
            <span>CFIL: {{ info.CFilInterestRate | rate }}%</span>
          </div>
        </div>
        <div class="mask-desc">
          <p class="mask-desc-name">
            <span class="icon CRFI"></span>
            <span>
              {{ info.Type == 0 ? 'CRFI' : 'cFIL' }} {{ $t('balance') }}
            </span>
          </p>
          <p class="mask-desc-balance">
            {{
              info.Type == 1 ? wallet.walletCFil : wallet.walletCRFI | decimals
            }}
            <!--  -->
          </p>
        </div>
        <div class="form">
          <van-field
            class="field"
            center
            type="number"
            clearable
            v-model="value"
            :placeholder="$t('purchaseAmount')"
          />
        </div>
        <div class="footer">
          <div class="footer-btn" @click="showMask = false">
            {{ $t('cancel') }}
          </div>
          <div class="footer-btn" @click="handleConfirm">
            {{ $t('confirm') }}
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import BigNumber from 'bignumber.js'
export default {
  name: 'BaseFooter',
  props: {
    index: {
      type: Number,
    },
    title: {
      type: String,
      default: 'depositCoins',
    },
    info: {
      type: Object | Array,
      default: () => {
        return {
          ID: 0,
          Type: 0,
          Days: 90,
          CRFIInterestRate: 2.7,
          CFilInterestRate: 3.2,
        }
      },
    },
  },
  data() {
    return {
      showMask: false,
      value: '',
    }
  },
  computed: {
    wallet() {
      return this.$store.state.wallet
    },
    balance() {
      return this.$store.state.balance
    },
  },
  mounted() {
    let invite = this.getQueryString('invite') || ''
    this.inviteValue = invite
  },
  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['initData', 'buyCoin', 'demandBuyCoin']),
    getQueryString(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return decodeURIComponent(r[2])
      }
      return null
    },
    getRate(data) {
      let { Type, Amount = 1, CRFIInterestRate } = data
      console.log(Type, data, Amount)
      if (Amount == 0) {
        Amount = 1
      }

      if (Type == 1) {
        // CFil
        let value = '24'
        let result = new BigNumber(value)
          .times(new BigNumber(CRFIInterestRate))
          .div(new BigNumber(Amount))
          .times(new BigNumber(100))

        console.log(parseFloat(result.toString()))

        return parseFloat(result.toString()).toFixed(2)
      } else {
        return CRFIInterestRate
      }
    },
    getCFilRate(data) {
      let { Type, CFilInterestRate } = data
      console.log(Type, data)
      if (Type == 0) {
        // CFil
        CFilInterestRate
        return 100
      } else {
        return CFilInterestRate
      }
    },
    getStyle(index) {
      let target = index % 5
      let arr = ['#F57620', '#B406C3', '#3655E7', '#7CB732', '#6D06C3']
      return `background: ${arr[target]}`
    },
    handleConfirm() {
      if (!this.value) {
        this.$toast(this.$t('toast'))
        return
      }
      if (!this.info.ID) {
        this.demandBuyCoin({
          ...this.info,
          value: this.value,
          inviteValue: this.inviteValue,
        })
      } else {
        this.buyCoin({
          ...this.info,
          value: this.value,
          inviteValue: this.inviteValue,
        })
      }
      this.showMask = false
      this.value = ''
    },
  },
}
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 265px;
  height: 88px;
  background: #6d06c3;
  background-image: url('../../assets/images/bowen.png') !important;
  margin: 0 auto 9px;
  opacity: 1;
  padding: 12px;
  border-radius: 13px;
  font-size: 13px;
  color: #fff;
  &-title {
    display: flex;
    justify-content: space-between;
  }
  &-date {
    font-size: 12px;
    font-family: Montserrat;
    font-weight: bold;
    line-height: 15px;
    color: #ffffff;
  }
  &-rate {
    display: flex;
    align-items: center;

    font-family: Segoe UI;
    font-weight: bold;
    line-height: 16px;
    color: #ffffff;
    text-align: left;
  }
  &-total {
    margin-top: 10px;
    text-align: right;
    font-size: 11px;
    font-family: Segoe UI;
    font-weight: 600;
    line-height: 13px;
    color: #ffffff;
  }
}
.icon {
  display: inline-block;
  width: 13px;
  height: 13px;
  margin-right: 4px;
}
.cFIL {
  background: url('../../assets/icon/cFIL-white.png') no-repeat;
  background-size: cover;
}
.CRFI {
  background: url('../../assets/icon/CRFI-white.png') no-repeat;
  background-size: cover;
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
      width: 87px;
      height: 32px;
      margin: 0 14px;
      line-height: 32px;
      background: #fff;
      color: #1f8aff;
      border-radius: 22px;
      font-size: 15px;
      font-family: Segoe UI;
      font-weight: 600;
      color: #1f8aff;
    }
  }
}
.form {
  padding: 0 16px;
}
.field {
  height: 42px;
  line-height: 42px;
  background: #2c3546;
  margin-bottom: 10px;
  color: #fff;
  border-radius: 10px;
}
/deep/ .van-field__control {
  color: #fff;
}
</style>
