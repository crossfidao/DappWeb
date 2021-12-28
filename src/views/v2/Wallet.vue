<template>
  <div :class="$store.state.daynight ? 'container1' : 'container'" class="">
    <BaseHeader />
    <h4 :class="$store.state.daynight ? 'chc' : ''" class="title">
      {{ $t('walletBalance') }} </h4>
    <div class="content">
      <div :class="$store.state.daynight ? 'd-bg' : ''" class="big-bg">
        <div :class="$store.state.daynight ? 'd-bg' : ''" class="balance-item bg1" style="border-radius:10px 10px 0 0  ;">
          <div class="balance-item-left" style="display:flex">
            <p class="icon cFIL" style="height: 0.96rem;width: 0.96rem;"></p>
            <div style="margin-left:10px">
              <p :class="$store.state.daynight ? 'chc' : ''" style="text-align: initial;color: #394255;">
                cFIL </p>
              <p style="color: #8C8D8D;font-size: 13px;margin-top: 5px;text-align: left;">
                {{ $t('balance') }} </p>
            </div>
          </div>
          <div>
            <p class="balance">{{ wallet.walletCFil | decimals }}</p>
            <router-link tag="p" to="/swap" class="balance-item-btn">
              {{ $t('swap') }}
            </router-link>
          </div>
        </div>
        <div :class="$store.state.daynight ? 'd-bg' : ''" class="balance-item bg2">
          <div class="balance-item-left " style="display:flex">
            <p class="icon CRFI" style="height: 0.96rem;
    width: 0.96rem;"></p>
            <div style="margin-left:10px">
              <p :class="$store.state.daynight ? 'chc' : ''" style="text-align: initial;
color: #394255;">
                CRFI </p>
              <p style="color: #8C8D8D;font-size: 13px;margin-top: 5px;text-align: left;">
                {{ $t('balance') }} </p>
            </div>
          </div>
          <p class="balance">{{ wallet.walletCRFI | decimals }}</p>
        </div>
        <div :class="$store.state.daynight ? 'd-bg' : ''" class="balance-item bg3" style="border-radius: 0 0  10px 10px;">
          <div class="balance-item-left" style="display:flex">
            <p class="icon sfFI" style="height: 0.96rem;
    width: 0.96rem;"></p>
            <div style="margin-left:10px">
              <p :class="$store.state.daynight ? 'chc' : ''" style="text-align: initial;
