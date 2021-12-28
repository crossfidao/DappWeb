<template>
  <div class="header" :style="'background:' + color">
    <div class="header-user">
      <router-link to="/" tag="div" class="logo" v-if="!isBack || isHome">
        <img src="../../assets/logo.png" alt="" class="title-logo" />
        <div class="address">
          <span :class="`address-icon ${iconClass}`"></span>
          <span :class="$store.state.daynight ? 'address1'  :'address-text'" v-if="!showLoading">{{ address }}</span>
          <span class="address-pending" :class="$store.state.daynight ? 'address1'  :''" v-else>
            <i style="margin-right: 4px">pending</i>
            <van-loading type="spinner" size="20px" />
          </span>
        </div>
      </router-link>
      <van-icon name="arrow-left" v-else size="24" @click="$router.back()" />
      <span v-if="title" :class="$store.state.daynight ? 'header-title':'header-title1'">{{ title }}</span>
      <div v-else style="display:flex;margin-left:76px" @click="changeMoudles">
        <img v-if="$store.state.daynight" style="width:15px;height:15px" src="@/assets/images/bai1.png" alt="">
        <img v-else style="width:15px;height:15px" src="@/assets/images/bai.png" alt="">
        <div style="margin:0 5px"> /</div>
        <img v-if="$store.state.daynight" style="width:15px;height:15px" src="@/assets/images/hei1.png" alt="">
        <img v-else style="width:15px;height:15px" src="@/assets/images/hei.png" alt="">
      </div>
      <!-- <span v-show="showLoading">pending</span> -->
      <div class="right">
        <img style="width:18px;height:16px" src="@/assets/images/hanbao.png" @click="showpop = true" alt="">
        <!-- <span class="icon" @click="showpop = true"></span> -->
        <!-- <van-icon :name="line" size="28" @click="showpop = true" /> -->
      </div>
    </div>

    <van-popup :class="$store.state.daynight?'van-popup-dark':'van-popup-light'" :overlay="true" overlay-class="dfkdslfdl" v-model="showpop" position="right" :style="{ height: '100%', 'z-index': 9999 }">
      <img style="position: absolute; width: 18px; height: 16px; top: 20px; right: 15px;" src="@/assets/images/hanbao.png" @click="showpop = false" alt="">
      <div class="pop" >
        <div class="pop-menu">
          <router-link tag="div" to="/staking" class="pop-menu-item" :class="$store.state.daynight?'pop-menu-item-dark':''">
            <van-icon name="/static/img/menu/1.png" size="24px"/>
            <span class="text">{{ $t('borrowMenu') }}</span>
          </router-link>
          <div class="pop-menu-item" @click="gotoOfficial" :class="$store.state.daynight?'pop-menu-item-dark':''">
            <van-icon name="/static/img/menu/2.png" size="24px" />
            <span class="text">{{ $t('aboutCrossFi') }}</span>
          </div>
          <div class="pop-menu-item" @click="gotoSafe" :class="$store.state.daynight?'pop-menu-item-dark':''">
            <van-icon name="/static/img/menu/3.png" size="24px" />
            <span class="text">{{ $t('auditReport') }}</span>
          </div>
          <div class="pop-menu-item" @click="gotoDoc" :class="$store.state.daynight?'pop-menu-item-dark':''">
            <van-icon name="/static/img/menu/4.png" size="24px" />
            <span class="text">{{ $t('supportCenter') }}</span>
          </div>
          <router-link tag="div" to="/reward" class="pop-menu-item" :class="$store.state.daynight?'pop-menu-item-dark':''">
            <van-icon name="/static/img/menu/5.png" size="24px" />
            <span class="text">{{ $t('referralRewards') }}</span>
          </router-link>
          <router-link v-if="userInfo.admin" tag="div" to="/admin" class="pop-menu-item" :class="$store.state.daynight?'pop-menu-item-dark':''">
            <van-icon name="/static/img/menu/1.png" size="24px" />
            <span class="text">{{ $t('admin') }}</span>
          </router-link>
        </div>
        <div class="lang">
          <div class="lang-item" :class="$store.state.daynight?'':'lang-item-light'" v-for="item in lang" :key="item.name" @click="onSelect(item.lang)">
            {{ item.name }}
          </div>
        </div>
      </div>
    </van-popup>
    <van-action-sheet v-model="show" :title="$t('selectUser')" :actions="actions" @select="onSelect" />
    <van-action-sheet style="font-size: 18px;" v-model="showLang" :title="$t('selectLang')" :actions="lang" @select="onSelect" />
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  import { CHAINIDBSC, CHAINID } from '@/config'

  export default {
    name: 'BaseHeader',
    props: {
      isBack: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: 'transparent',
      },
      title: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        closeIcon: require('../../assets/icon/menu.png'),
        line: require('../../assets/icon/line.png'),
        showpop: false,
        show: false,
        showLang: false,
        lang: [
          {
            name: 'English',
            lang: 'en',
          },
          {
            name: '中文',
            lang: 'cn',
          },
          {
            name: '한국어',
            lang: 'kr',
          },
        ],
        actions: [{ name: '选项一' }, { name: '选项二' }, { name: '选项三' }],
      }
    },
    computed: {
      iconClass() {
        if (this.$store.state.chainId == CHAINID) {
          return 'eth'
        } else if (this.$store.state.chainId == CHAINIDBSC) {
          return 'bsc'
        } else {
          return ''
        }
      },
      showLoading() {
        return this.$store.state.showLoading
      },
      isHome() {
        return this.$store.state.isHome
      },
      userInfo() {
        return this.$store.state.userInfo
      },
      userAddress() {
        return this.$store.state.userAddress
      },
      address() {
        return (
          this.userAddress.slice(0, 4) + '****' + this.userAddress.slice(38, 42)
        )
      },
    },
