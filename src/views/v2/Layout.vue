<template>
  <div class="container">
    <router-view class="content" />
    <BaseFooter></BaseFooter>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    showLoading() {
      return this.$store.state.showLoading
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
  width: 100%;
  height: 100%;
  // background: red url('../../assets/images/bg.png') no-repeat !important;
  background-size: cover;
  .content {
    flex: 1;
    overflow: auto;
  }
}
</style>