color: #394255;">
                sFIL </p>
              <p style="color: #8C8D8D;font-size: 13px;margin-top: 5px;text-align: left;">
                {{ $t('balance') }} </p>
            </div>
          </div>
          <div>
            <p class="balance">{{ wallet.walletSFil | decimals }}</p>
            <router-link tag="p" to="/staking" class="balance-item-btn">
              {{ $t('stake') }}
            </router-link>
          </div>
        </div>
      </div>
      <h4 :class="$store.state.daynight ? 'chc' : ''" class="title" style="margin-top:42px">
        {{ $t('myPositions') }} </h4>
      <div style="text-align: right; margin-bottom: 24px; margin-right: 24px; ">
        <span @click="withdrawAll" class="withdraw" style="background: #18CED2">
          {{ $t('withdrawAll') }}
        </span>
      </div>
      <!-- stake -->
      <div :class="$store.state.daynight ? 'item' : 'item1'" v-for="(item, index) in userList" :key="index">
        <div class="box">
          <div class="left1">
            <img v-if="item.Type == 0" style="width:24px;height:24px" src="@/assets/images/1.png" alt="" />
            <img v-else style="width:24px;height:24px" src="@/assets/images/2.png" alt="" />
            <div style="margin-left:11px">
              <div :class="$store.state.daynight ? 'chc' : ''" class="f1">
                {{ item.Type == 0 ? 'CRFI' : 'cFIL' }}
              </div>
              <div class="f2">{{ item.Days != 0 ? item.Days + ' ' + $t('day') : $t('onDemand')}}</div>
            </div>
          </div>

          <div v-show="parseInt(item.Days)>0" style="display:flex;align-items:center">
            <span :class="$store.state.daynight ? 'end1' : 'end'" style="margin-right:10px">END</span>
            <div :class="$store.state.daynight ? 't1' : 't2'">{{getTime(item.EndTime,'d')<0 ? '0' : getTime(item.EndTime,'d')}}</div>
            <span :class="$store.state.daynight ? 'end1' : 'end'">:</span>
            <div :class="$store.state.daynight ? 't1' : 't2'">{{getTime(item.EndTime,'h') <0 ? '0' : getTime(item.EndTime,'h')}}</div>
            <span :class="$store.state.daynight ? 'end1' : 'end'">:</span>
            <div :class="$store.state.daynight ? 't1' : 't2'">{{getTime(item.EndTime,'m') <0? '0' :getTime(item.EndTime,'m')}}</div>
          </div>

        </div>
        <div class="line"></div>
        <div class="item-set">
          <!-- 收益比例 -->
          <div style="display:flex;align-items:center;    justify-content: space-between;">
            <div :class="$store.state.daynight ? '' : 'f3'" class="item-rate" v-if="item.Type == 0">
              <span> CRFI: {{ getRate(item) | rate }}% </span> <span>+</span>
              <span>
                cFIL:
                {{ getCFilRate(item) | rate }}%
              </span>
            </div>
            <div :class="$store.state.daynight ? '' : 'f3'" class="item-rate" v-else>
              <span>
                cFIL:
                {{ getCFilRate(item) | rate }}%
              </span> <span>+</span> <span> CRFI: {{ getRate(item) | rate }}% </span>
            </div>
            <p :class="item.Type==0 ? 'f4' : 'f5 '" style="font-size: 13px;