//   mounted(){
//  this.$store.commit('setmoudles',localStorage.getItem("moudles"))
//   },
    methods: {
      ...mapMutations(['setUserAddress']),
      ...mapMutations(['setmoudles']),
      ...mapActions(['initData']),
      changeMoudles() {
        const self = this
        self.$store.commit('setmoudles', !self.$store.state.daynight)
        console.log('2', self.$store.state.daynight)
      },
      async ethereum() {
        let accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        })
        if (accounts.length > 0) {
          this.setUserAddress(accounts[0])
          this.initData()
        }
      },
      onSelect(lang) {
        this.$i18n.locale = lang
        localStorage.setItem('lang', lang)
        this.showpop = false
      },
      handleClick() {
      },
      handleApp() {
        this.$router.push('/apply')
      },
      gotoSafe() {
        location.href =
          'https://docs.crossfimain.com/english/crossfi-crfi/audit'
      },
      gotoDoc() {
        location.href = 'https://docs.crossfimain.com/'
      },
      gotoOfficial() {
        location.href = 'https://www.crossfimain.com'
      },
    },
  }
</script>

<style lang="scss" scoped>
  .icon {
    width: 24px;
    height: 24px;
    background: url(../../assets/icon/menu.png) no-repeat;
    background-size: cover;
  }
  .address1 {
    color: #fff !important;
  }
  .address {
    display: flex;
    align-items: center;
    height: 24px;
    // width: 109px;
    background: transparent;
    margin-right: 16px;
    border: 1px solid #68CED5;

    color: #394255;

    // box-shadow: 0px 1px 1px #343c4a, inset 0px 3px 9px rgba(0, 0, 0, 0.1);
    border-radius: 32px;
    padding: 0 6px;

    &-icon {
      width: 18px;
      height: 18px;
      background-image: url(../../assets/icon/Group.png);
      background-repeat: no-repeat;
      background-size: cover;
      margin-right: 5px;

      &.eth {
        background-image: url(../../assets/icon/icon_eth.png);
        background-color: #fff;
        border-radius: 50%;
      }

      &.bsc {
        background-image: url(../../assets/icon/icon_bsc.svg);
        border-radius: 50%;
      }
    }

    &-pending {
      display: flex;
      align-items: center;
    }
  }
  .header {
    position: relative;
    background: transparent;
    // border-bottom-left-radius: 32px;
    // border-bottom-right-radius: 32px;
    // padding-bottom: 21px;
    font-size: 10px;
    width: 100%;

    &-title1 {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #394255;
    }

    &-title {
      font-size: 18px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #e5e5e5;
    }

    &-user {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px;
      color: #fff;

      .logo {
        display: flex;
        align-items: center;
      }

      .title-logo {
        width: 26px;
        height: 26px;
        margin-right: 10px;
      }

      .right {
        display: flex;
        align-items: center;
      }

      &-btn {
        // border: 1px solid #ccc;
        padding-right: 12px;
        border-radius: 20px;
      }
    }

    &-top {
      position: relative;
      // padding-top: 24px;
      padding: 20px 0;

      color: #fff;
      font-size: 16px;

      .icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 24px;
      }
    }

    &-address {
      position: absolute;
      top: 106px;
      // width: 680px;
      left: 28px;
      right: 28px;
      // left: 58px;
      // right: 58px;
      border-radius: 16px;
      // padding-bottom: 12px;
      color: #808080;
      font-size: 16px;

      .text {
        font-size: 18px;
      }
    }
  }

  /deep/ .van-popup-light {
    background: #EAF2FF;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    color: #fff;
  }
  /deep/ .van-popup-dark {
    background: #272831;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    color: #fff;
  }
  /deep/ .van-popup--right {
    z-index: 9999 !important;
  }
  .pop {
    z-index: 10000000;
    height: 100%;

    &-menu {
      flex: 1;
      padding-top: 120px;
      padding: 120px 20px 0;
      text-align: left;

      &-item {
        display: flex;
        align-items: center;
        width: 227px;
        height: 36px;

        /*background: #2c3446;*/
        margin: 0 auto 20px;
        border-radius: 10px;
        padding: 0 20px;
        font-size: 16px;
        font-family: Montserrat;
        font-weight: 400;
        line-height: 19px;
        color: #394255;
        opacity: 1;

        .text {
          margin-left: 20px;
        }
      }

      &-item-dark{
        color: #e5e4e4 !important;
      }
    }

    .lang {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      text-align: center;

      &-item {
        color: #e5e4e4;
        margin-bottom: 24px;
      }

      &-item-light {
        color: #394255;
        margin-bottom: 24px;
      }
    }
  }

  /deep/ .action-sheet__item {
    font-size: 18px;
  }
</style>
