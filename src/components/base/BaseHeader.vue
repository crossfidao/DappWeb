<template>
  <div class="header" :style="'background:' + color">
    <div class="header-user">
      <router-link to="/" tag="div" class="logo" v-if="!isBack">
        <img src="../../assets/logo.png" alt="" class="title-logo" />
        <!-- <span>{{ address }}</span> -->
      </router-link>
      <van-icon name="arrow-left" v-else size="24" @click="$router.back()" />
      <span v-if="title" class="header-title">{{ title }}</span>
      <span v-show="showLoading">pending</span>
      <div class="right">
        <!-- <span class="header-user-btn" @click="ethereum">
          {{ !userAddress ? $t('connect') : '已连接' }}
        </span>
        <span class="header-user-btn" @click="handleApp">
          {{ $t('application') }}
        </span> -->
        <van-icon :name="line" size="28" @click="showpop = true" />
      </div>
    </div>

    <van-popup
      :overlay="true"
      closeable
      close-icon="wap-nav"
      overlay-class="dfkdslfdl"
      v-model="showpop"
      position="right"
      :style="{ height: '100%', width: '273px' }"
    >
      <!-- overlay-style="background: #000000" -->
      <div class="pop">
        <div class="pop-menu">
          <router-link tag="div" to="/staking" class="pop-menu-item">
            <van-icon name="arrow-left" />
            <span class="text">{{ $t('staking') }}</span>
          </router-link>
          <div class="pop-menu-item">
            <van-icon name="arrow-left" />
            <span class="text">{{ $t('aboutCrossFi') }}</span>
          </div>
          <div class="pop-menu-item">
            <van-icon name="arrow-left" />
            <span class="text">{{ $t('auditReport') }}</span>
          </div>
          <div class="pop-menu-item">
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
      line: require('../../assets/icon/line.png'),
      showpop: false,
      show: false,
      showLang: false,
      lang: [
        {
          name: '中文',
          lang: 'cn',
        },
        {
          name: 'English',
          lang: 'en',
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
    userInfo() {
      return this.$store.state.userInfo
    },
    userAddress() {
      return this.$store.state.userAddress
    },
    address() {
      return (
        this.userAddress.slice(0, 16) + '...'
        // + this.userAddress.slice(30, 42)
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
  },
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  background: transparent;
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
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
.pop {
  height: 100%;
  display: flex;
  flex-direction: column;
  &-menu {
    flex: 1;
    padding-top: 120px;
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
