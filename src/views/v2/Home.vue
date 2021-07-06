<template>
  <div class="container">
    <BaseHeader />
    <!-- <h4 class="title">{{ $t('dashboard') }}</h4> -->
    <!-- <h4 class="title2">{{ $t('filStatistics') }}</h4> -->
    <div class="circle" style="text-align: center">
      <van-circle
        size="135"
        fill="#222222"
        layer-color="#5855F0"
        color="#1FCED2"
        stroke-width="120"
        v-model="currentRate"
        :rate="rate"
        :speed="100"
        :text="text"
        stroke-linecap="butt"
      >
      </van-circle>
    </div>
    <h4 class="title2">{{ $t('filStatistics') }}</h4>
    <h4 class="title2" style="margin-bottom: 20px">
      <!-- {{ $t('filStatistics') }} -->
    </h4>
    <div class="items">
      <div class="item bg" style="background: #2b67c1">
        <p class="item-text" v-html="$t('fileCoinDepositTotal')"></p>
        <p class="item-text item-bottom">
          {{ (Number(systemInfo.nowInvestCFil) + Number(otherSystemInfo.nowInvestCFil)) | decimals }}
        </p>
      </div>
      <div class="item color" style="background: #2b67c1">
        <p class="item-text" v-html="$t('lendingTotal')"></p>
        <p class="item-text item-bottom">
          {{ (Number(systemInfo.cfilLendingTotal) + Number(otherSystemInfo.cfilLendingTotal)) | decimals }}
        </p>
      </div>
    </div>
    <h4 class="title2" style="margin-bottom: 20px; margin-top: 20px;">
      {{ $t('crfiStatistics') }}
    </h4>
    <div class="items">
      <div class="item bg">
        <p class="item-text color" v-html="$t('crfiDepositTotal')">
          {{ $t('crfiDepositTotal') }}
        </p>
        <p class="item-text item-bottom">
          {{ (Number(systemInfo.nowInvestCRFI) + Number(otherSystemInfo.nowInvestCRFI)) | decimals }}
        </p>
      </div>
      <div class="item">
        <p class="item-text" v-html="$t('referra')">{{ $t('referra') }}</p>
        <p class="item-text item-bottom">
          {{ (Number(systemInfo.crfiRewardTotal) + Number(otherSystemInfo.crfiRewardTotal)) | decimals }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import BigNumber from 'bignumber.js'
export default {
  data() {
    return {
      currentRate: 0,
    }
  },
  computed: {
    systemInfo() {
      return this.$store.state.systemInfo
    },
    otherSystemInfo() {
      return this.$store.state.otherSystemInfo
    },
    rate() {
      let { cfilLendingTotal: a1, nowInvestCFil: a2 } = this.systemInfo
      let { cfilLendingTotal: b1, nowInvestCFil: b2 } = this.otherSystemInfo
      const cfilLendingTotal = Number(a1) + Number(b1)
      const nowInvestCFil = Number(a2) + Number(b2)
      let rate = new BigNumber(cfilLendingTotal).div(
        new BigNumber(nowInvestCFil),
      )
      if (cfilLendingTotal == 0) {
        return 0
      }
      return parseInt(rate * 100)
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
    ...mapActions(['initData']),
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  color: #fff;
  text-align: left;
  background: #3f495a url('../../assets/images/bg.png') no-repeat;
  background-size: cover;
  .content {
    flex: 1;
  }
}

.title {
  margin-left: 16px;
  margin-bottom: 16px;
  font-size: 25px;
  font-family: Montserrat;
  font-weight: 400;
  line-height: 30px;
  color: #ffffff;
}
.title2 {
  margin-left: 27px;
  margin-bottom: 10px;
  font-size: 16px;
  font-family: Montserrat-Regular;
  line-height: 19px;
  color: #ffffff;
}

.circle {
  margin-bottom: 23px;
}
/deep/ .van-circle__text {
  color: #73ffe9;
  font-size: 20px;
  font-weight: bold;
}
.items {
  display: flex;
  justify-content: space-around;
  text-align: center;
  .item {
    display: flex;
    flex-direction: column;
    width: 113px;
    height: 137px;
    background: #1fced2;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 17px;
    font-size: 14px;
    font-weight: 400;
    font-family: Montserrat;
    font-weight: 400;
    line-height: 18px;
    color: #ffffff;
    opacity: 1;
    &-text {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 12px;
    }
    &-bottom {
      background: #333c4b;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      opacity: 1;
      border-radius: 0px 0px 13px 13px;
    }
  }
}
</style>
