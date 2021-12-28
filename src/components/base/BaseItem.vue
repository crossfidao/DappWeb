<template>
  <div :class="$store.state.daynight ? 'item1' : 'item'" @click.capture="showMask = true" :style="getStyle(index)">
    <div class="item-title">
      <span :class="$store.state.daynight ? 'chc' : 'font-style3'">APY: {{ getApy() | rate }}%</span>
      <span :class="$store.state.daynight ? 'chc' : 'font-style3'" class="item-date">
        {{ info.Days != 0 ? info.Days + ' ' + $t('day') : $t('onDemand') }}
      </span>
    </div>
    <div class="item-rate">
      <span class="icon CRFI"></span> <span :class="$store.state.daynight ? 'chc' : 'font-style3'" style="font-weight:600;white-space:nowrap">
        <!-- {{ info.CRFIInterestRate | rate }}% -->
        CRFI: {{ getRate(info) | rate }}%
      </span> <span :class="$store.state.daynight ? 'chc' : 'chc1'" style="padding:0 2px;">+</span> <span class="icon cFIL"></span>
      <span :class="$store.state.daynight ? 'chc' : 'font-style3'" style="font-weight:600;white-space:nowrap">
        cFIL:
        <!-- {{ info.CFilInterestRate | rate }}% -->
        {{ getCFilRate(info) | rate }}%
      </span>
    </div>
    <div class="line"></div>
    <div class="item-total flex-row" style="justify-content: space-between;">
      <p :class="$store.state.daynight ? 'chc' : 'font-style3'" style="font-size: 13px;">{{ $t('totalDeposit') }}</p>
      <p class="item-total-number font-style4">
        {{ info.Total | decimals }}
        <!-- 11{{ info.Amount || 0 | decimals }} {{ info.Type == 0 ? 'CRFI' : 'CFIL' }} -->
        <span :class="$store.state.daynight ? 'dark-f1' :''" class="item-total-type">{{info.Type == 0 ? 'CRFI' : 'cFIL'}}</span>
      </p>
    </div>
    <van-overlay class="mask" :show="showMask" @click.self="showMask = false" z-index="9999">
      <div :class="$store.state.daynight ? 'dark-f2' : ''" class="mask-content">
        <van-icon name="cross" color="#8790A9" class="close" @click.self="showMask = false" />
        <h4 :class="$store.state.daynight ? 'chc' : ''" class="mask-title">{{ $t('purchase') }}</h4>
        <div class="mask-item">
          <span :class="$store.state.daynight ? 'chc' : ''" class="mask-label" style="color:#4c5a7f">{{ $t('cycle1') }}</span>
          <p :class="$store.state.daynight ? 'chc' : ''" class="mask-item-text" style="color:#4c5a7f">
            {{ info.Days != 0 ? info.Days + ' ' + $t('day') : 'On Demand' }} </p>
        </div>
        <div class="mask-item">
          <span :class="$store.state.daynight ? 'chc' : ''" class="mask-label" style="color:#4c5a7f">{{ $t('profit1') }}</span>
          <p class="mask-item-text" style="color:#4c5a7f">
            <span :class="$store.state.daynight ? 'chc' : ''">CRFI: {{ getRate(info) | rate }}%</span>
            <span :class="$store.state.daynight ? 'chc' : ''"> + </span>
            <span :class="$store.state.daynight ? 'chc' : ''">cFIL: {{ getCFilRate(info) | rate }}%</span>
          </p>
        </div>
        <!-- <div class="mask-text">
          <p>
            {{ info.Days != 0 ? info.Days + ' ' + $t('day') : 'On Demand' }}
          </p>
          <div class="mask-rate">
            <span class="icon CRFI"></span>
            <span>CRFI: {{ getRate(info) | rate }}%</span>
            <span> - </span>
            <span class="icon cFIL"></span>
            <span>CFIL: {{ getCFilRate(info) | rate }}%</span>
          </div>
        </div> -->
        <!-- <div class="mask-desc">
          <p class="mask-desc-balance">
            {{
              info.Type == 1 ? wallet.walletCFil : wallet.walletCRFI | decimals
            }}
          </p>
        </div> -->
        <div class="form">
          <van-field :class="$store.state.daynight ? 'dark-f3' : ''" center type="number" clearable v-model="value" :placeholder="$t('purchaseAmount')" style="
