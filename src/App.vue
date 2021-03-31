<template>
  <div id="app">
    <van-overlay :show="showLoading" @click="show = false">
      <van-loading class="loading" size="24px" color="#fff" vertical>
        loading...
      </van-loading>
    </van-overlay>
    <router-view />
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
  async mounted() {
    console.log(ethereum.isConnected())
    if (ethereum.isConnected()) {
      // let res = await window.ethereum.request({
      //   method: 'eth_requestAccounts',
      // })
      // console.log(res)
      // this.initData()
    }
    ethereum.on('accountsChanged', accounts => {
      console.log(accounts)
      this.setUserAddress(accounts[0])
      this.initData()
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
    })
    ethereum.on('chainChanged', chainId => {
      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      window.location.reload()
    })

    ethereum.on('connect', handler => {
      console.log('123', handler)
    })
  },
  methods: {
    ...mapMutations(['setUserAddress']),
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
