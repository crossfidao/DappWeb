<template>
  <div class="container home">
    <BaseHeader :isBack="true" />
    <div class="content">
      <template v-if="current == 0">
        <h4 class="title">{{ $t('filSwap') }}</h4>
        <div class="items">
          <div class="type">
            <div class="type-item">
              <i class="icon filecoin"></i>
              <p>FIL</p>
            </div>

            <van-icon @click="handleClick" name="exchange" size="42" />
            <div class="type-item">
              <i class="icon"></i>
              <p>cFIL</p>
            </div>
          </div>
        </div>
        <template>
          <h4
            v-show="!FileAddr"
            class="login-btn"
            style="margin-bottom: 8px"
            @click="handleLogin"
          >
            {{ $t('login') }}
          </h4>
        </template>
        <div v-show="FileAddr">
          <div class="qrcode-box">
            <div id="qrcode" ref="qrcode" class="qrcode"></div>
          </div>
          <div
            class="tag-read copy"
            :data-clipboard-text="FileAddr"
            @click="copy"
            v-if="FileAddr"
          >
            <span class="copy-text">{{ userFileAddr }}</span>
            <div class="copy-right">
              <van-icon name="description" size="30" color="#A2A2A2" />
              <p>{{ $t('copy') }}</p>
            </div>
          </div>
        </div>
      </template>
      <div v-show="current == 1">
        <h4 class="title" style="margin-bottom: 12px">
          {{ $t('cfilSwap') }}
        </h4>
        <div class="items">
          <div class="type">
            <div class="type-item">
              <i class="icon"></i>
              <p>cFIL</p>
            </div>
            <van-icon @click="handleClick" name="exchange" size="42" />
            <div class="type-item">
              <i class="icon filecoin"></i>
              <p>FIL</p>
            </div>
          </div>
          <div class="form">
            <div class="form-item">
              <van-field
                class="field"
                center
                clearable
                v-model="value"
                :placeholder="$t('purchaseAmount')"
              />
              <span class="max" @click="handleMax">{{ $t('max') }}</span>
            </div>
            <div class="form-item">
              <van-field
                class="field"
                center
                clearable
                v-model="fileCoin"
                :placeholder="$t('addressPlaceholder')"
              />
            </div>
            <div class="form-btn" @click="handleRepurchase">
              {{ $t('confirm') }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
import QRCode from 'qrcodejs2'
import Clipboard from 'clipboard'
export default {
  data() {
    return {
      isLogin: false,
      showMask: false,
      current: 0,
      currentRate: 0,
      value: '',
      fileCoin: '',
      code: null,
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
    showLoading() {
      return this.$store.state.showLoading
    },
    text() {
      return this.currentRate.toFixed(0) + '%'
    },
  },
  watch: {
    FileAddr() {
      this.qrcode()
    },
  },
  async mounted() {
    if (this.FileAddr) {
      this.$nextTick(() => {
        this.qrcode()
      })
    }
  },
  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['login', 'Repurchase', 'RepurchaseMax']),
    async handleMax() {
      this.value = await this.RepurchaseMax()
    },
    handleClick() {
      this.current = this.current == 0 ? 1 : 0
      if (this.current == 0) {
        this.$nextTick(() => {
          this.qrcode()
        })
      }
    },
    // 回购
    handleRepurchase() {
      this.Repurchase({
        value: this.value,
        fileCoin: this.fileCoin,
      })
      this.value = ''
      this.fileCoin = ''
      this.showMask = false
    },
    getStyle(index) {
      let target = index % 5
      let arr = ['#F57620', '#B406C3', '#3655E7', '#7CB732', '#6D06C3']
      return `background: ${arr[target]}`
    },
    copy() {
      localStorage.removeItem(this.userAddress)
      var clipboard = new Clipboard('.tag-read')
      clipboard.on('success', e => {
        this.$toast(this.$t('copySucc'))
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
    async handleLogin() {
      await this.login()
      this.$nextTick(() => {
        this.qrcode()
      })
    },
    qrcode() {
      if (!this.code) {
        this.code = new QRCode('qrcode', {
          width: 120, // 设置宽度，单位像素
          height: 120, // 设置高度，单位像素
          text: this.FileAddr, // 设置二维码内容或跳转地址
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.Q,
        })
      } else {
        this.code.makeCode(this.FileAddr)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  z-index: 99;
}
.container {
  overflow: auto;
  height: 100%;
  background: #222;
  background: url('../../assets/images/bg.png') no-repeat;
  background: url('../../assets/images/bg.png') no-repeat;
  background-size: cover;
  color: #fff;
  .content {
    padding-bottom: 24px;
  }
}
.content {
  padding: 0 24px;
}
.logo {
  width: 42px;
  height: 42px;
  background: url('../../assets/images/1.png') no-repeat;
  background-size: cover;
  margin: 0 auto 40px;
}

.type {
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 28px;
  .icon {
    display: inline-block;
    width: 46px;
    height: 46px;
    background: url('../../assets/icon/cFIL-blue.png') no-repeat;
    background-size: contain;
  }
  .filecoin {
    display: inline-block;
    width: 46px;
    height: 46px;
    background: url('../../assets/icon/filecoin-fil-logo.png');
    background-size: contain;
  }
  &-item {
    text-align: center;
  }
}

.login-btn {
  width: 120px;
  height: 32px;
  line-height: 32px;
  background: #18ced2;
  margin: 12px auto 24px;
  opacity: 1;
  border-radius: 0.26667rem;
  text-align: center;
  font-size: 14px;
}
.qrcode-box {
  width: 138px;
  height: 138px;
  line-height: 138px;
  background: #fff;
  margin: 0 auto;
  text-align: center;
  margin-top: 10px;
  padding: 9px;
  /deep/ .qrcode img {
    display: inline-block;
    margin: 0 auto !important;
  }
}
.copy {
  display: flex;
  padding: 0 10px;
  margin-top: 12px;
  margin-bottom: 20px;
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 400;
  line-height: 18px;
  color: #ffffff;
  &-text {
    width: 301px;
    height: 46px;
    line-height: 46px;
    background: #232936;
    opacity: 1;
    border-radius: 10px;
  }
  &-right {
    color: #a2a2a2;
    margin-left: 4px;
  }
}

.items {
  background: #3f4c5d;
  margin-top: 15px;
  opacity: 1;
  border-radius: 13px;
  padding: 16px 16px 0;
  font-size: 16px;
  font-family: Montserrat;
  font-weight: 500;
  color: #ffffff;
  text-align: left;
  &-content {
    margin-bottom: 29px;
    text-align: center;
  }
}
.item {
  display: flex;
  align-items: center;
  background: #3f4b5d;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  margin: 0 24px 42px;
  border-radius: 17px;
  padding: 32px 24px;
  font-size: 14px;
  font-family: Montserrat;
  font-weight: 400;
  color: #ffffff;
  text-align: left;
  &-logo {
    width: 42px;
    height: 42px;
    background: url('../../assets/images/1.png') no-repeat;
    background-size: cover;
    margin-right: 32px;
  }
  &-btn {
    display: flex;
    justify-content: center;
    .btn {
      width: 127px;
      height: 36px;
      line-height: 36px;
      background: #18ced2;
      margin-bottom: 36px;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      border-radius: 10px;
      text-align: center;
    }
  }
  &-right {
    flex: 1;
  }
  .price {
    font-size: 22px;
    font-family: Segoe UI;
    font-weight: bold;
    color: #ffffff;
  }
  .address {
    margin: 6px 0;
  }
}
.item-input {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .field {
    width: 200px;
    border-radius: 10px;
    background: #2c3546;
  }
}

.mask {
  &-content {
    width: 320px;
    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #3f4c5d;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    padding-bottom: 20px;
    border-radius: 13px;
    font-size: 13px;
    font-family: Segoe UI;
    font-weight: bold;
    line-height: 16px;
    color: #ffffff;
  }
  &-title {
    padding: 12px 0;
    font-size: 22px;
    font-family: Montserrat;
    font-weight: 600;
    line-height: 27px;
    color: #ffffff;
  }
  &-text {
    margin-bottom: 24px;
    padding-left: 14px;
    text-align: left;
  }
  &-desc {
    margin-bottom: 16px;
    margin-left: 12px;
    font-size: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #fff;
    &-name {
      display: flex;
      align-items: center;
    }
    &-balance {
      width: 150px;
      height: 24px;
      line-height: 24px;
      background: #2c3546;
      margin-top: 10px;
      border-radius: 10px;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    &-btn {
      width: 108px;
      height: 32px;
      line-height: 32px;
      background: #18ced2;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      opacity: 1;
      border-radius: 10px;
      font-size: 15px;
      font-family: Segoe UI;
      font-weight: 600;
      color: #ffffff;
    }
  }
}
.form {
  margin-bottom: 24px;
  padding: 0 16px 100px;
  // background: #2c3546;
  &-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 14px;
  }
  .max {
    width: 58px;
    height: 42px;
    line-height: 42px;
    background: #148dff;
    margin-left: 4px;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 8px;
    font-size: 15px;
    font-family: Segoe UI;
    font-weight: 600;
    text-align: center;
    color: #ffffff;
  }
  .field {
    flex: 1;
    height: 42px;
    line-height: 42px;
    background: #2c3546;
    color: #fff;
    border: none !important;
    border-radius: 10px;
  }
  &-btn {
    width: 108px;
    height: 32px;
    line-height: 32px;
    background: #18ced2;
    margin: 36px auto 0;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 10px;
    text-align: center;
  }
}
/deep/ .van-field__control {
  color: #fff;
}
</style>
