<template>
  <div class="header" :style="'background:' + color">
    <div class="header-user">
      <router-link to="/" tag="div" class="logo" v-if="!isBack || isHome">
        <img src="../../assets/logo.png" alt="" class="title-logo" />
      </router-link>
      <van-icon name="arrow-left" v-else size="24" @click="$router.back()" />
      <span v-if="title" class="header-title">{{ title }}</span>
      <!-- <span v-show="showLoading">pending</span> -->
      <div class="right">
        <div class="address">
          <span class="address-icon"></span>
          <span class="address-text" v-if="!showLoading">{{ address }}</span>
          <span class="address-pending" v-else>
            <i style="margin-right: 4px">pending</i>
            <van-loading type="spinner" size="20px" />
          </span>
        </div>
        <span class="icon" @click="showpop = true"></span>
        <!-- <van-icon :name="line" size="28" @click="showpop = true" /> -->
      </div>
    </div>

    <van-popup
      :overlay="true"
      closeable
      :close-icon="closeIcon"
      overlay-class="dfkdslfdl"
      v-model="showpop"
      position="right"
      :style="{ height: '100%', 'z-index': 9999 }"
    >
      <div class="pop">
        <div class="pop-menu">
          <router-link tag="div" to="/staking" class="pop-menu-item">
            <van-icon name="arrow-left" />
            <span class="text">{{ $t('borrowMenu') }}</span>
          </router-link>
          <div class="pop-menu-item" @click="gotoOfficial">
            <van-icon name="arrow-left" />
            <span class="text">{{ $t('aboutCrossFi') }}</span>
          </div>
          <div class="pop-menu-item" @click="gotoSafe">
            <van-icon name="arrow-left" />
            <span class="text">{{ $t('auditReport') }}</span>
          </div>
          <div class="pop-menu-item" @click="gotoDoc">
            <van-icon name="arrow-left" />
            <span class="text">{{ $t('supportCenter') }}</span>
          </div>
          <router-link tag="div" to="/reward" class="pop-menu-item">
            <van-icon name="arrow-left" />
            <span class="text">{{ $t('referralRewards') }}</span>
          </router-link>
          <router-link
            v-if="userInfo.admin"
            tag="div"
            to="/admin"
            class="pop-menu-item"
          >
            <van-icon name="arrow-left" />
            <span class="text">{{ $t('admin') }}</span>
          </router-link>
        </div>

        <div class="lang">
          <div
            class="lang-item"
            v-for="item in lang"
            :key="item.name"
            @click="onSelect(item.lang)"
          >
            {{ item.name }}
          </div>
        </div>
      </div>
    </van-popup>
    <van-action-sheet
      v-model="show"
      :title="$t('selectUser')"
      :actions="actions"
      @select="onSelect"
    />
    <van-action-sheet
      style="font-size: 18px;"
      v-model="showLang"
      :title="$t('selectLang')"
      :actions="lang"
      @select="onSelect"
    />
  </div>
</template>

<script>
import { mapActions, mapMutations } from 'vuex'
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
  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['initData']),
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
    handleClick() {},
    handleApp() {
      this.$router.push('/apply')
    },
    gotoSafe() {
      location.href =
        'https://docs.crossfimain.com/english/security-audit-report'
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
.address {
  display: flex;
  align-items: center;
  height: 24px;
  width: 109px;
  background: #232a38;
  margin-right: 16px;
  box-shadow: 0px 1px 1px #343c4a, inset 0px 3px 9px rgba(0, 0, 0, 0.1);
  border-radius: 32px;
  padding: 0 6px;
  &-icon {
    width: 18px;
    height: 18px;
    background: url(../../assets/icon/Group.png) no-repeat;
    background-size: cover;
    margin-right: 5px;
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
  &-title {
    font-size: 25px;
    font-family: Montserrat;
    font-weight: 500;
    color: #18ced2;
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
      width: 42px;
      height: 42px;
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

/deep/ .van-popup {
  background: #1f8aff;
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

      background: #2c3446;
      margin: 0 auto 20px;
      border-radius: 10px;
      padding: 0 20px;
      font-size: 15px;
      font-family: Montserrat;
      font-weight: 400;
      line-height: 19px;
      color: #ffffff;
      opacity: 1;
      .text {
        margin-left: 20px;
      }
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
      margin-bottom: 24px;
    }
  }
}

/deep/ .action-sheet__item {
  font-size: 18px;
}
</style>
