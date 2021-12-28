<template>
  <div :class="$store.state.daynight ? 'container' : 'container1'" class=" home" style="align-items: center;">
    <BaseHeader :isBack="true" :title="$t('referralRewards')" />
    <div :class="$store.state.daynight ? '' : 'd-bg'" class="content d-c1">
      <!--<h4 :class="$store.state.daynight ? '' : 'chc'" class="title" style="margin-top:10px"> {{ $t('referralRewards') }} </h4>-->
      <div :class="$store.state.daynight ? '' : 'd-bg'" class="items">
        <div class="logo-item" style="margin-right: 140px;">
          <div class="logo"></div>
          <div :class="$store.state.daynight ? '' : 'chc'" class="items-content">
            {{ userInfo && userInfo.uInfoView && userInfo.uInfoView.totalAffCRFI | decimals }}
          </div>
        </div>
        <div class="logo-item">
          <div class="logo cfil"></div>
          <div :class="$store.state.daynight ? '' : 'chc'" class="items-content">
            {{ userInfo && userInfo.uInfoView && userInfo.uInfoView.totalAffCFil | decimals }}
          </div>
        </div>
      </div>
      <div :class="$store.state.daynight ? '' : 'd-bg'" class="d-c2" style="display: flex; ">
        <van-field class="d-c3" :class="$store.state.daynight ? '' : 'd-dd chc'" v-model="copyValue" id="copyObj" placeholder="" />
        <div class="item-btn d-c4" style="">
          <span class="tag-read btn" :data-clipboard-text="inviteLink" @click="copy">
            {{ $t('claim') }}
          </span>
        </div>
      </div>
      <div @click="drawProdPicture()" class="d-c5">{{ $t('invitess') }}</div>
    </div>
    <!-- <h4 class="title" style="margin-bottom: 42px">
      {{ $t('claimedRewards') }}
    </h4> -->
    <div :class="$store.state.daynight ? '' : 'd-bg'" class="d-c6">
      <div :class="$store.state.daynight ? '' : 'chc'" class="tabs" style="justify-content: space-around;">
        <div style="" class="tabs-item" :class="{ active: active === index }" v-for="(item, index) in tabs" :key="item.name" @click="handleClick(index)">
          {{ $t(item.name) }} <span class="line"></span>
        </div>
      </div>
    </div>
    <template v-if="active === 0">
      <div class="item" v-for="item in rewardsList" :key="item.indexed">
        <span class="item-logo"></span>
        <div class="item-right">
          <p class="price">+ {{ item.crfiInterest | decimals }} CRFI</p>
          <p class="price">+ {{ item.cfilInterest | decimals }} cFIL</p>
          <p class="address">
            {{ item.sender.slice(0, 12) + '...' + item.sender.slice(32, 42) }} </p>
          <p class="date">{{ getDate(item.timestamp) }}</p>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="item" v-for="item in promoteList" :key="item.indexed">
        <span class="item-logo"></span>
        <div class="item-right">
          <!-- <p class="amount">
            + {{ item.amount | decimals }}
            {{ item.Type == 0 ? 'CRFI' : 'CFIL' }}
          </p> -->
          <!-- <p class="price">+ {{ item.cfilInterest | decimals }} CFIL</p> -->
          <p class="address">
            {{ item.sender.slice(0, 12) + '...' + item.sender.slice(32, 42) }} </p>
          <p class="date">{{ getDate(item.timestamp) }}</p>
        </div>
      </div>
    </template>
    <!-- <van-tabs v-model="active" background="#3f4b5d">
      <van-tab :title="$t('claimedRewards')">
        <div class="item" v-for="item in rewardsList" :key="item.indexed">
          <span class="item-logo"></span>
          <div class="item-right">
            <p class="price">+ {{ item.crfiInterest | decimals }} CRFI</p>
            <p class="price">+ {{ item.cfilInterest | decimals }} CFIL</p>
            <p class="address">
              {{ item.sender.slice(0, 12) + '...' + item.sender.slice(32, 42) }}
            </p>
            <p class="date">{{ getDate(item.timestamp) }}</p>
          </div>
        </div>
      </van-tab>
      <van-tab :title="$t('caimedPromote')">
        <div class="item" v-for="item in rewardsList" :key="item.indexed">
          <span class="item-logo"></span>
          <div class="item-right">
            <p class="price">+ {{ item.crfiInterest | decimals }} CRFI</p>
            <p class="price">+ {{ item.cfilInterest | decimals }} CFIL</p>
            <p class="address">
              {{ item.sender.slice(0, 12) + '...' + item.sender.slice(32, 42) }}
            </p>
            <p class="date">{{ getDate(item.timestamp) }}</p>
          </div>
        </div>
      </van-tab>
    </van-tabs> -->
    <van-popup v-model="show" style="width: 280px;height: 580px;overflow: hidden;">
      <div style="width: 280px; height: 580px;" ref="imageWrapper" id="captureId">
        <!-- <vue-esign ref="esign" :width="800" :height="300" :isCrop="isCrop" :lineWidth="lineWidth" :lineColor="lineColor" :bgColor.sync="bgColor" />
   -->
        <img style="width: 280px; height: 580px;" class="ss" :src="makePic" @click="downImg" />
      </div>
    </van-popup>
    <!-- <van-empty description="暂无数据" size="0px" image="" /> -->
    <div style="display:none" class="qrcode" ref="qrCodeUrl"></div>
    <div style="width:0;height:0;overflow: hidden;"><img :src="bgPic"></div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { Popup, Toast } from 'vant'

  Vue.use(Popup)
  import QRCode from 'qrcodejs2'
  import moment from 'moment'
  import Clipboard from 'clipboard'
  import { mapActions, mapMutations } from 'vuex'
  import vueEsign from 'vue-esign'
  import bgPic from '@/assets/images/haibao.png'
  import html2canvas from 'html2canvas'

  Vue.use(vueEsign)
  export default {
    data() {
      return {
        show: false,
        lineWidth: 6,
        lineColor: '#000000',
        bgColor: '',
        //签名图
        resultImg: '',
        isCrop: false,
        //底图
        bgPic: bgPic,
        makePic: '',
        firstFlag: true,
        active: 0,
        showMask: false,
        currentRate: 0,
        value: '',
        test: true,
        //复制
        longClick: 0,
        timeOutEvent: 0,
        imgSrc: require('@/assets/images/haibao.png'),
        tabs: [
          {
            name: 'claimedRewards',
          },
          {
            name: 'caimedPromote',
          },
        ],
      }
    },
    computed: {
      copyValue() {
        return (
          window.location.origin + '/#/?add=' + this.$store.state.wallet.account
        )
      },
      userAddress() {
        return this.$store.state.userAddress
      },
      inviteLink() {
        let { origin, pathname, hash } = location
        return origin + pathname + '?invite=' + this.userAddress
      },
      userInfo() {
        return this.$store.state.userInfo
      },
      rewardsList() {
        return this.$store.state.rewardsList
      },
      promoteList() {
        return this.$store.state.promoteList
      },
      text() {
        return this.currentRate.toFixed(0) + '%'
      },
    },
    mounted() {
      this.getRewardList()
      this.creatQrCode()
    },
    methods: {
      ...mapMutations(['setUserAddress']),
      ...mapActions(['getRewardList', 'getPromoteList']),
      downImg() {
        html2canvas(document.querySelector('#captureId')).then(canvas => {
          let imgUrl = canvas.toDataURL('image/png')
          this.makePic = imgUrl
          this.firstFlag = false
        })
      },
      // 创建二维码
      creatQrCode() {
        var qrcode = new QRCode(this.$refs.qrCodeUrl, {
          text:
            window.location.origin +
            '/#/?add=' +
            this.$store.state.wallet.account, // 需要转换为二维码的内容
          width: 100,
          height: 100,
          colorDark: '#000000',
          colorLight: '#ffffff',
          correctLevel: QRCode.CorrectLevel.H,
        })
        console.log()
      },
      handleReset() {
        this.$refs.esign.reset()
      },
      drawProdPicture() {
        console.log(this.$refs.qrCodeUrl.childNodes[1].src)
        // debugger;
        const self = this
        let img1 = new Image()
        img1.src = self.bgPic
        img1.height = 1624
        img1.width = 750
        img1.setAttribute('crossOrigin', 'anonymous')
        let canvas = document.createElement('canvas')
        let context = canvas.getContext('2d')
        canvas.height = 1624
        canvas.width = 750
        let img2 = new Image()
        let flag = true
        // 将 img1 加入画布
        img1.onload = () => {
          context.drawImage(img1, 0, 0, 750, 1624)
          img2.src = self.$refs.qrCodeUrl.childNodes[1].src
          console.log(img2.src)
          img2.setAttribute('crossOrigin', 'anonymous')
          img2.width = 190
          img2.height = 210
          if (flag) {
            flag = false
          } else {
            let src = canvas.toDataURL()
            self.makePic = src
          }
        }
        // 将 img2 加入画布
        img2.onload = () => {
          context.drawImage(img2, 523.3, 1375, 190, 210)
          if (flag) {
            flag = false
          } else {
            let src = canvas.toDataURL('image/png')
            self.makePic = src
          }
        }
        this.show = true
      },
      handleClick(index) {
        this.active = index
        if (index == 0) {
          this.getRewardList()
        } else {
          this.getPromoteList()
        }
      },
      getStyle(index) {
        let target = index % 5
        let arr = ['#F57620', '#B406C3', '#3655E7', '#7CB732', '#6D06C3']
        return `background: ${arr[target]}`
      },
      getDate(value) {
        return moment(value * 1000).format('yyyy-MM-DD hh:mm:ss')
      },
      copy() {
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
    },
  }
</script>

<style lang="scss" scoped>

  .d-c6 {
    width: 342px;
    height: 315px;
    background: #2f303b;
    box-shadow: 0px 2px 5px 0px rgba(0, 1, 0, 0.1);
    border-radius: 12px;
    margin-top: 20px;
  }
  .d-c5 {
    width: 280px;
    height: 44px;
    font-size: 15px;
    background: #5acbd0;
    box-shadow: 0px 3px 0px 0px #3ea0ad;
    border-radius: 10px;
    margin-top: 20px;
    line-height: 44px;
  }
  .d-c4 {
    margin-left: 5px;
    width: 74px;
    height: 44px;
    background: #ffab32;
    border-radius: 8px;
  }
  .d-c3 {
    width: 240px;
    margin-right: 10px;
    height: 45px;
    background: #4b4c56;
    border-radius: 8px;
  }
  .d-c2 {
    background: #2f303b;
  }
  .d-c1 {
    background: #2f303b;
    width: 342px;
    height: 290px;
  }
  /deep/ .van-cell::after {
    border-bottom: none;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
    align-self: center;
  }
  /deep/ .van-empty__image {
    display: none;
  }

  .tabs {
    display: flex;
    align-items: center;
    // background: #3f495a;

    padding: 0 12px;
    font-size: 16px;

    &-item {
      height: 59px;
      line-height: 59px;
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    .active {
      .line {
        position: absolute;
        bottom: 0;

        width: 120px;
        height: 3px;
        background: #18ced2;
        border-radius: 10px;
      }
    }
  }

  .home {
    z-index: 99;
    height: 100%;
    overflow: auto;
  }
  .container1 {
    display: flex;
    flex-direction: column;

    // background: #3f495a;
    background: url('../../assets/images/bg.png') no-repeat;
    background-size: cover;
    background-size: cover;
    color: #fff;

    .content {
      padding-bottom: 24px;
    }
  }
  .container {
    display: flex;
    flex-direction: column;
    background: #414447;
    color: #fff;

    .content {
      padding-bottom: 24px;
    }
  }
  .content {
    padding: 0 32px;
    border-radius: 10px;
  }
  .logo {
    width: 42px;
    height: 42px;
    background: url('../../assets/images/1.png') no-repeat;
    background-size: cover;
    margin: 0 auto 12px;
  }

  .cfil {
    background: url('../../assets/images/logo.png') no-repeat;
    background-size: cover;
  }
  .items {
    display: flex;
    justify-content: space-around;

    background: #2f303b;
    margin-top: 15px;
    opacity: 1;
    // border-radius: 13px;
    padding: 16px 16px 0;
    border-top-left-radius: 13px;
    border-top-right-radius: 13px;
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
    margin: 24px 24px 12px;
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
      border-bottom-left-radius: 13px;
      border-bottom-right-radius: 13px;
      background: #3f4b5d;
      display: flex;
      justify-content: center;
      font-size: 14px;
      font-family: Montserrat;

      .btn {
        width: 74px;
        height: 44px;
        line-height: 44px;

        background: #ffab32;
        margin-bottom: 36px;
        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        border-radius: 8px;
        text-align: center;
      }
    }

    &-right {
      flex: 1;
    }

    .amount {
      font-size: 18px;
      font-family: Segoe UI;
      font-weight: bold;
      color: #ffffff;
    }

    .price {
      font-size: 14px;
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
    display: flex;
    margin-bottom: 24px;
    padding: 0 16px;
    // background: #2c3546;
    .max {
      width: 58px;
      height: 42px;
      line-height: 42px;
      background: #1fced2;
      box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
      border-radius: 8px;
    }

    .field {
      height: 42px;
      line-height: 42px;
      background: #2c3546;
      margin-bottom: 10px;
      margin-right: 8px;
      color: #fff;
      border: none !important;
      border-radius: 10px;
    }
  }
  /deep/ .van-field__control {
    color: #fff;
  }
  .chc {
    color: #272831 !important;
  }
  .d-bg {
    background: #fff !important;

    /deep/ input {
      color: black;
    }
  }
  .d-dd {
    // color: #fff !important;

    background: #fafafa !important;
  }
  input {
    color: #f7f8fa;
  }
</style>
