<template>
  <div class="container">
    <h4 class="title">{{ $t('walletBalance') }}</h4>
    <div class="content">
      <div class="balance-item bg1">
        <div class="balance-item-left">
          <p class="logo">logo</p>
          <p>cFIL</p>
          <p>{{ $t('balance') }}</p>
        </div>
        <p class="balance">99999999.999</p>
        <p class="balance-item-btn">{{ $t('swap') }}</p>
      </div>
      <div class="balance-item bg2">
        <div class="balance-item-left">
          <p class="logo">logo</p>
          <p>cFIL</p>
          <p>{{ $t('balance') }}</p>
        </div>
        <p class="balance">99999999.999</p>
      </div>
      <div class="balance-item bg3">
        <div class="balance-item-left">
          <p class="logo">logo</p>
          <p>cFIL</p>
          <p>{{ $t('balance') }}</p>
        </div>
        <p class="balance">99999999.999</p>
        <p class="balance-item-btn">{{ $t('stake') }}</p>
      </div>
      <h4 class="title">{{ $t('myPositions') }}</h4>
      <div class="item" v-for="item in 3" :key="item">
        <div class="item-left">
          <p style="padding: 8px 0;">On Demand</p>
          <p class="item-coin item-coin-c">CRFI</p>
        </div>
        <div class="item-right">
          <div class="item-rate">
            CRFI: 0.5% + cFIL: 0.2%
          </div>
          <p class="item-balance">9999999.000</p>
          <div class="income-box">
            <div class="income">
              <p>CRFI {{ $t('profit') }}</p>
              <p class="income-text">+ 39493434.0000</p>
            </div>
            <div class="income">
              <p>CRFI {{ $t('profit') }}</p>
              <p class="income-text">+ 39493434.0000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      currentRate: 0,
    }
  },
  computed: {
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
  &-btn {
    position: absolute;
    right: 18px;
    bottom: 10px;
    width: 73px;
    height: 20px;
    background: #ffffff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 5px;
    font-size: 10px;
    font-family: Montserrat;
    font-weight: 400;
    color: #1f8aff;
  }
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
  }
  &-coin {
    height: 20px;
    // line-height: 20px;
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
</style>