background: #FAFAFA;    border-radius: 10px;" />
        </div>
        <p class="mask-desc" style="color:#4c5a7f">
          <span class="icon" :class="info.Type == 0 ? 'CRFI' : 'cFIL'"> </span> <span :class="$store.state.daynight ? 'chc' : ''">
            {{ info.Type == 0 ? 'CRFI' : 'cFIL' }} {{ $t('balance') }}
          </span> <span :class="$store.state.daynight ? 'chc' : ''">{{
            info.Type == 1 ? wallet.walletCFil : wallet.walletCRFI | decimals
          }}</span>
        </p>
        <div class="confirm" @click="handleConfirm">
          {{ $t('confirm') }}
        </div>
        <!-- <div class="footer">
          <div class="footer-btn" @click="showMask = false">
            {{ $t('cancel') }}
          </div>
          <div class="footer-btn" @click="handleConfirm">
            {{ $t('confirm') }}
          </div>
        </div> -->
      </div>
    </van-overlay>
  </div>
</template>

<script>
  import common from '@/utils/mixinsCommon'
  import { mapActions, mapMutations } from 'vuex'
  import BigNumber from 'bignumber.js'

  export default {
    mixins: [common],
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
      cfilPrice() {
        return this.$store.state.cfilPrice
      },
      crfiPrice() {
        return this.$store.state.crfiPrice
      },
      wallet() {
        return this.$store.state.wallet
      },
      balance() {
        return this.$store.state.balance
      },
    },
    async mounted() {
      let invite = this.getQueryString('invite') || ''
      this.inviteValue = invite
    },
    methods: {
      ...mapMutations(['setUserAddress']),
      ...mapActions(['initData', 'buyCoin', 'demandBuyCoin', 'getKeyValue']),
      getQueryString(name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) {
          return decodeURIComponent(r[2])
        }
        return null
      },
      getApy() {
        let crfi = this.getRate(this.info)
        let cfil = this.getCFilRate(this.info)
        return new BigNumber(crfi).plus(new BigNumber(cfil))
      },
      getRate(data) {
        let { Type, Amount = 1, CRFIInterestRate, CRFIInterestRateDyn } = data
        if (Amount == 0) {
          Amount = 1
        }
        if (Type == 1) {
          // CFil
          if (this.crfiPrice == 1 || this.cfilPrice == 1) {
            return CRFIInterestRateDyn
          }
          let result = new BigNumber(this.crfiPrice)
            .times(new BigNumber(CRFIInterestRateDyn))
            .div(new BigNumber(this.cfilPrice))
          return result.toString()
        } else {
          return CRFIInterestRateDyn
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
      getStyle(index) {
        let target = index % 5
        let arr = ['#F57620', '#B406C3', '#3655E7', '#7CB732', '#6D06C3']
        return `background-color: ${arr[target]}`
      },
      handleConfirm() {
        if (!this.value) {
          this.$toast(this.$t('toast'))
          return
        }
        this.buyCoin({
          ...this.info,
          value: this.value,
          inviteValue: this.inviteValue,
        })
        // if (!this.info.ID) {
        //   this.demandBuyCoin({
        //     ...this.info,
        //     value: this.value,
        //     inviteValue: this.inviteValue,
        //   })
        // } else {
        // }
        this.showMask = false
        this.value = ''
      },
    },
  }
</script>

