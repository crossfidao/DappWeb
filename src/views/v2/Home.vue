<template>
  <div v-bind:class="handleClass">
    <BaseHeader />
    <!-- <h4 class="title">{{ $t('dashboard') }}</h4> -->
    <!-- <h4 class="title2">{{ $t('filStatistics') }}</h4> -->
    <div class="circle" style="text-align: center">
      <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
        <van-swipe-item class="banner-img" @click="toUrl(swiper.url)" v-for="(swiper, index) in swiperList" :key="index">
          <img style="width:100%;height:100%" :src="swiper.img" alt="" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <van-notice-bar :scrollable="false">
      <img style="width:12px;height:15px" src="@/assets/images/ling.png" alt="" />
      <div class="hot-spot">Hot Spot</div>
      <van-swipe vertical class="notice-swipe" :autoplay="3000" :show-indicators="false" width="200px">
        <van-swipe-item @click="toUrl(item.noticeContent)" :class="$store.state.daynight ? 'w-w' : ''" v-for="(item, i) in gongList" :key="i" style="overflow: hidden;text-overflow: ellipsis;white-space: nowrap;">{{ item.noticeTitle }}
        </van-swipe-item>
      </van-swipe>
      <img style="width:6px;height:12px;margin-left:10px" src="@/assets/images/right.png" alt="" />
    </van-notice-bar>
    <h4 :class="$store.state.daynight ? 'title-d' : 'title2'">
      {{ $t('filStatistics') }} </h4>
    <h4 class="title2" style="margin-bottom: 20px">
      <!-- {{ $t('filStatistics') }} -->
    </h4>
    <div class="chart-panle" :class="$store.state.daynight ? 'd-bg' : ''">
      <div class="chart-item">
        <div id="myChart"></div>
      </div>
      <div class="chart-title">cFIL Loan Utilization
      </div>
    </div>
    <div class="items">
      <div :class="$store.state.daynight ? 'chc' : 'item'" class="bg flex-col" style="">
        <img style="width:22px;height:25px" src="@/assets/images/cfil.png" alt="" />
        <p :class="$store.state.daynight ? 'font-styled' : 'font-style1'" class="item-text " v-html="$t('fileCoinDepositTotal')"></p>
        <p class="item-text item-bottom font-style2">
          {{ toFloor(fromWei(Number(systemInfo.nowInvestCFil) + Number(otherSystemInfo.nowInvestCFil)),4)}} </p>
      </div>
      <div :class="$store.state.daynight ? 'chc' : 'item'" class="color flex-col" style="">
        <img style="width:22px;height:25px" src="@/assets/images/cfil.png" alt="" />
        <p :class="$store.state.daynight ? 'font-styled' : 'font-style1'" class="item-text " v-html="$t('lendingTotal')"></p>
        <p class="item-text item-bottom font-style2">
          {{ toFloor(fromWei(Number(systemInfo.cfilLendingTotal) + Number(otherSystemInfo.cfilLendingTotal)),4)}} </p>
      </div>
    </div>
    <h4 :class="$store.state.daynight ? 'title-d' : 'title2'" style="margin-bottom: 20px; margin-top: 20px;">
      {{ $t('crfiStatistics') }} </h4>
    <div class="items" style="padding-bottom: 30px">
      <div :class="$store.state.daynight ? 'chc' : 'item'" class=" bg flex-col">
        <img style="width:26px;height:25px" src="@/assets/images/crfi.png" alt="" />
        <p :class="$store.state.daynight ? 'font-styled' : 'font-style1'" class="item-text color " v-html="$t('crfiDepositTotal')">
          {{ $t('crfiDepositTotal') }} </p>
        <p class="item-text item-bottom font-style2" style="color: #5ACBD0;">
          {{ toFloor(fromWei(Number(systemInfo.nowInvestCRFI) + Number(otherSystemInfo.nowInvestCRFI)),4)}} </p>
      </div>
      <div :class="$store.state.daynight ? 'chc' : 'item'" class=" flex-col">
        <img style="width:26px;height:25px" src="@/assets/images/crfi.png" alt="" />
        <p :class="$store.state.daynight ? 'font-styled' : 'font-style1'" class="item-text " v-html="$t('referra')">
          {{ $t('referra') }} </p>
        <p class="item-text item-bottom font-style2" style="color: #5ACBD0;">
          {{ toFloor(fromWei(Number(systemInfo.crfiRewardTotal) + Number(otherSystemInfo.crfiRewardTotal)),4) }} </p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapMutations } from 'vuex'
  import BigNumber from 'bignumber.js'
  import QRCode from 'qrcodejs2'
  import Web3 from 'web3'

  let web3 = new Web3()
  let { utils } = web3
  export default {
    data() {
      return {
        currentRate: 0,
        gongList: [],
        swiperList: [],
        currentNum: 0.7,
      }
    },
    created() {
      this.getGongList()
      this.getSwiperList()
    },
    watch: {
      '$store.state.daynight'(newVal, oldVal) {
        console.log(1111111111111, newVal)
        this.drawLine()
      },
    },
    computed: {
      daynight1() {
        console.log('com', this.$store.state.daynight)
        return this.$store.state.daynight
      },
      systemInfo() {
        return this.$store.state.systemInfo
      },
      otherSystemInfo() {
        return this.$store.state.otherSystemInfo
      },
      rate() {
        let { cfilLendingTotal: a1, nowInvestCFil: a2 } = this.systemInfo
        let { cfilLendingTotal: b1, nowInvestCFil: b2 } = this.otherSystemInfo
        const cfilLendingTotal = Number(a1 || 0) + Number(b1 || 0)
        const nowInvestCFil = Number(a2 || 0) + Number(b2 || 0)
        let rate = new BigNumber(cfilLendingTotal).div(
          new BigNumber(nowInvestCFil),
        )
        if (cfilLendingTotal == 0) {
          return 0
        }
        return parseInt(rate * 100)
      },
      showLoading() {
        return this.$store.state.showLoading
      },
      text() {
        return this.currentRate.toFixed(0) + '%'
      },
      handleClass(){
        console.log('handleClass', this.$store.state.daynight ? 'container1' : 'container')
        return this.$store.state.daynight ? 'container1' : 'container'
      },
    },
    mounted() {
      const self = this
      setTimeout(function() {
        self.drawLine()
      }, 2000)
      console.log('daynight', this.$store.state.daynight)
    },
    methods: {
      ...mapMutations(['setUserAddress']),
      ...mapActions(['initData']),

      toUrl(str) {
        str = str.replace('<p>', '').replace('</p>', '')
        location.href = str
      },
      //获取公告列表
      getGongList() {
        const self = this
        self.$api.getGongList().then(res => {
          self.gongList = res.data
        })
      },
      getSwiperList() {
        const self = this
        self.$api.getSwiper().then(res => {
          self.swiperList = res.data
          console.log('22', self.swiperList)
        })
      },
      drawLine() {
        console.log(this, this.$echarts)
        const self = this
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          series: [
            {
              type: 'gauge',
              startAngle: 180,
              endAngle: 0,
              min: 0,
              max: 1,
              splitNumber: 8,
              axisLine: {
                lineStyle: {
                  width: 20,
                  color: [
                    // 双色之间的数据
                    [self.rate / 100, '#fDAf60'],
                    [1, '#58D9F9'],
                  ],
                },
              },
              pointer: {
                icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
                length: 48,
                width: 10,
                offsetCenter: [0, -60],
                itemStyle: {
                  color: 'auto',
                },
              },
              axisTick: {
                distance: -14,
                length: 8,
                lineStyle: {
                  color: self.$store.state.daynight ? '#464646' : '#fff',
                  width: 2,
                },
              },
              splitLine: {
                distance: 10,
                length: 20,
                lineStyle: {
                  color: 'auto',
                  width: 0,
                },
              },
              axisLabel: {
                color: self.$store.state.daynight ? '#464646' : '#fff',
                fontSize: 20,
                distance: -60,
                formatter: function(value) {
                  /*if (value === 0.875) {
                        return 'A';
                      } else if (value === 0.625) {
                        return 'B';
                      } else if (value === 0.375) {
                        return 'C';
                      } else if (value === 0.125) {
                        return 'D';
                      }*/
                  console.log(value)
                  return ''
                },
              },
              title: {
                offsetCenter: [0, '-20%'],
                fontSize: 30,
              },
              detail: {
                fontSize: 30,
                offsetCenter: [0, '-10%'],
                valueAnimation: true,
                formatter: function(value) {
                  return Math.round(value * 100) + '%'
                },
                color: self.$store.state.daynight ? '#fff' : '#1F3C55',
              },
              data: [
                {
                  // 指针位置
                  value: self.rate / 100,
                },
              ],
            },
          ],
        })
      },
      fromWei(data) {
        if(!data) return  '0.0'
        return utils.fromWei(utils.toBN(new BigNumber(data)))
      },
      toFloor(x, n) {
        let ff = parseFloat(x)
        if (isNaN(ff)) {
          let s = '0.0'
          while (s.length < 2 + n) {
            s += '0'
          }
          return s
        }
        if (n < 0) n = 2
        let yz = Math.pow(10, n)
        let f = Math.round(x * yz) / yz
        let s = f.toString()
        let rs = s.indexOf('.')
        if (rs < 0) {
          rs = s.length
          s += '.'
        }
        while (s.length <= rs + n) {
          s += '0'
        }
        let n1 = s.substr(0, rs)
        let n2 = s.substr(rs + 1)
        if (n2) return String(n1).replace(/(\d)(?=(\d{3})+$)/g, '$1,') + '.' + n2
        return String(n1).replace(/(\d)(?=(\d{3})+$)/g, '$1,')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .d-bg {
    background: #2F303B !important;
  }
  .d-dd {
    background: #4B4C56 !important;
  }
  .chc {
    display: flex;
    flex-direction: column;
    color: #394255;

    padding: 20px 0 18px 0;
    width: 163px;
    height: 120px;

    box-shadow: 0px 2px 5px 0px rgba(0, 1, 0, 0.1);
    border-radius: 10px;
    background: #2f303b;
  }
  .font-style1 {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #394255;
    white-space: nowrap !important;
  }
  .font-styled {
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #fff;
    white-space: nowrap !important;
  }
  .font-style2 {
    font-size: 21px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #ffb141;
  }
  .flex-col {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .hot-spot {
    width: 52px;
    height: 14px;
    border: 1px solid #5acbd0;
    border-radius: 3px;
    font-size: 11px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: #5acbd0;
    line-height: 12px;
    margin-left: 9px;
    margin-right: 5px;
  }
  /deep/ .van-notice-bar {
    position: relative;
    top: -12px;
    background-color: transparent;
    font-size: 13px;
    font-family: PingFang SC;
    font-weight: 400;
    width: 360px;
    color: #394255;
  }
  /deep/ .van-notice-bar__wrap {
    height: 14px;
  }
  /deep/ .van-swipe__track--vertical {
    height: 14px;
  }
  /deep/ .van-notice-bar__content {
    height: 18px;
    display: flex;
    align-items: center;
    width: 320px;
  }
  /deep/ .notice-swipe {
    width: 300px !important;
    height: 25px !important;
    line-height: 24px !important;
  }
  /deep/ .van-swipe__track {
    height: 165px;
  }
  .van-swipe {
    border-radius: 10px;
  }
  .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    line-height: 150px;
    width: 342px !important;
    height: 165px;
    text-align: center;
  }
  .banner-img {
    width: 342px;
    height: 165px;

    /deep/ img {
      width: 342px;
      height: 165px;
    }
  }
  .chart-panle {
    width: 340px;
    height: 190px !important;
    background: #FFFFFF;box-shadow: 0 2px 5px 0 rgba(0, 1, 0, 0.1);border-radius: 10px;display: flex; align-self: center;position: relative;margin-bottom: 50px;
  }
  .chart-item {
    width: 340px;
    height: 190px !important;
    overflow: hidden;
  }
  #myChart {
    width: 380px; height: 400px;position: relative; top: -43px; left: -20px;
  }
  .chart-title {
    font-size: 14px;font-weight: 600;color: #5ACBD0;position: absolute;top: 155px; left: 100px;
  }
  .container {
    display: flex;
    flex-direction: column;
    color: #fff;
    text-align: left;
    // align-items: center;
    background: url('../../assets/images/bg.png') no-repeat;
    background-size: cover;
    overflow-x: hidden;

    .content {
      overflow-x: hidden;
    }
  }
  .container1 {
    display: flex;
    flex-direction: column;
    color: #fff;
    text-align: left;
    // align-items: center;
    background: url('../../assets/images/bg.png') no-repeat;
    background-size: cover;
    overflow-x: hidden;

    .content {
      overflow-x: hidden;
    }

    background: #272831;
  }
  .title {
    margin-left: 16px;
    margin-bottom: 16px;
    font-size: 25px;
    font-family: Montserrat;
    font-weight: 400;
    line-height: 30px;
    color: #ffffff;
  }
  .title2 {
    margin-left: 27px;
    margin-bottom: 10px;
    font-size: 16px;
    font-family: Montserrat-Regular;
    line-height: 19px;
    color: #ffffff;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #394255;
  }
  .title-d {
    margin-left: 27px;
    margin-bottom: 10px;
    font-size: 16px;
    font-family: Montserrat-Regular;
    line-height: 19px;
    color: #ffffff;
    font-size: 18px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #fff;
  }
  .w-w {
    color: #fff;
  }
  .circle {
    width: 100%;
    height: 180px;
    margin-bottom: 23px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  /deep/ .van-circle__text {
    color: #73ffe9;
    font-size: 20px;
    font-weight: bold;
  }
  .items {
    display: flex;
    justify-content: space-around;
    text-align: center;

    .item {
      display: flex;
      flex-direction: column;
      color: #394255;

      padding: 20px 0 18px 0;
      width: 163px;
      height: 120px;
      background: #ffffff;
      box-shadow: 0px 2px 5px 0px rgba(0, 1, 0, 0.1);
      border-radius: 10px;

      &-text {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 12px;
      }

      &-bottom {
        // background: ;
        // box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
        opacity: 1;
        border-radius: 0px 0px 13px 13px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
      }
    }
  }
</style>
