<template>
  <div class="container home">
    <BaseHeader :isBack="true" :title="$t('stake')" />
    <div class="content">
      <div class="stake" style="text-align: right">
        <router-link tag="span" replace to="/staking1" class="stake-btn">
          {{ $t('stake1') }}
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
      <div class="items">
        <h4 class="item-title">{{ $t('trusteeship') }}</h4>
        <div class="box" v-for="item in stakingList" :key="item.sid">
          <div
            class="node-box node-read"
            :data-clipboard-text="item.detail.nodeNumber"
          >
            <a :href="`https://filfox.info/address/${item.detail.nodeNumber}`">
              ID: {{ item.detail.nodeNumber }}
            </a>
            <svg
              @click="copy"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.4055 9.77957C10.2652 9.77957 10.1306 9.72382 10.0313 9.62457C9.93208 9.52533 9.87632 9.39073 9.87632 9.25037C9.87632 9.11002 9.93208 8.97542 10.0313 8.87617C10.1306 8.77693 10.2652 8.72117 10.4055 8.72117C10.5412 8.72117 10.6714 8.66726 10.7674 8.5713C10.8633 8.47534 10.9172 8.34518 10.9172 8.20947V3.62308C10.9172 3.48737 10.8633 3.35721 10.7674 3.26125C10.6714 3.16529 10.5412 3.11138 10.4055 3.11138H5.81912C5.68341 3.11138 5.55326 3.16529 5.4573 3.26125C5.36133 3.35721 5.30742 3.48737 5.30742 3.62308C5.30742 3.76343 5.25167 3.89803 5.15242 3.99728C5.05318 4.09652 4.91858 4.15228 4.77822 4.15228C4.63787 4.15228 4.50327 4.09652 4.40402 3.99728C4.30478 3.89803 4.24902 3.76343 4.24902 3.62308C4.24995 3.20695 4.41567 2.80812 4.70992 2.51387C5.00417 2.21962 5.40299 2.0539 5.81912 2.05298H10.4055C10.8217 2.0539 11.2205 2.21962 11.5147 2.51387C11.809 2.80812 11.9747 3.20695 11.9756 3.62308V8.20947C11.9747 8.62561 11.809 9.02443 11.5147 9.31868C11.2205 9.61293 10.8217 9.77865 10.4055 9.77957Z"
                fill="#697594"
              />
              <path
                d="M8.05861 12.0735H3.66611C3.44827 12.0738 3.2325 12.0311 3.03118 11.9478C2.82986 11.8646 2.64695 11.7424 2.4929 11.5884C2.33886 11.4344 2.21672 11.2514 2.13348 11.0501C2.05024 10.8488 2.00754 10.633 2.00781 10.4152V6.00519C2.00745 5.78729 2.05008 5.57145 2.13328 5.37005C2.21648 5.16865 2.3386 4.98565 2.49266 4.83153C2.64671 4.67741 2.82966 4.55521 3.03102 4.47193C3.23239 4.38864 3.44821 4.34592 3.66611 4.34619H8.05861C8.27646 4.34592 8.49223 4.38862 8.69354 4.47186C8.89486 4.5551 9.07778 4.67724 9.23183 4.83128C9.38587 4.98532 9.50801 5.16824 9.59125 5.36956C9.67449 5.57088 9.71719 5.78664 9.71691 6.00449V10.4145C9.73441 11.3322 8.97631 12.0735 8.05861 12.0735ZM3.66611 5.40459C3.58715 5.40394 3.50885 5.41901 3.43577 5.44893C3.36269 5.47884 3.2963 5.52301 3.24047 5.57884C3.18463 5.63468 3.14047 5.70107 3.11055 5.77415C3.08063 5.84723 3.06556 5.92553 3.06621 6.00449V10.4145C3.06556 10.4935 3.08063 10.5718 3.11055 10.6448C3.14047 10.7179 3.18463 10.7843 3.24047 10.8401C3.2963 10.896 3.36269 10.9401 3.43577 10.9701C3.50885 11 3.58715 11.015 3.66611 11.0144H8.05861C8.13758 11.015 8.21588 11 8.28896 10.9701C8.36203 10.9401 8.42843 10.896 8.48426 10.8401C8.5401 10.7843 8.58426 10.7179 8.61418 10.6448C8.6441 10.5718 8.65917 10.4935 8.65851 10.4145V6.00449C8.65917 5.92553 8.6441 5.84723 8.61418 5.77415C8.58426 5.70107 8.5401 5.63468 8.48426 5.57884C8.42843 5.52301 8.36203 5.47884 8.28896 5.44893C8.21588 5.41901 8.13758 5.40394 8.05861 5.40459H3.66611Z"
                fill="#697594"
              />
            </svg>
          </div>
          <div class="sfil-box">
            <div>
              {{ $t('sellWholesale') }}
            </div>
            <div>
              {{ item.sfilNum | decimals(0) }}
            </div>
          </div>
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
            :border="false"
            clearable
            v-model="value"
            :placeholder="$t('purchaseAmount')"
          />
          <span class="max" @click="handleSFilToCFil">{{ $t('max') }}</span>
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
            :border="false"
            clearable
            v-model="repayValue"
            :placeholder="$t('purchaseAmount')"
          />
          <span class="max" @click="handleCFilToSFil">{{ $t('max') }}</span>
        </div>
        <div class="item">
          <span class="item-label">{{ $t('myLoan') }}:</span>
          <span class="item-content">{{ loanInvest.Lending | decimals }}</span>
        </div>
        <div class="item">
          <span class="item-label">{{ $t('pledgeRate') }}:</span>
          <!-- TODO: 计算 lending/pledge-->
          <span class="item-content">{{ (pledgeRate * 100).toFixed() }} %</span>
        </div>
        <div class="item">
          <span class="item-label">{{ $t('walletBalance') }}:</span>
          <span class="item-content">{{ wallet.walletCFil | decimals }}</span>
        </div>
        <div class="item">
          <span class="item-label">{{ $t('loanApy') }}:</span>
          <span class="item-content">{{ loanInvest.CFil | decimals }} </span>
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
import Clipboard from 'clipboard'
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
    stakingList() {
      return this.$store.state.stakingList
    },
  },
  async mounted() {
    // 页面跳转后，由于初始化init的问题，异步会存在合约不存在的情况，故加个setTimeout
    setTimeout(async () => {
      this.totalSupply = await this.getTotalSupply()
      this.getStakingList()
    }, 100)
  },
  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions([
      'init',
      'stake',
      'getTotalSupply',
      'calcSFilToCFil',
      'calcCFilToSFil',
      'getStakingList',
    ]),
    getStyle(index) {
      let target = index % 5
      let arr = ['#F57620', '#B406C3', '#3655E7', '#7CB732', '#6D06C3']
      return `background: ${arr[target]}`
    },
    // max
    async handleSFilToCFil() {
      this.value = await this.calcSFilToCFil()
    },
    async handleCFilToSFil() {
      this.repayValue = await this.calcCFilToSFil()
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
      this.showMask = false
      this.value = ''
    },
    handleRepayConfirm() {
      this.stake({
        mode: 5,
        value: this.repayValue,
      })
      this.showRepayMask = false
      this.repayValue = ''
    },
    copy() {
      var clipboard = new Clipboard('.node-read')
      clipboard.on('success', e => {
        this.$toast(this.$t('copySucc'))
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  z-index: 99;
}
.container {
  min-height: 100%;
  background: #414447;
  background: #3f495a url('../../assets/images/bg.png') no-repeat;

  background-size: cover;
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
  // width: 127px;
  height: 36px;
  line-height: 36px;
  text-align: center;
  background: #6e4af7;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  padding: 0 12px;
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
  padding: 16px 16px 1px;
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
  .box {
    background: #4d5a6a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px;
    border-radius: 10px;
    margin-bottom: 10px;
    .node-box {
      height: 100%;
      a {
        font-size: 14px;
        color: #fff;
      }
      svg {
        width: 20px;
        height: 20px;
        vertical-align: middle;
      }
    }
    .sfil-box {
      text-align: right;
      line-height: 1.5;
      & > div:nth-of-type(1) {
        color: #a5aabf;
        font-size: 12px;
      }
      & > div:nth-of-type(2) {
        font-weight: bold;
        font-size: 24px;
        color: #61ebf1;
      }
    }
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
