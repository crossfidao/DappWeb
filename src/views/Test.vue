<template>
  <div class="home" ref="form" label-width="80px">
    <BaseHeader title="overview">
      <div class="user">
        <h5 class="title">{{ $t('fileconinAddress') }}</h5>
        <h4>{{ userAddress.slice(0, 18) }}</h4>
        <div class="text">
          {{ $t('exchangeDesc') }}
        </div>
        <h5 class="title">{{ $t('invite') }}</h5>
        <h4>{{ userAddress.slice(0, 18) }}</h4>
        <div class="text">
          {{ $t('inviteText') }}
        </div>
        <div
          class="tag-read copy"
          :data-clipboard-text="userAddress"
          @click="copy"
        >
          {{ $t('copy') }}
        </div>
      </div>
    </BaseHeader>
    <div class="content">
      <h4 class="title">{{ $t('wallet') }}{{ $t('assets') }}</h4>
      <div class="item">
        <div class="number-box flex">
          <span class="text border">eFile</span>
          <div class="number">{{ balance.watlletefil | decimals }}</div>
        </div>
        <div class="btn-box flex">
          <span class="text-desc">
            {{ $t('eFilDesc') }}
          </span>
          <div class="btn" @click="showMask = true">
            {{ $t('repurchase') }}
          </div>
        </div>
      </div>

      <div class="item">
        <div class="number-box flex">
          <span class="text border">CRFI</span>
          <div class="number">{{ balance.watlletCRFI | decimals }}</div>
        </div>
        <div class="btn-box flex">
          <span class="text-desc">
            {{ $t('FDDesc') }}
          </span>
          <!-- <div class="btn">{{ $t('repurchase') }}</div> -->
        </div>
      </div>
      <h4 class="title">{{ $t('contract') }}{{ $t('assets') }}</h4>
      <div class="items">
        <div class="items-content">
          <div class="border items-item">
            <span class="text">eFil {{ $t('assets') }}</span>
            <p class="number">{{ balance.efil | decimals }}</p>
          </div>
          <div class="items-item">
            <span class="text"> {{ $t('withdraw') }} eFil</span>
            <p class="number1">{{ balance.efilInterest | decimals }}</p>
          </div>
        </div>
        <div class="items-content">
          <div class="border items-item">
            <span class="text">CRFI {{ $t('assets') }}</span>
            <p class="number">{{ balance.fd | decimals }}</p>
          </div>
          <div class="items-item">
            <span class="text"> {{ $t('withdraw') }} CRFI</span>
            <p class="number1">{{ balance.fdInterest | decimals }}</p>
          </div>
        </div>
      </div>
      <router-link to="/investment" tag="div" class="confirm-btn">
        {{ $t('mining') }}
      </router-link>
    </div>
    <van-overlay class="mask" :show="showMask" @click.self="showMask = false">
      <div class="mask-content">
        <h4 class="mask-title">Filcoin {{ $t('repurchase') }}</h4>
        <div class="form">
          <van-field
            class="field"
            center
            clearable
            type="number"
            v-model="value"
            :placeholder="$t('eFilPlaceholder')"
          />
          <van-field
            class="field"
            center
            clearable
            v-model="fileCoin"
            :placeholder="$t('FilecoinPlaceholder')"
          />
        </div>
        <div class="footer">
          <div class="footer-btn" @click="showMask = false">
            {{ $t('cancel') }}
          </div>
          <div class="footer-btn" @click="handleRepurchase">
            {{ $t('confirm') }}
          </div>
        </div>
      </div>
    </van-overlay>
    <!-- <div class="mask" v-show="showMask">
      <div class="mask-content">
        <h4 class="mask-title">Filcoin 回购</h4>
        <div class="form">
          <van-field
            class="field"
            center
            clearable
            v-model="value"
            placeholder="请输入您要售出的eFil数目"
          />
          <van-field
            class="field"
            center
            clearable
            v-model="value"
            placeholder="请输入您自己的Filecoin地址"
          />
        </div>
        <div class="footer">
          <div class="footer-btn" @click="showMask = false">取消</div>
          <div class="footer-btn">确定</div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import Contract from '@/plugin/eth'
