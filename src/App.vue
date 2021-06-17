<template>
  <div id="app">
    <!-- <van-overlay :show="showLoading" @click="show = false">
      <van-loading class="loading" size="24px" color="#fff" vertical>
        loading...
      </van-loading>
    </van-overlay> -->
    <router-view />
  </div>
</template>

<script>
import { CHAINID } from '@/config.js'
import { mapActions, mapMutations } from 'vuex'
export default {
  computed: {
    showLoading() {
      return this.$store.state.showLoading
    },
  },
  async mounted() {
    let chainId = await ethereum.request({ method: 'eth_chainId' })
    console.log(chainId)
    // this.ethereum()
    if (chainId === CHAINID) {
      this.ethereum()
    } else {
      this.$toast(this.$t('networkErr'))
    }
    if (ethereum.isConnected()) {
      // let res = await window.ethereum.request({
      //   method: 'eth_requestAccounts',
      // })
      // this.initData()
    }
    ethereum.on('accountsChanged', accounts => {
      this.setUserAddress(accounts[0])
      this.init()
      // Handle the new accounts, or lack thereof.
      // "accounts" will always be an array, but it can be empty.
    })
    ethereum.on('chainChanged', chainId => {
      if (chainId === CHAINID) {
        this.ethereum()
      } else {
        this.$toast(this.$t('networkErr'))
      }

      // Handle the new chain.
      // Correctly handling chain changes can be complicated.
      // We recommend reloading the page unless you have good reason not to.
      // window.location.reload()
    })
  },

  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['init']),
    async ethereum() {
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      if (accounts.length > 0) {
        this.setUserAddress(accounts[0])
        this.init()
      }
    },
  },
}
</script>

<style lang="scss">
#app {
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  // background: red url('./assets/images/bg.png') no-repeat !important;
  // background: url('./assets/images/bg.png') no-repeat;
  // background-size: cover;
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
