<template>
  <div class="home" ref="form" label-width="80px">
    <BaseHeader title="overview">
      <div class="user">
        <h5 class="title">
          <span>{{ $t('fileconinAddress') }}</span>
        </h5>
        <h4 class="address" v-if="FileAddr" style="margin-bottom: 8px">
          {{ userFileAddr }}
        </h4>
        <h4 class="copy" v-else style="margin-bottom: 8px" @click="login">
          {{ $t('login') }}
        </h4>
        <div
          v-if="FileAddr"
          class="tag-read copy"
          :data-clipboard-text="FileAddr"
          @click="copy"
        >
          {{ $t('copy') }}
        </div>
        <div class="text">
          {{ $t('exchangeDesc') }}
        </div>
        <h5 class="title">{{ $t('invite') }}</h5>
        <h4 class="address">
          <!-- testing... -->
          {{ address }}
        </h4>
        <div class="text">
          {{ $t('inviteText') }}
        </div>
        <div
          class="tag-read copy"
          :data-clipboard-text="inviteLink"
          @click="copy"
        >
          {{ $t('copy') }}
        </div>
        <div class="aff">
          <span class="aff-label">{{ $t('myAff') }}</span>
          <span class="aff-price"
            >{{ balance.totalAffFD | decimals }} CRFI</span
          >
        </div>
      </div>
    </BaseHeader>
    <div class="content">
      <h4 class="title">{{ $t('wallet') }}{{ $t('assets') }}</h4>
      <div class="item">
        <div class="number-box flex">
          <span class="text border">cfil</span>
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
            <span class="text">cfil {{ $t('assets') }}</span>
            <p class="number">{{ balance.efil | decimals }}</p>
          </div>
          <div class="items-item">
            <span class="text"> {{ $t('withdraw') }} cfil</span>
            <p class="number1">{{ balance.totalEfil | decimals }}</p>
          </div>
        </div>
        <div class="items-content">
          <div class="border items-item">
            <span class="text">CRFI {{ $t('assets') }}</span>
            <p class="number">{{ balance.fd | decimals }}</p>
          </div>
          <div class="items-item">
            <span class="text"> {{ $t('withdraw') }} CRFI</span>
            <p class="number1">{{ balance.totalFD | decimals }}</p>
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
        <div class="mask-desc">
          <span
            >cfil {{ $t('balance') }}:
            {{ balance.watlletefil | decimals }}</span
          >
          <span
            >CRFI {{ $t('balance') }}:
            {{ balance.watlletCRFI | decimals }}</span
          >
        </div>
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
    FileAddr() {
      return this.$store.state.FilAddr
    },
    userFileAddr() {
      return this.FileAddr.slice(0, 12) + '...' + this.FileAddr.slice(30, 41)
    },
    userAddress() {
      return this.$store.state.userAddress
    },
    address() {
      return (
        this.userAddress.slice(0, 16) + '...' + this.userAddress.slice(30, 42)
      )
    },
    inviteLink() {
      let { origin } = location
      return origin + '?invite=' + this.userAddress
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
    ...mapActions(['initData', 'Repurchase', 'login']),
    getQueryString(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return decodeURIComponent(r[2])
      }
      return null
    },
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
  padding: 12px 16px;
  font-size: 10px;
  .title {
    margin-bottom: 12px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    color: #707070;
    text-align: left;
  }
  .address {
    font-size: 16px;
  }
  .text {
    margin-bottom: 20px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    font-size: 10px;
    color: #707070;
  }
}

.aff {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 48px;
  margin-top: 20px;
  border-top: 1px solid #28abba;
  font-size: 10px;
  color: #707070;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #707070;
  &-label {
    width: 110px;
    text-align: left;
  }
  &-price {
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #707070;
    font-size: 16px;
  }
}

.flex {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  padding: 320px 29px 24px;
  .title {
    margin: 16px 0;
    font-size: 16px;
    font-family: PingFangSC-Light, PingFang SC;
    font-weight: 300;
    text-align: left;
    color: #707070;
  }
  .item {
    background: #fff;
    margin-bottom: 40px;
    padding: 12px 20px;
    border-radius: 10px;
    font-size: 10px;
    .number-box {
      height: 56px;
    }
    .number {
      font-weight: bold;
      font-size: 21px;
    }
    .btn-box {
      margin-top: 12px;
    }
    .border {
      border-bottom: 1px solid #ccebef;
    }
    .text {
      width: 312px;
      height: 28px;
      line-height: 28px;
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
      font-size: 10px;
    }

    .btn {
      width: 130px;
      height: 28px;
      line-height: 29px;
      font-size: 12px;
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
    width: 154px;
    background: #fff;
    border: 1px solid #2faebd;
    border-radius: 8px;
    text-align: left;
    font-size: 12px;
  }
  .border {
    border-bottom: 1px solid #ccebef;
  }
  &-item {
    padding: 16px 24px;
    .text {
      display: block;
      margin-bottom: 12px;
      color: #96a5bf;
    }
    .number {
      font-size: 21px;
      font-weight: bold;
    }
    .number1 {
      font-size: 16px;
      color: #4d4d4d;
    }
  }
}
.confirm-btn {
  width: 317px;
  height: 44px;
  line-height: 44px;
  background: rgb(65, 181, 194);
  margin-top: 12px;
  border-radius: 21px;
  color: #fff;
  font-size: 16px;
}

.mask {
  &-content {
    width: 320px;
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    padding-bottom: 20px;
    font-size: 15px;
    color: #63c2cd;
    border-radius: 8px;
    border: 1px solid #26aab9;
  }
  &-title {
    padding: 12px 0;
  }
  &-desc {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 0 20px;
    font-size: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #707070;
    span {
      width: 128px;
      background: #f0f0f0;
      padding: 4px 4px;
      border-radius: 8px;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    &-btn {
      width: 87px;
      height: 32px;
      margin: 0 14px;
      line-height: 32px;
      background: #63c2cd;
      color: #fff;
      font-size: 15px;
      border-radius: 16px;
    }
  }
}
.form {
  padding: 0 20px;
}
.field {
  height: 42px;
  line-height: 42px;
  background: #eee;
  margin-bottom: 10px;
}
.copy {
  width: 70px;
  height: 23px;
  line-height: 23px;
  background: linear-gradient(90deg, #63c2cd 0%, #25aab9 100%);
  border-radius: 13px;
  margin: 0 auto;
  font-family: PingFangSC-Light, PingFang SC;
  font-weight: 300;
  color: #ffffff;
  font-size: 10px;
}
</style>
