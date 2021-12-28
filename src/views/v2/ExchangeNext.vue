<template>
  <div :class="$store.state.daynight ? 'container' : 'container1'">
    <div :class="$store.state.daynight ? 'past-title' : 'past-title1'">
      <van-icon name='arrow-left' size='0.48rem' style='position: absolute;left: 0rem' @click="$router.go(-1)" />
      <!-- <div>下期预告</div> -->
      <div>{{$t('exNextPreview')}}</div>
    </div>
    <div :class="$store.state.daynight ? 'content-first' : 'content-first1'">
      <div class='head-row'>
        <!--<van-icon name='question' size='0.43rem' color='#4A5263' style='position: absolute;right: 0rem;margin-top: 0.2rem' />-->
        <!-- <div>限额兑换</div> -->
        <div>{{$t('exLimitExchange')}}</div>
      </div>
      <div class='content-row'>
        <div v-if="!exchangeLimit.isExist" class="data-noexist">
          <div>{{$t('exNoData')}}</div>
        </div>
        <div class='row'>
          <!-- <div>期号</div> -->
          <div>{{$t('exDateNumber')}}</div>
          <div>{{exchangeLimit.codeNo}}</div>
        </div>
        <div class='row'>
          <!-- <div>兑换比例</div> -->
          <div>{{$t('exChangeRatio')}}</div>
          <div>{{exchangeLimit.ratio}} CRFI ：1 cFIL</div>
        </div>
        <div class='row'>
          <!-- <div>总兑换池</div> -->
          <div>{{$t('exTotalExchangePool')}}</div>
          <div>{{exchangeLimit.totalCfil}} cFIL</div>
        </div>
        <div class='row'>
          <!-- <div>兑换池总兑换数量</div> -->
          <div>{{$t('exTotalExchangeVolumeOfExchangePool')}}</div>
          <div>{{exchangeLimit.totalCrfi}} CRFI</div>
        </div>
        <div class='row'>
          <!-- <div>每人限额</div> -->
          <div>{{$t('exSinglePersonLimit')}}</div>
          <div>{{exchangeLimit.userLimit}} CRFI</div>
        </div>
        <div class='row'>
          <!-- <div>剩余可兑换</div> -->
          <div>{{$t('exRemainingConvertible')}}</div>
          <div>{{exchangeLimit.totalCfil * exchangeLimit.ratio - exchangeLimit.totalDepoistCrfil}} CRFI</div>
        </div>
        <div class='row'>
          <!-- <div>开始时间</div> -->
          <div>{{$t('exStartTime')}}</div>
          <div>{{limitStart}}</div>
        </div>
        <div class='row'>
          <!-- <div>结束时间</div> -->
          <div>{{$t('exEndTime')}}</div>
          <div>{{limitEnd}}</div>
        </div>
      </div>
      <!-- 敬请期待 -->
      <div class='end'>{{$t('exStayTuned')}}</div>
    </div>
    <div :class="$store.state.daynight ? 'content-first' : 'content-first1'">
      <div class='head-row'>
        <!--<van-icon name='question' size='0.43rem' color='#4A5263' style='position: absolute;right: 0rem;margin-top: 0.2rem' />-->
        <!-- <div>无限额兑换</div> -->
        <div>{{$t('exUnlimitedRedemption')}}</div>
      </div>
      <div class='content-row'>
        <div v-if="!exchangeNoLimit.isExist" class="data-noexist">
          <div>{{$t('exNoData')}}</div>
        </div>
        <div class='row'>
          <!-- <div>期号</div> -->
          <div>{{$t('exDateNumber')}}</div>
          <div>{{exchangeNoLimit.codeNo}}</div>
        </div>
        <div class='row'>
          <!-- <div>兑换比例</div> -->
          <div>{{$t('exChangeRatio')}}</div>
          <div>{{exchangeNoLimit.ratio}} CRFI ：1 cFIL</div>
        </div>
        <div class='row'>
          <!-- <div>总兑换池</div> -->
          <div>{{$t('exTotalExchangePool')}}</div>
          <div>{{exchangeNoLimit.totalCfil}} cFIL</div>
        </div>
        <div class='row'>
          <!-- <div>当前总参与数量</div> -->
          <div>{{$t('exCurrentTotalParticipation')}}</div>
          <div>{{exchangeNoLimit.totalDepoistCrfil}} CRFI</div>
        </div>
        <div class='row'>
          <!-- <div>兑换手续费</div> -->
          <div>{{$t('exChangeFee')}}</div>
          <div>{{exchangeNoLimit.fee}}% (CRFI)</div>
        </div>
        <!--<div class='row'>
          &lt;!&ndash; <div>剩余可兑换</div> &ndash;&gt;
          <div>{{$t('exRemainingConvertible')}}</div>
          <div>10 cFIL</div>
        </div>-->
        <div class='row'>
          <!-- <div>开始时间</div> -->
          <div>{{$t('exStartTime')}}</div>
          <div>{{noLimitStart}}</div>
        </div>
        <div class='row'>
          <!-- <div>结束时间</div> -->
          <div>{{$t('exEndTime')}}</div>
          <div>{{noLimitEnd}}</div>
        </div>
      </div>
      <!-- <div class='end'>敬请期待~</div> -->
      <div class='end'>{{$t('exStayTuned')}}</div>
    </div>
  </div>
