<template>
  <div class="item">
    <div class="item-title">
      <span>APY</span>
      <span class="item-date">On Demand</span>
    </div>
    <div class="item-rate">
      <span class="icon CRFI"></span>
      <span>CRFI: 2.8%</span>
      <span>+</span>
      <span class="icon cFIL"></span>
      <span>CFIL: 2.8%</span>
    </div>
    <div class="item-total">
      <p>{{ $t('totalDeposit') }}</p>
      <p>1232323 cFIL</p>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  name: 'BaseFooter',
  props: {
    title: {
      type: String,
      default: 'depositCoins',
    },
  },
  data() {
    return {}
  },
  computed: {},
  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['initData']),
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
  width: 13px;
  height: 13px;
  margin-right: 4px;
}
.cFIL {
  background: url('../../assets/icon/cFIL.png') no-repeat;
  background-size: cover;
}
.CRFI {
  background: url('../../assets/icon/CRFI.png') no-repeat;
  background-size: cover;
}
</style>
