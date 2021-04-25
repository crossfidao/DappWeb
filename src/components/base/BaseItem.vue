<template>
  <div class="item">
    <div class="item-title">
      <span>APY</span>
      <span class="item-date">On Demand</span>
    </div>
    <div class="item-rate">
      <span>logo</span>
      <span>CRFI: 2.8%</span>
      <span>+</span>
      <span>logo</span>
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
  border-radius: 13px;
  font-size: 13px;
  color: #fff;
}
</style>
