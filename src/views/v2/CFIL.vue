<template>
  <div :class="$store.state.daynight ? 'container1' : 'container'" class=" home">
    <BaseHeader/>
    <h4 class="title">{{ $t('cFILInvestment') }}</h4>
    <div class="content bg">
      <BaseItem
        v-for="(item, index) in CFilList"
        :info="item"
        :key="index"
        :index="index"
      />
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
    CFilList() {
      return this.$store.state.CFilList
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
    ...mapActions(['initData', 'buyCoin']),
    getStyle(index) {
      let target = index % 5
      let arr = ['#F57620', '#B406C3', '#3655E7', '#7CB732', '#6D06C3']
      return `background: ${arr[target]}`
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
   background: url('../../assets/images/bg.png') no-repeat;
  .content {
    flex: 1;
  }
}
.container1{
background: #272831 ;
  display: flex;
  flex-direction: column;
  height: 100%;
  .content {
    flex: 1;
  }
}
.bg {
  // background: #3f495a;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding-top: 20px;
}
.title {
  display: flex;
  align-self: center;
  color: #fff;

  margin-bottom: 8px;
  text-align: left;
}
</style>