</template>

<script>
  import moment from 'moment'

  export default {
    name: '',
    data() {
      return {
        currentRate: 0,
        exchangeLimit: { // 限额兑换对象
          isExist: true,
          codeNo: '',                 // 期号
          totalCfil: 0,               // 总兑换量
          totalCrfi: 0,               // 兑换池总兑换数量
          totalDepoistCrfil: 0,       // 已经参与的总CRFI数量
          ratio: 20,                  // 兑换比例，1CFIL={n}CRFI
          fee: 2,                     // 兑换手续费
          userLimit: 0,               // 每人兑换上限
          startTime: 0,               // 开始时间
          endTime: 0,                 // 结束时间
          stateMark: 0,               // 开启状态
          popupShow: false,           // 弹窗展示
          totalParticipate: 0,
          hasNext: false,             // 是否有下一期
          hasPast: false,             // 是否有上一期
          limitMark: 0,               // 是否限额
          Crfilnum: 0,                // 用户输入的CRFil的值
          remainderCfil: 0,           // 剩余CRFI
          isentry: true,             // 是否已经兑换过
          hadwithdraw: 0,             // 用户提取的数值
        },
        exchangeNoLimit: { // 非限额兑换对象
          isExist: true,
          codeNo: '',                 // 期号
          totalCfil: 0,               // 总兑换量
          totalCrfi: 0,               // 兑换池总兑换数量
          totalDepoistCrfil: 0,       // 已经参与的总CRFI数量
          ratio: 20,                  // 兑换比例，1CFIL={n}CRFI
          fee: 2,                     // 兑换手续费
          userLimit: 0,               // 每人兑换上限
          startTime: 0,               // 开始时间
          endTime: 0,                 // 结束时间
          stateMark: 0,               // 开启状态
          popupShow: false,           // 弹窗展示
          totalParticipate: 0,
          hasNext: false,             // 是否有下一期
          hasPast: false,             // 是否有上一期
          limitMark: 0,               // 是否限额
          Crfilnum: 0,                // 用户输入的CRFil的值
          remainderCfil: 0,           // 剩余CRFI
          isentry: true,              // 是否已经兑换过
          hadwithdraw: 0,             // 用户提取的数值
          success: 0,                 // 成功兑换的CFIL
          surplus: 0,                 // 剩余CRFI
        },
      }
    },
    computed: {
      limitStart() {
        return moment(this.exchangeLimit.startTime).format('yyyy-MM-DD hh:mm:ss')
      },
      limitEnd() {
        return moment(this.exchangeLimit.endTime).format('yyyy-MM-DD hh:mm:ss')
      },
      noLimitStart() {
        return moment(this.exchangeNoLimit.startTime).format('yyyy-MM-DD hh:mm:ss')
      },
      noLimitEnd() {
        return moment(this.exchangeNoLimit.endTime).format('yyyy-MM-DD hh:mm:ss')
      },
    },
    mounted() {
      let self = this
      console.log(self.$route.query.limit, self.$route.query.noLimit)
      self.$api.getFuture(self.userAddress, 1, self.$route.query.limit, self.$store.state.chainId).then(res => {
        self.exchangeLimit = Object.assign(self.exchangeLimit, res.data)
      }).catch(err => {
        self.exchangeLimit.isExist = false
        self.$forceUpdate()
      })
      self.$api.getNext(self.userAddress, 0, self.$route.query.noLimit, self.$store.state.chainId).then(res => {
        self.exchangeNoLimit = Object.assign(self.exchangeNoLimit, res.data)
      }).catch(err => {
        self.exchangeNoLimit.isExist = false
        self.$forceUpdate()
      })
    },
  }
</script>


<style lang="scss" scoped>
  @import '~@/assets/scss/exchangeNext.scss'

</style>
