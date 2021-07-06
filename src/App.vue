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
import {
  CHAINID,
  CHAINIDBSC,
  getETHSystemInfo,
  getBSCSystemInfo,
} from '@/config.js'
import { mapActions, mapMutations } from 'vuex'
import detectEthereumProvider from '@metamask/detect-provider'

// this returns the provider, or null if it wasn't detected

export default {
  data() {
    return {
      message: '',
      chainId: '',
    }
  },
  computed: {},
  async mounted() {
    const provider = await detectEthereumProvider()
    let chainId = await ethereum.request({ method: 'eth_chainId' })
    this.chainId = chainId
    this.setChainId(chainId)
    this.getOther()
    if (chainId === CHAINID || chainId === CHAINIDBSC) {
      this.ethereum()
    } else {
      this.$toast(this.$t('networkErr'))
    }
    if (ethereum.isConnected()) {
    }
    ethereum.on('accountsChanged', accounts => {
      this.setUserAddress(accounts[0])
      this.init(chainId)
    })
    ethereum.on('chainChanged', chainId => {
      if (chainId === CHAINID || chainId === CHAINIDBSC) {
        // location.reload();
        this.chainId = chainId
        this.setChainId(chainId)
        this.getOther()
        this.ethereum()
      } else {
        this.$toast(this.$t('networkErr'))
      }
    })
  },

  methods: {
    ...mapMutations(['setUserAddress', 'setOtherSystemInfo', 'setChainId']),
    ...mapActions(['init']),
    async ethereum() {
      try {
        let accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (accounts.length > 0) {
          this.setUserAddress(accounts[0])
          this.init(this.chainId)
        }
      } catch (e) {
        console.log('error', e)
      }
    },
    async getOther() {
      if (this.chainId === CHAINID){
        this.setOtherSystemInfo(await getBSCSystemInfo())
      }else if (this.chainId === CHAINIDBSC){
        this.setOtherSystemInfo(await getETHSystemInfo())
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
}

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%);
}
</style>
