<template>
  <div class="headernew" :style="'background:' + color">
    <div class="headernew-user">
      <div class="left">
        <router-link to="/" tag="div" class="logo" v-if="!isBack || isHome">
          <img src="../../assets/logo.png" alt="" class="title-logo" />
        </router-link>
        <van-icon name="arrow-left" v-else size="24" @click="$router.back()" />
        <span v-if="title" class="headernew-title">{{ title }}</span>
        <div class="address">
          <span :class="`address-icon ${iconClass}`"></span> <span class="address-text" v-if="!showLoading">{{ address }}</span>
          <span class="address-pending" v-else>
            <i style="margin-right: 4px">pending</i>
            <van-loading type="spinner" size="20px" />
          </span>
        </div>
      </div>
      <!-- <span v-show="showLoading">pending</span> -->
      <div class="right">
        <van-popover v-model="lookShow" theme="dark" trigger="click" :actions="lookActions" @select="selectLookActions">
          <template #reference>
            <div class="look">
              <!-- 查看往期 -->{{$t('exViewPast')}}
              <van-icon v-show="!lookShow" name="arrow-down" />
              <van-icon v-show="lookShow" name="arrow-up" />
            </div>
          </template>
        </van-popover>
        <span class="icon" @click="showpop = true"></span>
        <!-- <van-icon :name="line" size="28" @click="showpop = true" /> -->
      </div>
    </div>
    <div class="headernew-top">
      <div class="headernew-top-title">
        <div>CSO (CrossFi</div>
        <div>Swap Opportunity)</div>
        <div class="headernew-top-nz">
          <div>{{exchangeTimeText}}</div>
          <!--<van-icon name="question-o" class="headernew-icon" size="0.34rem" color="#999" />-->
          <img src="~@/assets/images/nz.png" />
        </div>
      </div>
      <div>
        <img src="~@/assets/images/cfil-wallet.png" />
      </div>
    </div>
    <van-popup :overlay="true" closeable :close-icon="closeIcon" overlay-class="dfkdslfdl" v-model="showpop" position="right" :style="{ height: '100%', 'z-index': 9999 }">
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
          <router-link v-if="userInfo && userInfo.admin" tag="div" to="/admin" class="pop-menu-item">
            <van-icon name="arrow-left" />
            <span class="text">{{ $t('admin') }}</span>
          </router-link>
        </div>

        <div class="lang">
          <div class="lang-item" v-for="item in lang" :key="item.name" @click="onSelect(item.lang)">
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
  import { CHAINID, CHAINIDBSC } from '@/config'

  export default {
    name: 'BaseHeaderNew',
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
        lookActions: [{ text: this.$t('exViewPast') }, { text: this.$t('exNextIssue') }],
        lookShow: false,
        exchangeInterval: 0,
        exchangeTimeText: '00:00:00',
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
      exchangeObj() {
        return this.$store.state.exchange
      },
      exchangeEnd() {
        return this.$store.state.exchangeEnd
      },
      exchangeStart() {
        return this.$store.state.exchangeStart
      },
    },
    created() {
      this.exchangeInterval = setInterval(this.exchangeTime, 1000)
    },
    destroyed() {
      clearInterval(this.exchangeInterval)
    },
    methods: {
      ...mapMutations(['setUserAddress']),
      ...mapActions(['initData']),
      exchangeTime() {
        if (this.exchangeStart < new Date().getTime() && this.exchangeEnd && this.exchangeEnd > new Date().getTime()) {
          let time = this.exchangeEnd - new Date().getTime()
          let h = parseInt(time / 1000 / 3600)
          this.exchangeTimeText = (h === 0 ? '00' : h) + ''
          let m = parseInt((time / 1000 % 3600) / 60)
          this.exchangeTimeText = this.exchangeTimeText + ':' + (m === 0 ? '00' : m)
          let s = parseInt((time / 1000 % 3600) % 60)
          this.exchangeTimeText = this.exchangeTimeText + ':' + (s === 0 ? '00' : s)
        } else {
          this.exchangeTimeText = '00:00:00'
        }
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
        this.lookActions.splice(0, 1, { text: this.$t('exPastPeriod') })
        this.lookActions.splice(1, 1, { text: this.$t('exNextIssue') })
      },
      handleClick() {
      },
      handleApp() {
        this.$router.push('/apply')
      },
      gotoSafe() {
        location.href =
          'https://docs.crossfimain.com/english/project-introduction/code/audit'
      },
      gotoDoc() {
        location.href = 'https://docs.crossfimain.com/'
      },
      gotoOfficial() {
        location.href = 'https://www.crossfimain.com'
      },
      selectLookActions(action, index) {
        console.log(action, index, this.exchangeObj)
        if (index === 0) {
          this.$router.push({ path: '/exchangePast', query: { limit: this.exchangeObj.limit, noLimit: this.exchangeObj.noLimit } })
        } else if (index === 1) {
          this.$router.push({ path: '/exchangeNext', query: { limit: this.exchangeObj.limit, noLimit: this.exchangeObj.noLimit } })
        }
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
    // width: 109px;
    background: #232a38;
    margin-right: 16px;
    box-shadow: 0px 1px 1px #343c4a, inset 0px 3px 9px rgba(0, 0, 0, 0.1);
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
  .headernew {
    position: relative;
    background: transparent;
    // border-bottom-left-radius: 32px;
    // border-bottom-right-radius: 32px;
    // padding-bottom: 21px;
    font-size: 10px;
    height: 4.27rem;

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
      padding: 0.52rem 0.61rem 0.2rem;
      color: #fff;

      .left {
        display: flex;
        flex-direction: row;
        align-items: center;

        .logo {
          display: flex;
          align-items: center;
        }

        .title-logo {
          width: 0.91rem;
          height: 0.88rem;
          margin-right: 10px;
        }
      }

      .right {
        display: flex;
        align-items: center;

        .icon {
          margin-left: 10px;
        }

        .look {
          font-size: 0.4rem;
        }
      }

      &-btn {
        // border: 1px solid #ccc;
        padding-right: 12px;
        border-radius: 20px;
      }
    }

    &-top {
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding: 0.5rem 0.99rem 0 0.93rem;

      div {
        padding-left: 0.14rem;
      }

      div:last-child {
        padding-left: 0;
      }

      &-title {
        font-size: 0.44rem;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 0.6rem;
        text-align: left;
        padding-top: 0.05rem;

        .headernew-top-nz {
          display: flex;
          flex-direction: row;
          align-items: center;
          position: relative;

          img {
            width: 0.84rem;
            height: 0.92rem;
            z-index: 1;
          }

          div {
            width: 1.73rem;
            height: 0.56rem;
            background: #FFFFFF;
            border-radius: 0.1rem;
            position: absolute;
            left: 0.5rem;
            text-align: center;

            font-size: 0.27rem;
            color: #293546;
            font-weight: 600;
            line-height: 0.56rem;
          }

          .headernew-icon {
            position: absolute;
            left: 2.5rem;
          }
        }

      }

      img {
        width: 2.48rem;
        height: 2.59rem;
      }

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