import Clipboard from 'clipboard'
import { mapActions } from 'vuex'
import BigNumber from 'bignumber.js'
// @ is an alias to /src
export default {
  name: 'Home',
  components: {},
  data() {
    return {
      showMask: false,
      fdBalance: 0,
      value: '',
      fileCoin: '',
    }
  },
  computed: {
    userAddress() {
      return this.$store.state.userAddress
    },
    balance() {
      return this.$store.state.balance
    },
    efilTotal() {
      return this.$store.getters.efilTotal
    },
    fdTotal() {
      return this.$store.getters.fdTotal
    },
    efilWithdrawable() {
      return this.$store.getters.efilWithdrawable
    },
    fdWithdrawable() {
      return this.$store.getters.fdWithdrawable
    },
  },
  async mounted() {
    // this.ethereum()
    // window.ethereum.on('accountsChanged', account => {})
    // this.getUser()
  },

  methods: {
    ...mapActions(['initData', 'Repurchase']),
    copy() {
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$toast(this.$t('copy'))
        // 释放内存
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        // 不支持复制
        console.log('该浏览器不支持自动复制')
        // 释放内存
        clipboard.destroy()
      })
    },
    handleRepurchase() {
      this.Repurchase({
        value: this.value,
        fileCoin: this.fileCoin,
      })
      this.value = ''
      this.fileCoin = ''
      this.showMask = false
    },
    async getUser() {
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      let { fromWei } = this.$CRFI.web3.utils

      let fdBalance = await this.$CRFI.callContract('balanceOf', accounts)
      this.fdBalance = fromWei(fdBalance)
    },
    async ethereum() {
      await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
    },
    initUsdt() {
      this.usdtContract = new Contract({
        address: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
        abi: this.usdtAbi,
      })
    },
    async initContract() {
      this.list = this.params.abi
      this.contract = new Contract(this.params)
      this.list.forEach(e => {
        let { type, stateMutability } = e
        if (type === 'function' && stateMutability === 'view') {
          this.abiOptions.push(e)
        }
      })
    },
    async handleClick() {
      let args = []
      this.inputs.forEach(e => {
        let value = e.params
        if (e.type === 'uint256') {
          value = parseFloat(value)
        } else if (e.type === 'bool') {
          if (value === 'false') {
            value = false
          } else {
            value = true
          }
        }
        args.push(value)
      })
      if (this.params.status === 0) {
        let data = await this.contract.callContract(this.methods, args)
        this.result = data
      } else {
        await this.contract.executeContract(this.methods, args, this.value)
      }
    },
    async approve() {
      let args = [this.usdt.address, this.usdt.value]
      await this.usdtContract.executeContract('approve', args)
    },
    changeStatus(value) {
      this.abiOptions = []
      this.list.forEach(e => {
        let { type, stateMutability } = e
        if (value === 0 && type === 'function' && stateMutability === 'view') {
          this.abiOptions.push(e)
        }
        if (value === 1 && type === 'function' && stateMutability !== 'view') {
          this.abiOptions.push(e)
        }
      })
    },
    changeMethods(data) {
      this.inputs = []
      let { inputs } = this.abiOptions.find(n => n.name === data)

      inputs.forEach(e => {
        let { name, type } = e
        e.value = ''
        this.inputs.push({
          name,
          type,
          params: '',
        })
      })
    },
    getShow(name) {
      return isNaN(name)
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  background: #eee;
  height: 100%;
}

.user {
  // margin-top: 42px;
  padding: 14px;
  .title {
    margin-bottom: 24px;
    font-size: 20px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: #707070;
    text-align: left;
  }
  .text {
    margin-bottom: 40px;
    font-size: 18px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: #707070;
  }
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  padding: 380px 58px 48px;
  .title {
    margin: 32px 0;
    font-size: 32px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    text-align: left;
    color: #707070;
  }
  .item {
    background: #fff;
    margin-bottom: 40px;
    padding: 24px 40px;
    border-radius: 10px;
    // font-size: 46px;
    .number-box {
      height: 56px;
    }
    .number {
      font-weight: bold;
      font-size: 42px;
    }
    .btn-box {
      margin-top: 24px;
    }
    .border {
      border-bottom: 1px solid #ccebef;
    }
    .text {
      width: 312px;
      height: 56px;
      line-height: 56px;
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #707070;
      text-align: left;
      font-weight: bold;
    }
    .text-desc {
      width: 400px;
      text-align: left;
      color: #96a5bf;
      font-size: 20px;
    }

    .btn {
      width: 130px;
      height: 56px;
      line-height: 56px;
      font-size: 24px;
      background: rgb(65, 181, 194);
      border-radius: 30px;
      color: #fff;
    }
  }
}
.items {
  display: flex;
  justify-content: space-around;
  &-content {
    width: 309px;
    background: #fff;
    border: 1px solid #2faebd;
    border-radius: 16px;
    text-align: left;
    font-size: 24px;
  }
  .border {
    border-bottom: 1px solid #ccebef;
  }
  &-item {
    padding: 32px 42px;
    .text {
      display: block;
      margin-bottom: 12px;
      color: #96a5bf;
    }
    .number {
      font-size: 42px;
      font-weight: bold;
    }
    .number1 {
      font-size: 32px;
      color: #4d4d4d;
    }
  }
}
.confirm-btn {
  width: 634px;
  height: 87px;
  line-height: 87px;
  background: rgb(65, 181, 194);
  margin-top: 24px;
  border-radius: 42px;
  color: #fff;
  font-size: 32px;
}

.mask {
  // position: fixed;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // background: rgba(0, 0, 0, 0.6);
  &-content {
    width: 620px;
    height: 400px;
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    border-radius: 32px;
    font-size: 30px;
    color: #63c2cd;
  }
  &-title {
    padding: 24px 0;
  }
  .footer {
    display: flex;
    justify-content: center;
    &-btn {
      width: 174px;
      height: 64px;
      margin: 0 27px;
      line-height: 64px;
      background: #63c2cd;
      color: #fff;
      font-size: 30px;
      border-radius: 32px;
    }
  }
}
.form {
  padding: 0 32px;
}
.field {
  height: 84px;
  line-height: 84px;
  background: #eee;
  margin-bottom: 20px;
}
.copy {
  width: 140px;
  height: 46px;
  line-height: 46px;
  background: linear-gradient(90deg, #63c2cd 0%, #25aab9 100%);
  border-radius: 13px;
  margin: 0 auto;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #ffffff;
  font-size: 18px;
}
</style>
