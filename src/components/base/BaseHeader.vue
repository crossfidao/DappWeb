<template>
  <div class="header">
    <div class="header-user">
      <span>{{ address }}</span>
      <span v-show="showLoading">pending</span>
      <span class="header-user-btn" @click="ethereum">
        {{ !userAddress ? $t('connect') : '已连接' }}
      </span>
    </div>
    <div class="header-top">
      {{ $t(title) }}
      <van-icon class="icon" @click="showLang = true" name="weapp-nav" />
    </div>
    <div class="header-address">
      <slot></slot>
    </div>
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
        this.userAddress.slice(0, 16) + '...' + this.userAddress.slice(30, 42)
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
    onSelect(action) {
      this.$i18n.locale = action.lang
      localStorage.setItem('lang', action.lang)
      this.showLang = false
    },
    handleClick() {},
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
    &-btn {
      border: 1px solid #ccc;
      padding: 4px 12px;
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
    padding-bottom: 12px;
    color: #808080;
    font-size: 16px;
    .text {
      font-size: 18px;
    }
  }
}

/deep/ .action-sheet__item {
  font-size: 18px;
}
</style>