<style lang="scss" scoped>
  .dark-f1 {
    color: #fff !important;
  }
  .flex-row {
    display: flex;
    align-items: center;
  }
  .item1 {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 340px;
    // height: 88px;

    background: #2F303B !important;
    box-shadow: 0px 2px 5px 0px rgba(0, 1, 0, 0.1);
    // background-image: url('../../assets/images/bowen.png') !important;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0 auto 15px;
    opacity: 1;
    padding: 16px;
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
      padding: 10px 0 16px 0;
      // border-bottom: 1px solid #c1c1c1;
      font-family: Segoe UI;
      font-weight: bold;
      line-height: 16px;
      color: #ffffff;
      text-align: left;
    }

    .line {
      height: 1px;
      background: #EBEBEB;
      opacity: 0.3;
    }

    &-total {
      margin-top: 10px;
      text-align: left;
      font-size: 12px;
      font-family: Segoe UI;
      font-weight: 600;
      line-height: 13px;
      color: #ffffff;

      &-number {
        margin-top: 4px;
        font-weight: 600;
        font-size: 22px;
        line-height: 100%;
        color: #ffffff;
      }

      &-type {
        margin-left: 4px;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        color: #fff !important;
      }
    }
  }
  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 340px;
    // height: 88px;

    background: #ffffff !important;
    box-shadow: 0px 2px 5px 0px rgba(0, 1, 0, 0.1);
    // background-image: url('../../assets/images/bowen.png') !important;
    background-size: cover;
    background-repeat: no-repeat;
    margin: 0 auto 15px;
    opacity: 1;
    padding: 16px;
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
      padding: 10px 0 16px 0;
      // border-bottom: 1px solid #c1c1c1;
      font-family: Segoe UI;
      font-weight: bold;
      line-height: 16px;
      color: #ffffff;
      text-align: left;
    }

    .line {
      height: 1px;
      background: #EBEBEB;
      opacity: 0.3;
    }

    &-total {
      margin-top: 10px;
      text-align: left;
      font-size: 12px;
      font-family: Segoe UI;
      font-weight: 600;
      line-height: 13px;
      color: #ffffff;

      &-number {
        margin-top: 4px;
        font-weight: 600;
        font-size: 22px;
        line-height: 100%;
        color: #ffffff;
      }

      &-type {
        margin-left: 4px;
        font-style: normal;
        font-weight: 500;
        font-size: 12px;
        color: #394255;
      }
    }
  }
  .icon {
    display: inline-block;
    width: 13px;
    height: 13px;
    // margin-right: 4px;
  }
  .cFIL {

    background: url('~@/assets/images/cfil.png') no-repeat;
    background-size: 100% 100%;
  }
  .CRFI {
    background: url('../../assets/images/crfi.png') no-repeat;
    background-size: 100% 100%;
  }

  .mask {
    &-content {
      width: 320px;
      position: absolute;
      z-index: 99;
      bottom: 35px;
      left: 50%;
      transform: translateX(-50%);
      background: #fff;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      padding-bottom: 20px;
      border-radius: 12px;
      font-size: 13px;
      font-family: Segoe UI;
      font-weight: bold;
      line-height: 16px;
      color: #ffffff;
    }

    .close {
      position: absolute;
      right: 18px;
      top: 18px;
    }

    &-title {
      text-align: left;
      margin: 0 18px;
      padding: 18px 0;
      color: #4c5a7f;
      border-bottom: 0.5px solid #4c5a7f;
    }

    &-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 18px;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      text-transform: uppercase;
      color: #c2c7d4;

      &-text {
        font-weight: 500;
        font-size: 14px;
        text-align: left;
        text-transform: capitalize;
        color: #ffffff;
      }
    }

    &-text {
      margin-left: 18px;
      margin-bottom: 24px;
      text-align: left;
    }

    &-desc {
      text-align: left;
      margin-bottom: 16px;
      margin-left: 18px;
      font-size: 10px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #fff;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 16px;
      color: #ffffff;

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

    .confirm {
      height: 56px;
      line-height: 56px;
      margin: 0 18px;
      background: #5acbd0;
      border-radius: 12px;
      font-weight: 500;
      font-size: 18px;
      color: #ffffff;
    }

    .footer {
      display: flex;
      justify-content: center;
      margin-top: 20px;

      &-btn {
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
    background: #fff;
    margin-bottom: 10px;
    color: #4c5a7f;
    border-radius: 10px;
  }
  /deep/ .van-field__control {
    color: #4c5a7f;
  }
  .font-style3 {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #394255;
  }
  .font-style4 {
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #5ACBD0;
    display: flex;
  }
  .chc {
    color: #fff !important;
  }
  .chc1 {
    color: #2c3546;
  }
  .dark-f2 {
    color: #fff !important;
    background: #2F303B !important;
  }
  .dark-f3 {
    color: #fff;
    background: #4B4C56 !important;

    /deep/ input {
      color: #fff;
    }
  }
</style>
