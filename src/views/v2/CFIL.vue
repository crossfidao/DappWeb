<template>
  <div class="container">
    <h4 class="title">{{ $t('cFILInvestment') }}</h4>
    <div class="content">
      <BaseItem v-for="item in 5" :key="item" />
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
/deep/ .van-circle__text {
  color: #fff;
}

.items {
  display: flex;
  justify-content: space-around;
  .item {
    display: flex;
    flex-direction: column;
    width: 113px;
    height: 137px;
    background: #1fced2;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
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
