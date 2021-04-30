<template>
  <div class="container">
    <h4 class="title">{{ $t('dashboard') }}</h4>
    <h4 class="title2">{{ $t('filStatistics') }}</h4>
    <div class="circle" style="text-align: center">
      <van-circle
        fill="#222222"
        layer-color="#1FCED2"
        color="#5855F0"
        stroke-width="100"
        v-model="currentRate"
        :rate="30"
        :speed="100"
        :text="text"
        stroke-linecap="butt"
      />
    </div>
    <h4 class="title2" style="margin-bottom: 20px">
      {{ $t('crfiStatistics') }}
    </h4>
    <div class="items">
      <div class="item">
        <p class="item-text">{{ $t('fileCoinDepositTotal') }}</p>
        <p class="item-text item-bottom">3000</p>
      </div>
      <div class="item">
        <p class="item-text">{{ $t('fileCoinDepositTotal') }}</p>
        <p class="item-text item-bottom">3000</p>
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
  color: #fff;
  text-align: left;
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
  color: #fff;
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
