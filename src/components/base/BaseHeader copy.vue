<template>
  <div class="header">
    <div class="header-user">
      <router-link to="/" tag="div" class="logo">
        <img src="../../assets/images/logo.png" alt="" class="title-logo" />
        <span>{{ address }}</span>
      </router-link>
      <span v-show="showLoading">pending</span>
      <div class="right">
        <span class="header-user-btn" @click="ethereum">
          {{ !userAddress ? $t('connect') : '已连接' }}
        </span>
        <span class="header-user-btn" @click="handleApp">
          {{ $t('application') }}
        </span>
        <van-icon class="icon" @click="showpop = true" name="weapp-nav" />
      </div>
    </div>
    <div class="header-top">
      {{ $t(title) }}
    </div>
    <div class="header-address">
      <slot></slot>
    </div>
    <van-popup
      round
      overlay-class="dfkdslfdl"
      v-model="showpop"
      position="right"
      :style="{ height: '100%', width: '162px' }"
    >
      <div class="pop">
        <div class="pop-menu">
          <div class="pop-menu-item">{{ $t('description') }}</div>
          <div class="pop-menu-item">{{ $t('link') }}</div>
          <div class="pop-menu-item">{{ $t('safe') }}</div>
          <div class="pop-menu-item">{{ $t('borrow') }}</div>
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
    title: {
      type: String,
      default: 'depositCoins',
    },
  },
  data() {
    return {
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
.home {
  background: #eee;
  height: 100%;
}
.header {
  position: relative;
  background: linear-gradient(180deg, #63c2cd 0%, #25aab9 100%);
  border-bottom-left-radius: 32px;
  border-bottom-right-radius: 32px;
  padding-bottom: 21px;
  font-size: 10px;
  &-user {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px;
    color: #fff;
    .logo {
      display: flex;
      align-items: center;
    }
    .title-logo {
      width: 34px;
      height: 30px;
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
    background: #fff;
    border-radius: 16px;
    // padding-bottom: 12px;
    color: #808080;
    font-size: 16px;
    .text {
      font-size: 18px;
    }
  }
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
      width: 100px;
      height: 46px;
      line-height: 46px;
      margin: 0 auto 0px;
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #45b6c3;
      border-bottom: 2px solid #45b6c3;
    }
  }
  .lang {
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #45b6c3;
    &-item {
      margin-bottom: 24px;
    }
  }
}

/deep/ .action-sheet__item {
  font-size: 18px;
}
</style>
