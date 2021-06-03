<template>
  <div class="container home">
    <BaseHeader :isBack="true" />
    <div class="content">
      <h4 class="title">{{ $t('referralRewards') }}</h4>
      <div class="items">
        <div class="logo"></div>
        <div class="items-content">
          {{ userInfo.totalAffCRFI | decimals }}
        </div>
        <div class="item-btn">
          <span
            class="tag-read btn"
            :data-clipboard-text="inviteLink"
            @click="copy"
          >
            {{ $t('claim') }}
          </span>
        </div>
      </div>
    </div>

    <h4 class="title" style="margin-bottom: 42px">
      {{ $t('claimedRewards') }}
    </h4>
    <!-- <van-empty description="暂无数据" size="0px" image="" /> -->
    <div class="item" v-for="item in rewardsList" :key="item.indexed">
      <span class="item-logo"></span>
      <div class="item-right">
        <p class="price">+ {{ item.amount | decimals }} CRFI</p>
        <p class="address">
          {{ item.sender.slice(0, 12) + '...' + item.sender.slice(32, 42) }}
        </p>
        <p class="date">{{ getDate(item.timestamp) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import Clipboard from 'clipboard'
import { mapActions, mapMutations } from 'vuex'
export default {
  data() {
    return {
      showMask: false,
      currentRate: 0,
      value: '',
    }
  },
  computed: {
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
    text() {
      return this.currentRate.toFixed(0) + '%'
    },
  },
  async mounted() {
    console.log(location)
    console.log(location.href + '?invite=' + this.userAddress)
    this.getRewardList()
  },
  methods: {
    ...mapMutations(['setUserAddress']),
    ...mapActions(['getRewardList']),
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
/deep/ .van-empty__image {
  display: none;
}
.home {
  z-index: 999;
  height: 100%;
  overflow: auto;
}
.container {
  display: flex;
  flex-direction: column;
  // height: 100%;
  background: #414447;
  color: #fff;
  .content {
    padding-bottom: 24px;
  }
}
.content {
  padding: 0 32px;
}
.logo {
  width: 42px;
  height: 42px;
  background: url('../../assets/images/1.png') no-repeat;
  background-size: cover;
  margin: 0 auto 40px;
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
</style>
