<template>
  <div class="about">
    <BaseHeader>
      <div class="title">
        <span>{{ $t('income') }}</span>
        <div class="btn" @click="Withdraw">{{ $t('fast') }}</div>
      </div>
    </BaseHeader>
    <div class="content items">
      <div class="income">
        <div class="income-title">
          <span class="circle"></span>
          <span>{{ $t('interestAssets') }}</span>
        </div>
        <div class="income-item">
          <span>CRFI: {{ userInfo.fdInterest | decimals }}</span>
          <span>eFil: {{ userInfo.efilInterest | decimals }}</span>
        </div>
      </div>
      <div class="income">
        <div class="income-title">
          <span class="circle"></span>
          <span>{{ $t('expireAssets') }}</span>
        </div>
        <div class="income-item">
          <span>CRFI: {{ userInfo.fd | decimals }}</span>
          <span>eFil: {{ userInfo.efil | decimals }}</span>
        </div>
      </div>
      <div class="item" v-for="item in expireList" :key="item.ID">
        <div class="date">
          <span class="text">{{ item.Days }}{{ $t('time') }}</span>
          <p class="date-bg">{{ item.Type == 0 ? 'CRFI' : 'eFil' }}</p>
        </div>
        <div class="item-content">
          <div class="price">
            <h5>
              CRFI:{{ item.FDInterestRate | rate }}% eFil:
              {{ item.EFilInterestRate | rate }}%
            </h5>
          </div>
        </div>
        <div class="" style="text-align:right">
          <!-- <span>[{{ $t('expireDate') }}] {{ item.EndTime | format }}</span> -->
          <h4 class="number">
            {{ item.Amount | decimals }}
          </h4>
          <div class="item-income">
            <span>+{{ getValue(item, 1) }} eFil</span>
            <p v-if="item.Type != 1">+{{ getValue(item) }} CRFI</p>
          </div>
        </div>
      </div>
      <div class="empty" v-if="expireList.length == 0">{{ $t('empty') }}</div>
    </div>

    <!-- 活期提现本金 -->
    <div class="items">
      <div class="title">
        <span>{{ $t('currentInvest') }}</span>
        <div class="btn" @click="WithdrawDemand">{{ $t('fast') }}</div>
      </div>
      <!-- <div>{{ userDemandList }}</div> -->
      <div class="item" v-for="item in userDemandList" :key="item.ID">
        <div class="date1">
          {{ item.Type == 0 ? 'CRFI' : 'eFil' }}
          <!-- <p class="date-bg"></p> -->
        </div>
        <div class="item-content">
          <div class="price">
            <h5>
              CRFI:{{ item.FDInterestRate | rate }}% eFil:
              {{ item.EFilInterestRate | rate }}%
            </h5>
          </div>
        </div>
        <div class="item-income">
          <h4 class="number">{{ item.Amount | decimals }}</h4>
          <!-- <span>[{{ $t('expireDate') }}] {{ item.EndTime | format }}</span> -->
          <!-- <div>
            <span>+{{ getValue(item, 1) }} eFil</span>
            <p>+{{ getValue(item) }} CRFI</p>
          </div> -->
        </div>
      </div>
      <div class="empty" v-if="userDemandList.length == 0">
        {{ $t('empty') }}
      </div>
    </div>
    <div class="items">
      <div class="title">eFil {{ $t('investment') }}</div>
      <div class="item" v-for="item in efilList" :key="item">
        <div class="date">
          <span class="text">{{ item.Days }}{{ $t('time') }}</span>
          <p class="date-bg">eFile</p>
        </div>
        <div class="item-content">
          <div class="price">
            <h5>
              CRFI:{{ item.FDInterestRate | rate }}% eFil:
              {{ item.EFilInterestRate | rate }}%
            </h5>
            <span class="price-date"
              >[{{ $t('expireDate') }}] {{ item.EndTime | format }}</span
            >
          </div>
        </div>
        <div style="text-align:right">
          <div>
            <h4 class="number">{{ item.Amount | decimals }}</h4>
          </div>
          <div class="item-income">
            <span>+{{ getValue(item, 1) }} eFil</span>
            <!-- <p>+{{ getValue(item) }} CRFI</p> -->
          </div>
        </div>
      </div>
      <div class="empty" v-if="efilList.length == 0">{{ $t('empty') }}</div>
    </div>
    <div class="items ">
      <div class="title">CRFI {{ $t('investment') }}</div>
      <!-- TODO: 时间 -->
      <div class="item" v-for="item in fdList" :key="item.ID">
        <div class="date">
          <span class="text">{{ item.Days }}{{ $t('time') }}</span>
          <p class="date-bg">CRFI</p>
        </div>
        <div class="item-content">
          <div class="price">
            <h5>
              CRFI:{{ item.FDInterestRate | rate }}% eFil:
              {{ item.EFilInterestRate | rate }}%
            </h5>
            <span class="price-date"
              >[{{ $t('expireDate') }}] {{ item.EndTime | format }}</span
            >
          </div>
        </div>
        <div class="item-income">
          <h4 class="number">{{ item.Amount | decimals }}</h4>
          <div>
            <span>+{{ getValue(item, 1) }} eFil</span>
            <p>+{{ getValue(item) }} CRFI</p>
          </div>
        </div>
      </div>
      <div class="empty" v-if="fdList.length == 0">{{ $t('empty') }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data() {
    return {
      active: 0,
    }
  },
  computed: {
    userInfo() {
      console.log(this.$store.state.userInfo)
      return this.$store.state.userInfo
    },
    expireList() {
      let arr = []
      let now = parseInt(new Date().getTime() / 1000)
      let list = this.$store.state.userList
      list.forEach(e => {
        let { EndTime } = e
        if (now > EndTime) {
          arr.push(e)
        }
      })
      return arr
    },
    fdList() {
      let arr = []
      let now = parseInt(new Date().getTime() / 1000)
      let list = this.$store.state.userList
      list.forEach(e => {
        let { Type, EndTime } = e
        if (now < EndTime && Type == 0) {
          arr.push(e)
        }
      })
      return arr
    },
    efilList() {
      let arr = []
      let now = parseInt(new Date().getTime() / 1000)
      let list = this.$store.state.userList
      list.forEach(e => {
        let { EndTime, Type } = e
        if (now < EndTime && Type == 1) {
          arr.push(e)
        }
      })
      return arr
    },
    userDemandList() {
      let arr = []
      let list = this.$store.state.userDemandList
      list.forEach(e => {
        if (e.Amount != 0) {
          arr.push(e)
        }
      })
      return arr
    },
  },
  mounted() {},
  methods: {
    ...mapActions(['Withdraw', 'WithdrawDemand']),
    async load() {
      let list = await this.$corsslend.callContract('GetInvesterRecords', [
        '0x5E95DbE6dd707B988e6CC2396b3F75a4Ea0afd0C',
      ])
      let now = parseInt(new Date().getTime() / 1000)

      list.forEach(element => {
        let { Type, EndTime } = element
        if (now > EndTime) {
          this.expireList.push(element)
        } else {
          if (Type == 0) {
            this.fdList.push(element)
          } else {
            this.efilList.push(element)
          }
        }
      })
    },
    getValue(data, type = 0) {
      let { Amount, FDInterestRate, EFilInterestRate, Days } = data
      let rate = 0
      if (type == 0) {
        rate = FDInterestRate
      } else {
        rate = EFilInterestRate
      }

      rate = this.$utils.fromWei(rate.toString())

      let value =
        ((parseFloat(this.$utils.fromWei(Amount)) * parseFloat(rate)) / 365) *
        parseInt(Days)
      return value.toFixed(5)
    },
    async handleBuy() {
      let betys = this.$CRFI.web3.eth.abi.encodeParameter('uint256', '0')
      let list = await this.$CRFI.executeContract('send', [
        '0x836f88f0f7147cb4cef05c0a92fcb2cc5c26f3b5',
        10,
        betys,
      ])
    },
    getStyle(index) {
      index = index >= 3 ? index % 2 : index
      return `background: no-repeat center/100% url('./bg${index}.png');`
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  padding-top: 30px;
}
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #63c2cd;
  padding: 10px 25px;
  font-family: PingFang SC;
  font-weight: 600;
  font-size: 12px;
  color: #63c2cd;
  .btn {
    background: #56bdc9;
    color: #fff;
    border-radius: 10px;
    padding: 2px 10px;
    font-weight: normal;
    font-size: 12px;
  }
}
.income {
  margin-bottom: 12px;
  padding: 0 21px;
  &-title {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
    font-size: 10px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #707070;
    .circle {
      width: 2px;
      height: 2px;
      background: #707070;
      margin-right: 4px;
    }
  }
  &-item {
    display: flex;
    margin-right: 12px;

    border-bottom: 1px solid #dfdfdf;
    padding-bottom: 12px;
    font-size: 10px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #000000;
    span {
      margin-right: 12px;
    }
  }
}
.items {
  width: 317px;
  margin: 0 auto 40px;
  background: #fff;
  padding-bottom: 12px;
  border-radius: 5px;
  text-align: left;
  font-size: 15px;
  .item {
    display: flex;
    align-items: center;
    margin: 0px 25px;
    padding: 15px 0;
    border-bottom: 1px solid #eee;

    .date1 {
      width: 47px;
      height: 47px;
      line-height: 47px;
      margin-right: 9px;
      border: 1px solid #bae3f9;
      border-radius: 10px;
      text-align: center;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #000;
    }
    .date {
      display: flex;
      flex-direction: column;
      justify-content: center;
      width: 47px;
      height: 47px;
      margin-right: 9px;
      text-align: center;
      font-size: 17px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
      &-bg {
        height: 18px;
        background: #63c2cd;
        border-bottom-left-radius: 8px;
        border-bottom-right-radius: 8px;
      }
      .text {
        flex: 1;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #000000;
      }
    }
    &-content {
      flex: 1;
    }
    .price {
      // display: flex;
      // align-items: center;
      // justify-content: space-between;

      &-date {
        display: inline-block;
        margin-top: 6px;
        font-size: 4px;
        font-family: PingFangSC-Light, PingFang SC;
        font-weight: 300;
        color: #707070;
      }
    }
    .item-income {
      font-size: 4px;
      font-family: PingFangSC-Light, PingFang SC;
      font-weight: 300;
      color: #707070;
    }
    .number {
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #000000;
    }
    .income {
      font-size: 10px;
      color: #96a5bf;
    }
  }
}
.empty {
  text-align: center;
  margin-top: 12px;
  font-size: 12px;
}
.mr-t {
  margin-top: 195px;
}
</style>
