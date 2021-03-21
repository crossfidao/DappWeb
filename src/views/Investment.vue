<template>
  <div class="about">
    <BaseHeader title="depositCoins">
      <div class="step-box">
        <base-step></base-step>
      </div>
      <router-link tag="div" to="/assets" class="header-title">
        <h4>{{ $t('position') }}</h4>
        <van-icon name="arrow" />
      </router-link>
      <div class="desc">{{ $t('redemption', { value: userLen }) }}</div>
    </BaseHeader>

    <div class="items mr-t">
      <h4 class="title">eFil {{ $t('investment') }}</h4>
      <div
        class="item-box"
        :class="index % 2 == 0 ? 'flex-start' : 'flex-end'"
        v-for="(item, index) in efilList"
        :key="item.ID"
      >
        <div class="item" :style="getStyle(index)">
          <div
            class="item-content "
            :class="index % 2 == 0 ? 'content-left' : ''"
          >
            <div class="name">
              <h5 class="">
                FD:{{ item.FDInterestRate | decimals }}% eFil:
                {{ item.EFilInterestRate | decimals }}%
              </h5>
              <span class="text">{{ $t('annualized') }}</span>
            </div>
            <div class="btn" @click="handleBuy(item)">{{ $t('buy') }}</div>
          </div>
          <span
            class="date"
            :class="index % 2 == 0 ? 'date-left' : 'date-right'"
          >
            {{ item.Duration | date }}{{ $t('time') }}
          </span>
        </div>
      </div>
    </div>
    <div class="items">
      <h4 class="title">FD {{ $t('investment') }}</h4>
      <div
        class="item-box"
        :class="index % 2 == 0 ? 'flex-start' : 'flex-end'"
        v-for="(item, index) in fdList"
        :key="item.ID"
      >
        <div class="item" :style="getStyle(index)">
          <div
            class="item-content "
            :class="index % 2 == 0 ? 'content-left' : ''"
          >
            <div class="name">
              <h5 class="">
                FD:{{ item.FDInterestRate | decimals }}% eFil:
                {{ item.EFilInterestRate | decimals }}%
              </h5>
              <span class="text">{{ $t('annualized') }}</span>
            </div>
            <div class="btn" @click="handleBuy(item)">{{ $t('buy') }}</div>
          </div>
          <span
            class="date"
            :class="index % 2 == 0 ? 'date-left' : 'date-right'"
          >
            <!-- {{ item.Duration | date }}{{ $t('time') }} -->
          </span>
        </div>
      </div>
    </div>
    <van-overlay class="mask" :show="showMask" @click.self="showMask = false">
      <div class="mask-content">
        <h4 class="mask-title">{{ $t('buy') }}</h4>
        <div class="form">
          <van-field
            class="field"
            center
            clearable
            v-model="value"
            :placeholder="$t('buyPlaceholder')"
          />
        </div>
        <div class="footer">
          <div class="footer-btn" @click="showMask = false">
            {{ $t('cancel') }}
          </div>
          <div class="footer-btn" @click="handleConfirm">
            {{ $t('confirm') }}
          </div>
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import BaseStep from '@/components/base/BaseStep.vue'
export default {
  components: {
    BaseStep,
  },
  data() {
    return {
      showMask: false,
      value: '',
      curItem: null,
    }
  },
  computed: {
    userLen() {
      let list = this.$store.state.userList
      let now = parseInt(new Date().getTime() / 1000)
      let num = 0
      list.forEach(e => {
        let { EndTime } = e
        if (now > EndTime) {
          num++
        }
      })
      return num
    },
    fdList() {
      return this.$store.state.fdList
    },
    efilList() {
      return this.$store.state.eFilList
    },
  },
  mounted() {},
  methods: {
    ...mapActions(['buyCoin']),

    handleConfirm() {
      if (!this.value) {
        this.$toast(this.$t('toast'))
        return
      }
      console.log(this.value)
      this.buyCoin({
        ...this.curItem,
        value: this.value,
      })
      this.showMask = false
      this.value = ''
    },
    async handleBuy(data) {
      this.showMask = true
      this.curItem = data
    },
    getStyle(index) {
      index = index >= 3 ? index % 2 : index
      return `background: no-repeat center/100% url('./bg${index}.png');`
    },
  },
}
</script>

<style scoped lang="scss">
.step-box {
  // padding: 0 64px;
  border-bottom: 1px solid #9cd8df;
}
.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 80px 48px 64px;
  font-size: 30px;
  color: #63c2cd;
}
.desc {
  margin-bottom: 75px;
  color: #96a5bf;
  font-size: 22px;
}
.mr-t {
  margin-top: 550px;
}
.items {
  position: relative;
  background: #fff;
  margin: 0 42px 90px;
  padding-top: 100px;
  padding-bottom: 42px;
  border-radius: 12px;
  font-size: 25px;
  .title {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    right: 0;
    width: 173px;
    height: 60px;
    line-height: 60px;
    background: #63c2cd;
    border-radius: 32px;
    font-size: 30px;
    color: #fff;
    font-weight: bold;
  }
  .item-box {
    display: flex;
    margin-bottom: 40px;
    height: 148px;
    background-size: cover;
  }
  .flex-start {
    justify-content: flex-start;
  }
  .flex-end {
    justify-content: flex-end;
  }
  .item {
    position: relative;
    display: flex;
    text-align: center;
    width: 620px;
    height: 148px;
    &-content {
      width: 440px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #000000;
      .btn {
        background: #63c2cd;
        margin-top: 64px;
        width: 96px;
        border-radius: 32px;
        font-size: 24px;
        height: 42px;
        line-height: 42px;
        color: #fff;
      }

      .name {
        margin-top: 12px;
        padding-left: 42px;
      }
      .text {
        margin-top: 24px;
        display: block;
        font-size: 22px;
        font-family: PingFang SC;
        font-weight: 300;
        color: #96a5bf;
      }
    }
    .content-left {
      margin-left: 160px;
    }
    .date {
      position: absolute;
      bottom: 24px;
      font-size: 44px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #27abba;
      &-left {
        left: 24px;
      }
      &-right {
        right: 24px;
      }
    }
  }
}
.mask {
  // position: fixed;
  // top: 0;
  // bottom: 0;
  // left: 0;
  // right: 0;
  // background: rgba(0, 0, 0, 0.6);
  &-content {
    width: 620px;
    // height: 400px;

    position: absolute;
    z-index: 99;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    background: #fff;
    border-radius: 32px;
    padding-bottom: 24px;
    font-size: 30px;
    color: #63c2cd;
  }
  &-title {
    padding: 24px 0;
  }
  .footer {
    display: flex;
    justify-content: center;
    &-btn {
      width: 174px;
      height: 64px;
      margin: 0 27px;
      line-height: 64px;
      background: #63c2cd;
      color: #fff;
      font-size: 30px;
      border-radius: 32px;
    }
  }
}
.form {
  padding: 0 32px;
}
.field {
  height: 84px;
  line-height: 84px;
  background: #eee;
  margin-bottom: 20px;
}
.mr-t {
  margin-top: 550px;
}
</style>
