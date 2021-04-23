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

    <div class="content">
      <div class="items">
        <h4 class="title">cFil {{ $t('investment') }}</h4>
        <div
          class="item-box"
          :class="index % 2 == 0 ? 'flex-start' : 'flex-end'"
          v-for="(item, index) in cfilList"
          :key="item.ID"
        >
          <div class="item" :style="getStyle(index)">
            <div
              class="item-content "
              :class="index % 2 == 0 ? 'content-left' : ''"
            >
              <div class="name">
                <span class="text">{{ $t('annualized') }}</span>
                <h5 class="">
                  CRFI:{{ item.CRFIInterestRate | rate }}% cFil:
                  {{ item.CFilInterestRate | rate }}%
                </h5>
                <span class="name-number text">
                  {{ $t('deposited') }}:
                  {{ item.deposited || 0 | decimals }} cFil
                </span>
              </div>
              <div class="btn" @click="handleBuy(item)">{{ $t('buy') }}</div>
            </div>
            <span
              class="date"
              :class="index % 2 == 0 ? 'date-left' : 'date-right'"
            >
              {{ item.Days || $t('current') }}
              <template v-if="item.Days">
                {{ $t('time') }}
              </template>
            </span>
          </div>
        </div>
      </div>
      <div class="items">
        <h4 class="title">CRFI {{ $t('investment') }}</h4>
        <div
          class="item-box"
          :class="index % 2 == 0 ? 'flex-start' : 'flex-end'"
          v-for="(item, index) in crfiList"
          :key="item.ID"
        >
          <div class="item" :style="getStyle(index)">
            <div
              class="item-content "
              :class="index % 2 == 0 ? 'content-left' : ''"
            >
              <div class="name">
                <span class="text">{{ $t('annualized') }}</span>
                <h5 class="">
                  CRFI:{{ item.CRFIInterestRate | rate }}% cFil:
                  {{ item.CFilInterestRate | rate }}%
                </h5>
                <span class="name-number text">
                  {{ $t('deposited') }}:
                  {{ item.deposited || 0 | decimals }} CRFI
                </span>
              </div>
              <div class="btn" @click="handleBuy(item)">{{ $t('buy') }}</div>
            </div>
            <span
              class="date"
              :class="index % 2 == 0 ? 'date-left' : 'date-right'"
            >
              {{ item.Days || $t('current') }}
              <template v-if="item.Days">
                {{ $t('time') }}
              </template>
            </span>
          </div>
        </div>
      </div>
    </div>
    <van-overlay class="mask" :show="showMask" @click.self="showMask = false">
      <div class="mask-content">
        <h4 class="mask-title">{{ $t('buy') }}</h4>
        <div class="form">
          <div class="mask-desc">
            <span v-show="curItem.Type == '1'">
              cFil {{ $t('balance') }}:
              {{ balance.watlletcfil | decimals }}
            </span>
            <span v-show="curItem.Type == '0'">
              CRFI {{ $t('balance') }}:
              {{ balance.watlletCRFI | decimals }}
            </span>
          </div>
          <van-field
            class="field"
            center
            clearable
            v-model="value"
            :placeholder="$t('buyPlaceholder')"
          />
          <!-- <van-field
            class="field"
            center
            clearable
            v-model="inviteValue"
            :placeholder="$t('invitePlaceholder')"
          /> -->
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
      isDemand: false,
      value: '',
      inviteValue: '',
      curItem: {
        ID: 0,
      },
    }
  },
  computed: {
    balance() {
      return this.$store.state.balance
    },
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
    crfiList() {
      console.log('list', this.$store.state.crfiList)
      return this.$store.state.crfiList
    },
    cfilList() {
      return this.$store.state.eFilList
    },
    demandFD() {
      return this.$store.state.demandFD
    },
    demandEFil() {
      return this.$store.state.demandEFil
    },
  },
  mounted() {
    let invite = this.getQueryString('invite') || ''
    this.inviteValue = invite
  },
  methods: {
    ...mapActions(['buyCoin', 'demandBuyCoin']),
    getQueryString(name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
      let r = window.location.search.substr(1).match(reg)
      if (r != null) {
        return decodeURIComponent(r[2])
      }
      return null
    },
    handleConfirm() {
      if (!this.value) {
        this.$toast(this.$t('toast'))
        return
      }
      if (this.isDemand) {
        this.demandBuyCoin({
          ...this.curItem,
          value: this.value,
          inviteValue: this.inviteValue,
        })
      } else {
        this.buyCoin({
          ...this.curItem,
          value: this.value,
          inviteValue: this.inviteValue,
        })
      }
      this.showMask = false
      this.value = ''
    },
    async handleBuy(data) {
      let { Days } = data

      this.isDemand = !Days
      this.showMask = true
      this.curItem = data
    },
    // 活期
    async handleDemandBuy(data) {
      this.showMask = true
      this.isDemand = true
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
  padding: 22px 0;
  border-bottom: 1px solid #9cd8df;
}
.header-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 24px;
  font-size: 15px;
  color: #63c2cd;
}
.desc {
  margin-bottom: 20px;
  color: #96a5bf;
  font-size: 11px;
}
.mr-t {
  margin-top: 275px;
}
.content {
  padding-top: 260px;
  padding-bottom: 12px;
}
.items {
  position: relative;
  background: #fff;
  margin: 0 21px 45px;
  padding-top: 50px;
  padding-bottom: 21px;
  border-radius: 6px;
  font-size: 12px;
  .title {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    // width: 173px;
    height: 30px;
    line-height: 30px;
    background: #63c2cd;
    border-radius: 16px;
    font-size: 15px;
    color: #fff;
    font-weight: bold;
  }
  .item-box {
    display: flex;
    margin-bottom: 10px;
    height: 74px;
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
    width: 310px;
    height: 74px;
    &-content {
      width: 220px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #000000;
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #63c2cd;
        margin-top: 32px;
        width: 48px;
        border-radius: 16px;
        font-size: 12px;
        height: 21px;
        line-height: 21px;
        color: #fff;
      }

      .name {
        margin-top: 6px;
        padding-left: 21px;
        text-align: left;
        font-size: 11px;
      }
      .text {
        // margin-top: 12px;
        display: block;
        font-family: PingFang SC;
        font-weight: 300;
        color: #96a5bf;
      }
    }
    .content-left {
      margin-left: 80px;
    }
    .date {
      position: absolute;
      bottom: 12px;
      font-size: 22px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #27abba;
      &-left {
        left: 12px;
      }
      &-right {
        right: 12px;
      }
    }
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
    background: #fff;
    padding-bottom: 20px;
    font-size: 15px;
    color: #63c2cd;
    border-radius: 8px;
    border: 1px solid #26aab9;
  }
  &-title {
    padding: 12px 0;
  }
  &-desc {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
    // padding: 0 20px;
    font-size: 10px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #707070;
    span {
      width: 128px;
      background: #f0f0f0;
      padding: 4px;
      border-radius: 8px;
    }
  }
  .footer {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    &-btn {
      width: 87px;
      height: 32px;
      margin: 0 14px;
      line-height: 32px;
      background: #63c2cd;
      color: #fff;
      font-size: 15px;
      border-radius: 16px;
    }
  }
}
.form {
  padding: 0 16px;
}
.field {
  height: 42px;
  line-height: 42px;
  background: #eee;
  margin-bottom: 10px;
}
.mr-t {
  padding-top: 2750px;
}
</style>
