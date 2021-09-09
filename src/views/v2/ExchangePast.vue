<template>
  <div class='container'>
    <div class='past-title'>
      <van-icon name='arrow-left' size='0.48rem' style='position: absolute;left: 0rem' @click="$router.go(-1)" />
      <!-- <div>往期兑换</div> -->
      <div>{{$t('exPastExchange')}}</div>
    </div>
    <div v-for="(item, index) in list" :key="index">
      <!-- <div>限额兑换</div> -->
      <div v-if="item.limitMark" class='content-first'>
        <div class='head-row'>
          <!--<van-icon name='question' size='0.43rem' color='#4A5263' style='position: absolute;right: 0rem;margin-top: 0.2rem' />-->
          <!-- <div>限额兑换</div> -->
          <div>{{$t('exLimitExchange')}}</div>
        </div>
        <div class='content-row'>
          <div v-if="!item.isExist" class="data-noexist">
            <div>{{$t('exNoData')}}</div>
          </div>
          <div class='row'>
            <!-- <div>期号</div> -->
            <div>{{$t('exDateNumber')}}</div>
            <div>{{item.codeNo}}</div>
          </div>
          <div class='row'>
            <!-- <div>兑换比例</div> -->
            <div>{{$t('exChangeRatio')}}</div>
            <div>{{item.ratio}} CRFI ：1 cFIL</div>
          </div>
          <div class='row'>
            <!-- <div>总兑换池</div> -->
            <div>{{$t('exTotalExchangePool')}}</div>
            <div>{{item.totalCfil}} cFIL</div>
          </div>
          <div class='row'>
            <!-- <div>兑换池总兑换数量</div> -->
            <div>{{$t('exTotalExchangeVolumeOfExchangePool')}}</div>
            <div>{{item.totalCrfi}} CRFI</div>
          </div>
          <div class='row'>
            <!-- <div>每人限额</div> -->
            <div>{{$t('exSinglePersonLimit')}}</div>
            <div>{{item.userLimit}} CRFI</div>
          </div>
          <div class='row'>
            <!-- <div>剩余可兑换</div> -->
            <div>{{$t('exRemainingConvertible')}}</div>
            <div>{{item.totalCfil * item.ratio - item.totalDepoistCrfil}} CRFI</div>
          </div>
          <div class='row'>
            <!-- <div>开始时间</div> -->
            <div>{{$t('exStartTime')}}</div>
            <div>{{formatDate(item.startTime)}}</div>
          </div>
          <div class='row'>
            <!-- <div>结束时间</div> -->
            <div>{{$t('exEndTime')}}</div>
            <div>{{formatDate(item.endTime)}}</div>
          </div>
          <hr />
          <div class="row">
            <!-- <div>成功兑换</div> -->
            <div>{{$t('exSuccess')}}</div>
            <div>{{toFloor(item.success, 4)}} cFIL</div>
          </div>
          <div class="row">
            <!-- <div>总参与兑换</div> -->
            <div>{{$t('exParticipationTotal')}}</div>
            <div>{{toFloor(item.Crfilnum, 4)}} CRFI</div>
          </div>
          <div class="row">
            <!-- <div>剩余</div> -->
            <div>{{$t('exBalance')}}</div>
            <div>{{toFloor(item.surplus, 4)}} CRFI</div>
          </div>
        </div>
        <!-- 提取 -->
        <div class="end" style="background: #00D3D6;color: #FFFFFF;" v-if="!limitWithdraw(item) && item.isExist" @click="btnClick(item, 'withdraw' )">{{$t('exExtract')}}</div>
        <!-- 已结束 -->
        <div class='end' v-else>{{$t('exOver')}}</div>
      </div>
      <!-- <div>无限额兑换</div> -->
      <div v-else class='content-first'>
        <div class='head-row'>
          <!--<van-icon name='question' size='0.43rem' color='#4A5263' style='position: absolute;right: 0rem;margin-top: 0.2rem' />-->
          <!-- <div>无限额兑换</div> -->
          <div>{{$t('exUnlimitedRedemption')}}</div>
        </div>
        <div class='content-row'>
          <div v-if="!item.isExist" class="data-noexist">
            <div>{{$t('exNoData')}}</div>
          </div>
          <div class='row'>
            <!-- <div>期号</div> -->
            <div>{{$t('exDateNumber')}}</div>
            <div>{{item.codeNo}}</div>
          </div>
          <div class='row'>
            <!-- <div>兑换比例</div> -->
            <div>{{$t('exChangeRatio')}}</div>
            <div>{{item.ratio}} CRFI ：1 cFIL</div>
          </div>
          <div class='row'>
            <!-- <div>总兑换池</div> -->
            <div>{{$t('exTotalExchangePool')}}</div>
            <div>{{item.totalCfil}} cFIL</div>
          </div>
          <div class='row'>
            <!-- <div>当前总参与数量</div> -->
            <div>{{$t('exCurrentTotalParticipation')}}</div>
            <div>{{item.totalDepoistCrfil}} CRFI</div>
          </div>
          <div class='row'>
            <!-- <div>兑换手续费</div> -->
            <div>{{$t('exChangeFee')}}</div>
            <div>{{item.fee}}% (CRFI)</div>
          </div>
          <!--<div class='row'>
            &lt;!&ndash; <div>剩余可兑换</div> &ndash;&gt;
            <div>{{$t('exRemainingConvertible')}}</div>
            <div>10 cFIL</div>
          </div>-->
          <div class='row'>
            <!-- <div>开始时间</div> -->
            <div>{{$t('exStartTime')}}</div>
            <div>{{formatDate(item.startTime)}}</div>
          </div>
          <div class='row'>
            <!-- <div>结束时间</div> -->
            <div>{{$t('exEndTime')}}</div>
            <div>{{formatDate(item.endTime)}}</div>
          </div>
          <hr />
          <div class="row">
            <div>{{$t('exSuccess')}}</div>
            <div>{{toFloor(item.success, 4)}} cFIL</div>
          </div>
          <div class="row">
            <!-- <div>总参与兑换</div> -->
            <div>{{$t('exParticipationTotal')}}</div>
            <div>{{toFloor(item.Crfilnum, 4)}} CRFI</div>
          </div>
          <div class="row">
            <!-- <div>兑换手续费</div> -->
            <div>{{$t('exChangeFee')}}</div>
            <div>{{toFloor(item.success * item.ratio * item.fee / 100, 4)}} CRFI</div>
          </div>
          <div class="row">
            <!-- <div>剩余</div> -->
            <div>{{$t('exBalance')}}</div>
            <div>{{toFloor(item.surplus, 4)}} CRFI</div>
          </div>
        </div>
        <!-- 提取 -->
        <div class="end" style="background: #00D3D6;color: #FFFFFF;" v-if="!limitWithdraw(item) && item.isExist" @click="btnClick(item, 'withdraw' )">{{$t('exExtract')}}</div>
        <!-- 已结束 -->
        <div class='end' v-else>{{$t('exOver')}}</div>
      </div>
    </div>
    <!--兑换提示-->
    <van-popup v-model="limitPopupWithdrawShow" closeable round :style="{ height: '8.7rem', width: '9.17rem', padding: '0.39rem', 'overflow-y': 'hidden' }">
      <!-- 限额兑换 -->
      <div class="popup-title">{{$t('exWithdrawTip')}}</div>
      <div class="popup-content" style="padding-left: 0.7rem; padding-right: 0.7rem;">
        <div class="row">
          <!-- <div>成功兑换</div> -->
          <div>{{$t('exSuccess')}}</div>
          <div>{{toFloor(exchangeLimit.success, 4)}} cFIL</div>
        </div>
        <div class="row">
          <!-- <div>总参与兑换</div> -->
          <div>{{$t('exParticipationTotal')}}</div>
          <div>{{toFloor(exchangeLimit.Crfilnum, 4)}} CRFI</div>
        </div>
        <div class="row">
          <!-- <div>剩余</div> -->
          <div>{{$t('exBalance')}}</div>
          <div>{{toFloor(exchangeLimit.surplus, 4)}} CRFI</div>
        </div>
        <div class="row" style="text-align: left;line-height: 0.6rem;">
          {{$t('exWithdrawRemark')}}
        </div>
        <div class="row">
          <!-- 确认 -->
          <div class="btn" @click="chainWithdraw(true)">{{$t('confirm')}}</div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="noLimitPopupWithdrawShow" closeable round :style="{ height: '10.48rem', width: '9.17rem', padding: '0.39rem', 'overflow-y': 'hidden' }">
      <!-- 无限兑换 -->
      <div class="popup-title">{{$t('exWithdrawTip')}}</div>
      <div class="popup-content" style="padding-left: 0.7rem; padding-right: 0.7rem;">
        <div class="row">
          <div>{{$t('exSuccess')}}</div>
          <div>{{toFloor(exchangeNoLimit.success, 4)}} cFIL</div>
        </div>
        <div class="row">
          <!-- <div>总参与兑换</div> -->
          <div>{{$t('exParticipationTotal')}}</div>
          <div>{{toFloor(exchangeNoLimit.Crfilnum, 4)}} CRFI</div>
        </div>
        <div class="row">
          <!-- <div>兑换手续费</div> -->
          <div>{{$t('exChangeFee')}}</div>
          <div>{{toFloor(exchangeNoLimit.success * exchangeNoLimit.ratio * exchangeNoLimit.fee / 100, 4)}} CRFI</div>
        </div>
        <div class="row">
          <!-- <div>剩余</div> -->
          <div>{{$t('exBalance')}}</div>
          <div>{{toFloor(exchangeNoLimit.surplus, 4)}} CRFI</div>
        </div>
        <div class="row" style="text-align: left;line-height: 0.6rem;">
          {{$t('exWithdrawRemark1')}} {{toFloor(exchangeNoLimit.success * exchangeNoLimit.ratio * exchangeNoLimit.fee / 100, 4)}} {{$t('exWithdrawRemark2')}}
        </div>
        <div class="row">
          <!-- 确认 -->
          <div class="btn" @click="chainWithdraw(false)">{{$t('confirm')}}</div>
        </div>
      </div>
    </van-popup>
  </div>

