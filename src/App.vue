<template>
  <div id="app">
    <van-overlay :show="showLoading" @click="show = false">
      <van-loading class="loading" size="24px" color="#fff" vertical
        >loading...</van-loading
      >
    </van-overlay>
    <router-view />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  computed: {
    showLoading() {
      return this.$store.state.showLoading
    },
  },
  mounted() {
    this.initData()
  },
  methods: {
    ...mapActions(['initData']),
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
