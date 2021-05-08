<template>
  <div class="container home">
    <BaseHeader />
    <h4 class="title">{{ $t('cFILInvestment') }}</h4>
    <div class="content bg">
      <BaseItem
        v-for="(item, index) in CRFIList"
        :key="index"
        :info="item"
        :style="getStyle(index)"
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
    CRFIList() {
      console.log('listsdsd', this.$store.state.CRFIList)
      return this.$store.state.CRFIList
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
    getStyle(index) {
      let target = index % 5
      let arr = ['#F57620', '#B406C3', '#3655E7', '#7CB732', '#6D06C3']
      return `background: ${arr[target]}`
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  z-index: 999;
}
.container {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #1f8aff;
  .content {
    flex: 1;
  }
}

.bg {
  background: #2c3546;
  border-top-left-radius: 40px;
  border-top-right-radius: 40px;
  padding-top: 52px;
}
.title {
  color: #fff;
  margin-left: 30px;
  margin-bottom: 8px;
  text-align: left;
}
</style>