font-family: PingFang SC;
font-weight: 600;" class="item-balance">
              {{ item.Amount | decimals }} </p>
          </div>
          <div style="display:flex;align-items:center;    justify-content: space-between;">
            <div :class="$store.state.daynight ? 'apr1' : 'apr'">APR</div>
            <div :class="$store.state.daynight ? 'apr1' : 'apr'">Staked</div>
          </div>
          <div :class="$store.state.daynight ? '' : 'f3'" style="" class="item-income" v-if="item.Type == 0">
            <div :class="$store.state.daynight ? '' : 'f3'" style="white-space: nowrap; " class="income">
              <p>CRFI {{ $t('profit') }}</p>
              <p :class="$store.state.daynight ? '' : 'f3'" class="income-text">
                + {{ item.CRFIInterest | decimals(6) }} </p>
            </div>
            <div style="white-space: nowrap;    " class="income">
              <p>cFIL {{ $t('profit') }}</p>
              <p :class="$store.state.daynight ? '' : 'f3'" class="income-text">
                + {{ item.CFilInterest | decimals(6) }} </p>
            </div>
          </div>
          <!-- cfil -->
          <div :class="$store.state.daynight ? '' : 'f3'" style="" class="item-income" v-else>
            <div style="white-space: nowrap; " class="income">
              <p>cFIL {{ $t('profit') }}</p>
              <p :class="$store.state.daynight ? '' : 'f3'" class="income-text">
                + {{ item.CFilInterest | decimals(6) }} </p>
            </div>
            <div style="white-space: nowrap;   " class="income">
              <p>CRFI {{ $t('profit') }}</p>
              <p :class="$store.state.daynight ? '' : 'f3'" class="income-text">
                + {{ item.CRFIInterest | decimals(6) }} </p>
            </div>
          </div>
          <!--<div style="display:flex;align-items:center;    justify-content: space-between;">
            <div :class="$store.state.daynight ? 'apr1' : 'apr'">Available</div>
            <div :class="$store.state.daynight ? 'apr1' : 'apr'">Frozen</div>
          </div>-->
          <span class="withdraw1" :class="item.Type == 0 ? 'item-coin-c' : 'item-coin-f'" @click="WithdrawDemand(item.PackageID)" v-if="item.Days == 0 || getEndTime(item.EndTime) < 0">
            {{ $t('withdraw') }}
          </span>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  import BigNumber from 'bignumber.js'
  import { mapActions, mapMutations } from 'vuex'

  export default {
    data() {
      return {
        currentRate: 0,
        currentTime: new Date().getTime(),
      }
    },
    created() {
      console.log(this.$store.state.userList)
    },
    computed: {
      cfilPrice() {
        return this.$store.state.cfilPrice
      },
      crfiPrice() {
        return this.$store.state.crfiPrice
      },
      wallet() {
        return this.$store.state.wallet
      },
      userList() {
        return this.$store.state.userList
      },
      showLoading() {
        return this.$store.state.showLoading
      },
      text() {
        return this.currentRate.toFixed(0) + '%'
      },
    },
    async mounted() {
    },
    methods: {
      ...mapMutations(['setUserAddress']),
      ...mapActions(['Withdraw']),
      getTime(Endtime, type) {
        let time = Endtime * 1000 - this.currentTime
        let d = parseInt(time / 1000 / 3600 / 24)
        let h = parseInt(time / 1000 % (24 * 3600) / 3600)
        // this.exchangeTimeText = (h === 0 ? '00' : h) + ''
        let m = parseInt((time / 1000 % 3600) / 60)
        // this.exchangeTimeText = this.exchangeTimeText + ':' + (m === 0 ? '00' : m)
        let s = parseInt((time / 1000 % 3600) % 60)
        // this.exchangeTimeText = this.exchangeTimeText + ':' + (s === 0 ? '00' : s)
        if (type == 'd') return d
        if (type == 'h') return h
        if (type == 'm') return m
        if (type == 's') return s
        return 0
      },
      getEndTime(value) {
        let now = parseInt(new Date().getTime())
        return value * 1000 - now
        return moment(value * 1000).format('YYYY-MM-DD')
      },
      withdrawAll() {
        this.Withdraw({
          PackageID: 0,
          bool: false,
        })
      },
      WithdrawDemand(ID) {
        this.Withdraw({
          PackageID: ID,
          bool: true,
        })
      },
      getRate(data) {
        let { Type, Amount = 1, CRFIInterestRateDyn } = data
        if (Amount == 0) {
          Amount = 1
        }
        if (Type == 1) {
          // CFil
          if (this.crfiPrice == 1 || this.cfilPrice == 1) {
            return CRFIInterestRateDyn
          }
          let result = new BigNumber(this.crfiPrice)
            .times(new BigNumber(CRFIInterestRateDyn))
            .div(new BigNumber(this.cfilPrice))
          return result.toString()
        } else {
          return CRFIInterestRateDyn
        }
      },
      getCFilRate(data) {
        let { Type, CFilInterestRate } = data
        if (Type == 0) {
          if (this.crfiPrice == 1 || this.cfilPrice == 1) {
            return CFilInterestRate
          }
          let result = new BigNumber(this.cfilPrice)
            .times(new BigNumber(CFilInterestRate))
            .div(new BigNumber(this.crfiPrice))
          return result.toString()
        } else {
          return CFilInterestRate
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .f4 {

    color: #5ACBD0 !important;
    font-size: 9px;
    font-family: Segoe UI;
    font-weight: 400;
  }
  .f5 {


    color: #FFB141 !important;
    font-size: 9px;
    font-family: Segoe UI;
    font-weight: 400;
  }
  .t1 {
    width: 21px;
    height: 21px;
    color: #394255;
    background: #fff;
    border-radius: 3px;
    line-height: 21px;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
  }
  .t2 {
    width: 21px;
    height: 21px;
    color: #fff;
    background: #394255;
    border-radius: 3px;
    line-height: 21px;
    text-align: center;
    margin-left: 5px;
    margin-right: 5px;
  }
  .end {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 800;
    color: #394255;
  }
  .end1 {
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 800;
    color: #fff;
  }
  .f3 {
    // color: #5e4e4e !important;
    color: #394255 !important;
    font-size: 12px;
    font-family: Segoe UI;
    font-weight: 400;
  }
  .apr {
    font-size: 11px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #8C8D8D;
  }
  .apr1 {
    font-size: 11px;
    font-family: PingFang SC;
    font-weight: 400;
    color: #8C8D8D;
  }
  .left1 {
    display: flex;
    align-items: center;

    .f1 {
      font-size: 15px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #394255;
      text-align: start;
    }

    .f2 {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #8c8d8d;
    }
  }
  .big-bg {
    width: 342px;
    height: 300px;
    box-shadow: 0px 2px 5px 0px rgba(0, 1, 0, 0.1);
    background: #fff;
    border-radius: 10px;
    margin-left: auto;
    margin-right: auto;
  }
  /deep/ .van-count-down {
    color: #fff;
  }
  .container {
    display: flex;
    flex-direction: column;
    height: 100%;
    background: #1f8aff;
    background: url('../../assets/images/bg.png') no-repeat;
    background-size: cover;
    color: #fff;

    .content {
      flex: 1;
    }
  }
  .container1 {
    display: flex;
    flex-direction: column;
    height: 100%;

    background: #272831;
    background-size: cover;
    color: #fff;

    .content {
      flex: 1;
    }
  }
  .title {
    margin: 12px 0;
    font-size: 20px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #394255;
  }
  .balance-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100px;
    width: 300px;
    margin: 0 auto 0;
    // box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    // border-radius: 10px;
    // padding: 0 15px;
    font-size: 19px;
    font-family: Montserrat;
    font-weight: 500;
    color: #ffffff;
    border-top: 1px solid #8c8d8dA3;
  }
  .balance-item:first-child{
    border: 0;
  }
  .balance {
    font-size: 16px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #00c693;
  }
  .balance-item-btn {
    right: 18px;
    margin-top: 5px;
    width: 73px;
    height: 20px;
    line-height: 20px;
    background: #ffffff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 5px;
    font-size: 10px;
    font-family: Montserrat;
    font-weight: 400;
    color: #1f8aff;
    width: 73px;
    height: 21px;
    background: #3b83fc;
    border-radius: 4px;
    font-size: 12px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #ffffff;
  }

  .withdraw {
    display: inline-block;
    //
    margin-top: 20px;
    height: 30px;
    line-height: 30px;
    background: #ffffff;
    // box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 5px;
    padding: 0 8px;
    text-align: center;
    font-size: 10px;
    font-family: Montserrat;
    font-weight: 400;
  }
  .withdraw1 {
    margin-top: 20px;
    display: inline-block;
    width: 300px;
    height: 44px;
    background: #5ACBD0;
    border-radius: 10px;
    font-size: 15px;
    font-family: PingFang SC;
    font-weight: 500;
    color: #FFFFFF;
    line-height: 44px;
  }
  .bg1 {
    background: #fff;
  }
  .bg2 {
    background: #fff;
  }
  .bg3 {
    background: #fff;
  }

  .item {
    width: 340px;
    margin: 0 auto 22px;
    background: #333b4b;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    padding: 12px 20px 23px;
    color: #fff;
    font-size: 10px;
    font-family: Segoe UI;

    .box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-left {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      width: 64px;
      height: 74px;
      background: #404b5d;
      margin-right: 12px;
      border-radius: 10px;
      font-size: 14px;
      font-family: Segoe UI;
      font-weight: bold;
      color: #ffffff;
      opacity: 1;

      .item-date {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .endtime {
      display: flex;
      align-items: center;
      text-align: left;
      margin: 10px 0 0;
    }

    &-coin {
      height: 24px;
      line-height: 24px;
      font-weight: 300;
      font-size: 12px;
    }

    &-coin-c {
      background: #18ced2;
      box-shadow: 0px 3px 0px 0px #3EA0AD;
    }

    &-coin-f {
      background: #FFB141;
      box-shadow: 0px 3px 0px 0px #E38E14;
    }

    &-right {
      flex: 1;
      text-align: right;
    }

    &-rate {
      text-align: left;
      font-weight: 600;
    }

    .line {
      margin-top: 10px;
      height: 0.1px;
      border-bottom: 0.1px solid #545657;
      overflow: hidden;
      // background: #abadaf;
    }

    &-balance {
      text-align: left;
      // margin: 0px 0 10px;
      font-size: 22px;
      font-weight: bold;
      line-height: 26px;
      color: #ffffff;
      opacity: 1;
    }

    .income-box {
      display: flex;
      justify-content: flex-end;
    }

    .item-income{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .income {
      // margin-left: 10px;
      display: flex;
      align-items: center;
      height: 28px;
      font-weight: 600;

      &-text {
        margin-left: 4px;
        font-size: 9px;
        font-family: Segoe UI;
        font-weight: 600;
        line-height: 11px;
        color: #fff;
        opacity: 1;
      }
    }

    &-set {
      // display: flex;
      // align-items: center;
      // justify-content: space-between;
      padding-top: 15px;
    }
  }
  .item1 {
    width: 340px;
    margin: 0 auto 22px;
    background: #fff;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    border-radius: 10px;
    padding: 12px 20px 23px;
    color: #fff;
    font-size: 10px;
    font-family: Segoe UI;

    .box {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-left {
      display: flex;
      flex-direction: column;
      overflow: hidden;
      width: 64px;
      height: 74px;
      background: #404b5d;
      margin-right: 12px;
      border-radius: 10px;
      font-size: 14px;
      font-family: Segoe UI;
      font-weight: bold;
      color: #ffffff;
      opacity: 1;

      .item-date {
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }

    .endtime {
      display: flex;
      align-items: center;
      text-align: left;
      margin: 10px 0 0;
    }

    &-coin {
      height: 24px;
      line-height: 24px;
      font-weight: 300;
      font-size: 12px;
    }

    &-coin-c {
      background: #18ced2;
    }

    &-coin-f {
      // background: #2786ff;
    }

    &-right {
      flex: 1;
      text-align: right;
    }

    &-rate {
      text-align: left;
    }

    .line {
      margin-top: 10px;
      height: 0.1px;
      border-bottom: 0.1px solid #d4d6d7;
      overflow: hidden;
    }

    &-balance {
      text-align: left;
      // margin: 0px 0 10px;
      font-size: 22px;
      font-weight: bold;
      line-height: 26px;
      color: #ffffff;
      opacity: 1;
    }

    .income-box {
      display: flex;
      justify-content: flex-end;
    }

    .item-income{
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
    .income {
      // margin-left: 10px;
      display: flex;
      align-items: center;
      height: 28px;
      font-weight: 600;

      &-text {
        margin-left: 4px;
        font-size: 9px;
        font-family: Segoe UI;
        font-weight: 600;
        line-height: 11px;
        color: #fff;
        opacity: 1;
      }
    }

    &-set {
      // display: flex;
      // align-items: center;
      // justify-content: space-between;
      padding-top: 15px;
    }
  }
  .icon {
    display: inline-block;
    width: 26px;
    height: 26px;
  }
  .cFIL {
    height: 36px;
    width: 36px;
    background: url('../../assets/icon/cFIL-wallet.png') no-repeat;
    background-size: cover;
  }
  .CRFI {
    background: url('../../assets/icon/CRFI-wallet.png') no-repeat;
    background-size: cover;
  }
  .sfFI {
    background: url('../../assets/icon/sfFI-wallet.png') no-repeat;
    background-size: cover;
  }
  .chc {
    color: #fff !important;
  }
  .d-bg {
    background: #2f303b !important;
  }
</style>