</template>

<script>
  import moment from 'moment'
  import { mapActions, mapMutations } from 'vuex'
  import { utils } from '@/config'
  import { Toast } from 'vant'

  export default {
    name: '',
    data() {
      return {
        currentRate: 0,
        list: [],
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
          popupWithdrawShow: false,
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
          popupWithdrawShow: false,
        },
        limitPopupWithdrawShow: false,
        noLimitPopupWithdrawShow: false,
        interv: 0,
      }
    },
    computed: {
      userCrfi() {
        if (this.$store.state.wallet.walletCRFI) {
          return utils.fromWei(this.$store.state.wallet.walletCRFI.toString())
        }
        return 0
      },
    },
    mounted() {
      this.interv = setInterval(this.initData, 2000)
    },
    destroyed() {
      clearInterval(this.interv)
    },
    methods: {
      ...mapMutations(['setUserAddress']),
      ...mapActions(['init', 'exIsInit']),
      async initData() {
        let self = this
        let isInit = await this.exIsInit()
        if (!isInit) return
        clearInterval(self.interv)
        self.$api.getPastList(self.userAddress, 1, self.$store.state.chainId).then(res => {
          self.list = res.data
          self.list.forEach(item => {
            // 查询参与总量
            self.$store.dispatch('exGetIssueInfoMap', { limit: parseInt(item.limitMark) === 1, codeNo: item.codeNo }).then(res => {
              if (res) item.totalDepoistCrfil = utils.fromWei(res.totalDepoistCrfil.toString())
              if (res) item.startTime = parseInt(res.starttime) * 1000
              if (res) item.endTime = parseInt(res.endtime) * 1000
            }).catch(err => {
              console.log(err)
            })
            // 查询用户兑换信息
            self.$store.dispatch('exGetUserInfo', { limit: parseInt(item.limitMark) === 1, codeNo: item.codeNo }).then(res => {
              //console.log('12', res)
              if (res) item.Crfilnum = utils.fromWei(res.Crfilnum.toString())
              if (res) item.isentry = res.isentry
              if (res) item.hadwithdraw = utils.fromWei(res.hadwithdraw.toString())
            }).catch(err => {
              console.log(err)
            })
            // 查询用户兑换信息
            self.$store.dispatch('exGetuserSwapCfil', { limit: parseInt(item.limitMark) === 1, codeNo: item.codeNo }).then(res => {
              console.log('13', item.codeNo, res)
              if (res) item.surplus = utils.fromWei(res.crfllite.toString())
              if (res.cfils) item.success = utils.fromWei(res.cfils.toString())
              if (res.nsend) item.success = utils.fromWei(res.nsend.toString())
            }).catch(err => {
              console.log(err)
            })
            item.isExist = true
          })
          self.$forceUpdate()
        })
      },
      formatDate(date) {
        return moment(date).format('yyyy-MM-DD hh:mm:ss')
      },
      limitWithdraw(item) {
        // console.log(item.codeNo, item.limitMark, parseFloat(item.hadwithdraw), parseFloat(item.success))
        if (!isNaN(parseFloat(item.success)) && !isNaN(parseFloat(item.hadwithdraw))) {
          return parseFloat(item.hadwithdraw) === parseFloat(item.success)
        }
        return true
      },
      // 按钮点击
      btnClick(item, type) {
        if (item.limitMark && !this.exchangeLimit.isentry && !this.showLoading && type === 'exchange') {
          this.exchangeLimit.popupShow = true
        }
        if (item.limitMark && this.exchangeLimit.isentry && !this.limitWithdraw(item) && type === 'withdraw') {
          this.exchangeLimit = item
          this.limitPopupWithdrawShow = true
        }
        if (item.limitMark && !this.exchangeLimit.isentry && type === 'max') {
          this.exchangeLimit = item
          if (this.userCrfi > this.exchangeLimit.userLimit) {
            this.limitAmount = this.exchangeLimit.userLimit
          } else {
            this.limitAmount = this.userCrfi
          }
        }
        if (!item.limitMark && !this.exchangeNoLimit.isentry && !this.showLoading && type === 'exchange') {
          this.exchangeNoLimit = item
          this.exchangeNoLimit.popupShow = true
        }
        if (!item.limitMark && this.exchangeNoLimit.isentry && !this.limitWithdraw(item) && type === 'withdraw') {
          this.exchangeNoLimit = item
          this.noLimitPopupWithdrawShow = true
        }
        if (!item.limitMark && !this.exchangeNoLimit.isentry && type === 'max') {
          this.exchangeNoLimit = item
          this.noLimitAmount = this.userCrfi
        }
        if (!this.showLoading && type === 'auth') {
          this.$store.dispatch('exApprove').then(() => {
            // 查询授权状态
            this.$store.dispatch('exGetApprove').then(res => {
              if (res) this.allowance = parseInt(res)
            })
          })
        }
      },
      // 链上提取
      chainWithdraw(isLimit) {
        let self = this
        // TODO 链上提取方法：withdraw(uint256 qinumber)
        let codeNo = self.exchangeNoLimit.codeNo
        if (isLimit) {
          codeNo = self.exchangeLimit.codeNo
          self.limitPopupWithdrawShow = false
        } else {
          self.noLimitPopupWithdrawShow = false
          if ((self.exchangeNoLimit.success * self.exchangeNoLimit.ratio * self.exchangeNoLimit.fee / 100) > self.userCrfi) {
            Toast(self.$t('exInsufficientBalance'))
            return
          }
        }
        self.$store.dispatch('exWithdraw', { limit: isLimit, codeNo: codeNo }).then(() => {
          self.initData()
          self.$api.logSuccess(self.userAddress, (isLimit ? '限额' : '非限额') + '兑换提取', '兑换期号：' + codeNo)
        }).catch(err => {
          self.$api.logError(self.userAddress, (isLimit ? '限额' : '非限额') + '兑换提取', '兑换期号：' + codeNo, err)
        })
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
        if (!n || n < 0) n = 2
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
        return String(n1).replace(/(\d)(?=(\d{3})+$)/g, '$1,') + '.' + n2
      },
    },
  }
</script>


<style lang='scss' scoped>
  @import '~@/assets/scss/exchangePast.scss'

</style>
