<template>
  <div class="container">
    <BaseHeaderNew></BaseHeaderNew>
    <div class="cont">
      <div class="tabs">
        <van-tabs v-model="active" @change="changeTab" background="#343B4A" title-inactive-color="#FFFFFF" title-active-color="#00D3D6" color="#00D3D6" line-width="120" offset-top="2ren">
          <!--限额兑换-->
          <van-tab title-style="font-size: 0.45rem;font-weight: 500;" :title="$t('exLimitExchange')">
            <div v-show="exchangeLimit.showData">
              <div class="tab-panel" v-if="exchangeLimit.stateMark !== 2">
                <div class="first">
                  <div style="width: 45%;">
                    <div class="title">{{parseInt(exchangeLimit.totalDepoistCrfil)}} CRFI</div>
                    <!-- <div>当前总参与数量</div> -->
                    <div>{{$t('exCurrentTotalParticipation')}}</div>
                  </div>
                  <div style="width: 10%;">/</div>
                  <div style="width: 45%;">
                    <div class="title">{{exchangeLimit.totalCfil}} cFIL</div>
                    <!--<div>剩余可兑换数量</div>-->
                    <div>{{$t('exTotalExchangePool')}}</div>
                  </div>
                </div>
                <div class="tab-btn" v-show="allowance < 1" :class="showLoading ? 'btn-disabled':''" @click="btnClick(true, 'auth' )">{{$t('exAuth')}}</div>
                <div class="tab-btn" v-show="allowance > 0 && exchangeLimit.stateMark===1" :class="exchangeLimit.isentry || showLoading ? 'btn-disabled':''" @click="btnClick(true, 'exchange' )" :disabled="exchangeLimit.isentry">{{$t('exchangeBtn')}}</div>
                <div class="tab-btn" v-show="allowance > 0 && exchangeLimit.stateMark===0">{{exchangeLimit.timeText}}</div>
                <div class="three">
                  <div class="row">
                    <!-- <div>期号</div> -->
                    <div>{{$t('exDateNumber')}}</div>
                    <div>{{exchangeLimit.codeNo}}</div>
                  </div>
                  <div class="row">
                    <!-- <div>兑换比例</div> -->
                    <div>{{$t('exChangeRatio')}}</div>
                    <div>{{exchangeLimit.ratio}} CRFI ：1 cFIL</div>
                  </div>
                  <div class="row">
                    <!-- <div>兑换池总兑换数量</div> -->
                    <div>{{$t('exExchangePool')}}</div>
                    <div>{{exchangeLimit.totalCrfi}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>每人限额</div> -->
                    <div>{{$t('exSinglePersonLimit')}}</div>
                    <div>{{exchangeLimit.ratio * exchangeLimit.userLimit}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>剩余可兑换</div> -->
                    <div>{{$t('exRemainingConvertible')}}</div>
                    <div>{{parseInt(exchangeLimit.totalDepoistCrfil)+' / '+parseInt(exchangeLimit.totalCrfi)}} CRFI</div>
                  </div>
                  <hr v-show="exchangeLimit.isentry" />
                  <div class="row" v-show="exchangeLimit.isentry">
                    <!-- <div>每人限额</div> -->
                    <div>{{$t('exHasParticipation')}}</div>
                    <div>{{exchangeLimit.Crfilnum}} CRFI</div>
                  </div>
                </div>
              </div>
              <div class="tab-panel" v-else>
                <div class="three">
                  <div class="row">
                    <!-- <div>期号</div> -->
                    <div>{{$t('exDateNumber')}}</div>
                    <div>{{exchangeLimit.codeNo}}</div>
                  </div>
                  <div class="row">
                    <!-- <div>兑换比例</div> -->
                    <div>{{$t('exChangeRatio')}}</div>
                    <div>{{exchangeLimit.ratio}} CRFI ：1 cFIL</div>
                  </div>
                  <div class="row">
                    <!-- <div>总兑换池</div> -->
                    <div>{{$t('exTotalExchangePool')}}</div>
                    <div>{{exchangeLimit.totalCfil}} cFIL</div>
                  </div>
                  <div class="row">
                    <!-- <div>兑换池总兑换数量</div> -->
                    <div>{{$t('exExchangePool')}}</div>
                    <div>{{exchangeLimit.totalCrfi}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>每人限额</div> -->
                    <div>{{$t('exSinglePersonLimit')}}</div>
                    <div>{{exchangeLimit.ratio * exchangeLimit.userLimit}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>剩余可兑换</div> -->
                    <div>{{$t('exRemainingConvertible')}}</div>
                    <div>{{parseInt(exchangeLimit.totalDepoistCrfil)+' / '+parseInt(exchangeLimit.totalCrfi)}} CRFI</div>
                  </div>
                </div>
                <hr />
                <div class="four">
                  <div class="row">
                    <!-- <div>成功兑换</div> -->
                    <div>{{$t('exSuccess')}}</div>
                    <div>{{toFloor(exchangeLimit.success, 8)}} cFIL/{{toFloor(exchangeLimit.success * exchangeLimit.ratio, 8)}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>总参与兑换</div> -->
                    <div>{{$t('exParticipationTotal')}}</div>
                    <div>{{toFloor(exchangeLimit.Crfilnum, 8)}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>剩余</div> -->
                    <div>{{$t('exBalance')}}</div>
                    <div>{{toFloor(exchangeLimit.surplus, 8)}} CRFI</div>
                  </div>
                </div>
                <div class="tab-btn" :class="limitWithdraw?'btn-disabled':''" :disabled="limitWithdraw" @click="btnClick(true, 'withdraw' )">
                  <!-- 提取 -->{{$t('exExtract')}}
                </div>
              </div>
            </div>
          </van-tab>
          <!--非限额兑换-->
          <van-tab title-style="font-size: 0.45rem;font-weight: 500;" :title="$t('exNonlimitExchange')">
            <div v-show="exchangeLimit.showData">
              <div class="tab-panel" v-if="exchangeNoLimit.stateMark !== 2">
                <div class="first">
                  <div style="width: 45%;">
                    <div class="title">{{parseInt(exchangeNoLimit.totalDepoistCrfil)}} CRFI</div>
                    <!-- <div>当前总参与数量</div> -->
                    <div>{{$t('exCurrentTotalParticipation')}}</div>
                  </div>
                  <div style="width: 10%;">/</div>
                  <div style="width: 45%;">
                    <div class="title">{{exchangeNoLimit.totalCfil}} cFIL</div>
                    <!-- <div>总兑换池</div> -->
                    <div>{{$t('exTotalExchangePool')}}</div>
                  </div>
                </div>
                <div class="tab-btn" v-show="allowance < 1" :class="showLoading ? 'btn-disabled':''" @click="btnClick(false, 'auth' )">{{$t('exAuth')}}</div>
                <div class="tab-btn" v-show="allowance > 0 && exchangeNoLimit.stateMark===1" :class="exchangeNoLimit.isentry || showLoading ? 'btn-disabled':''" @click="btnClick(false, 'exchange' )" :disabled="exchangeNoLimit.isentry">{{$t('exchangeBtn')}}</div>
                <div class="tab-btn" v-show="allowance > 0 && exchangeNoLimit.stateMark===0">{{exchangeNoLimit.timeText}}</div>
                <div class="three">
                  <div class="row">
                    <!-- <div>期号</div> -->
                    <div>{{$t('exDateNumber')}}</div>
                    <div>{{exchangeNoLimit.codeNo}}</div>
                  </div>
                  <div class="row">
                    <!-- <div>兑换比例</div> -->
                    <div>{{$t('exChangeRatio')}}</div>
                    <div>{{exchangeNoLimit.ratio}} CRFI ：1 cFIL</div>
                  </div>
                  <div class="row">
                    <!-- <div>兑换池总兑换数量</div> -->
                    <div>{{$t('exTotalExchangeVolumeOfExchangePool')}}</div>
                    <div>{{$t('exNoLimit')}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>每人限额</div> -->
                    <div>{{$t('exSinglePersonLimit')}}</div>
                    <div>{{$t('exNoLimit')}}</div>
                  </div>
                  <div class="row">
                    <!-- <div>兑换手续费</div> -->
                    <div>{{$t('exChangeFee')}}</div>
                    <div>{{exchangeNoLimit.fee}}% (CRFI)</div>
                  </div>
                  <hr v-show="exchangeNoLimit.isentry" />
                  <div class="row" v-show="exchangeNoLimit.isentry">
                    <!-- <div>每人限额</div> -->
                    <div>{{$t('exHasParticipation')}}</div>
                    <div>{{exchangeNoLimit.Crfilnum}} CRFI</div>
                  </div>
                </div>
              </div>
              <div class="tab-panel" v-else>
                <div class="three">
                  <div class="row">
                    <!-- <div>期号</div> -->
                    <div>{{$t('exDateNumber')}}</div>
                    <div>{{exchangeNoLimit.codeNo}}</div>
                  </div>
                  <div class="row">
                    <!-- <div>兑换比例</div> -->
                    <div>{{$t('exChangeRatio')}}</div>
                    <div>{{exchangeNoLimit.ratio}} CRFI ：1 cFIL</div>
                  </div>
                  <div class="row">
                    <!-- <div>总兑换池</div> -->
                    <div>{{$t('exTotalExchangePool')}}</div>
                    <div>{{exchangeNoLimit.totalCfil}} cFIL</div>
                  </div>
                  <div class="row">
                    <!-- <div>兑换池总兑换数量</div> -->
                    <div>{{$t('exTotalExchangeVolumeOfExchangePool')}}</div>
                    <div>{{exchangeLimit.totalCfil * exchangeLimit.ratio}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>当前总参与数量</div> -->
                    <div>{{$t('exCurrentTotalParticipation')}}</div>
                    <div>{{toFloor(exchangeNoLimit.totalDepoistCrfil,2)}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>兑换手续费</div> -->
                    <div>{{$t('exChangeFee')}}</div>
                    <div>{{exchangeNoLimit.fee}}% (CRFI)</div>
                  </div>
                </div>
                <hr />
                <div class="four">
                  <div class="row">
                    <div>{{$t('exSuccess')}}</div>
                    <div>{{toFloor(exchangeNoLimit.success, 8)}} cFIL/{{toFloor(exchangeNoLimit.success * exchangeNoLimit.ratio, 8)}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>总参与兑换</div> -->
                    <div>{{$t('exParticipationTotal')}}</div>
                    <div>{{toFloor(exchangeNoLimit.Crfilnum, 8)}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>兑换手续费</div> -->
                    <div>{{$t('exChangeFee')}}</div>
                    <div>{{toFloor(exchangeNoLimit.success * exchangeNoLimit.ratio * exchangeNoLimit.fee / 100, 8)}} CRFI</div>
                  </div>
                  <div class="row">
                    <!-- <div>剩余</div> -->
                    <div>{{$t('exBalance')}}</div>
                    <div>{{toFloor(exchangeNoLimit.surplus, 8)}} CRFI</div>
                  </div>
                </div>
                <!-- 提取 -->
                <div class="tab-btn" :class="noLimitWithdraw?'btn-disabled':''" :disabled="noLimitWithdraw" @click="btnClick(false, 'withdraw' )">{{$t('exExtract')}}</div>
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
      <div class="tabs2">
        <!-- 参与流程 -->
        <div class="process">
          <!-- 参与流程 -->
          <div class="title">{{ $t('exParticipationProcess') }}</div>
          <div class="process-content">
            <!-- 线组合 -->
            <div class="lineCombination">
              <div class="point point1"></div>
              <div class="point point2"></div>
              <div class="point point3"></div>
              <div class="point point4"></div>
            </div>
            <div>
              <div class="contents" style="height: 41px;">
                <div class="contents-title">{{$t('exPp1')}}</div>
                <div class="contents-child">
                  {{$t('exPpr1')}}
                </div>
              </div>
              <div class="contents" style="height: 55px;">
                <div class="contents-title">{{$t('exPp2')}}</div>
                <div class="contents-child"> {{$t('exPpr2')}}
                </div>
              </div>
              <div class="contents" style="height: 40px;">
                <!-- 查看 -->
                <div class="contents-title">{{$t('exPp3')}}</div>
                <div class="contents-child">
                  <!-- 等待活动结束，查看兑换结果。 -->{{$t('exPpr3')}}
                </div>
              </div>
              <div class="contents">
                <!-- 提取 -->
                <div class="contents-title">{{$t('exPp4')}}</div>
                <div class="contents-child">
                  <!-- 提取兑换后的资产。 -->{{$t('exPpr4')}}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="discription">
        <div @click="openUrl('https://docs.crossfimain.com/english/operating-instructions/binance-smart-chain/cso-crossfi-swap-opportunity')">{{$t('exAskTitle')}}</div>
        <div class="ask">{{$t('exAsk1')}}</div>
        <div class="answer">{{$t('exAnswer1')}}</div>
        <div class="ask">{{$t('exAsk2')}}</div>
        <div class="answer">{{$t('exAnswer2')}}</div>
        <div class="ask">{{$t('exAsk3')}}</div>
        <div class="answer">{{$t('exAnswer3')}}</div>
        <div class="ask">{{$t('exAsk4')}}</div>
        <div class="answer">{{$t('exAnswer4')}}</div>
        <!--<br /> {{$t('exHTP2')}}<br />{{$t('exHTP3')}}</div>-->
      </div>
    </div>
    <van-popup v-model="exchangeLimit.popupShow" closeable round :style="{ height: '8.7rem', width: '9.17rem', padding: '0.39rem', 'overflow-y': 'hidden' }">
      <!-- 限额兑换 -->
      <div class="popup-title">{{$t('exLimitExchange')}}</div>
      <div class="popup-content">
        <div class="row">
          <!-- 期号 -->
          <div>{{$t('exDateNumber')}}</div>
          <div>{{exchangeLimit.codeNo}}</div>
        </div>
        <div class="row">
          <!-- 兑换比例 -->
          <div>{{$t('exChangeRatio')}}</div>
          <div>{{exchangeLimit.ratio}} CRFI : 1 cFIL</div>
        </div>
        <div class="row">
          <!-- 兑换数量 -->
          <div><input v-model="limitAmount" :placeholder="$t('exNumberOfExchanges')" /></div>
          <div class="input-btn" @click="btnClick(true, 'max')">Max</div>
        </div>
        <div class="row">
          <!-- <div>CRFI余额</div> -->
          <div>{{$t('exCRFIBalance')}}</div>
          <div>{{toFloor(userCrfi,8)}}</div>
        </div>
        <div class="row">
          <!-- 确认 -->
          <div class="btn" @click="chainExchange(true)">{{$t('confirm')}}</div>
        </div>
      </div>
    </van-popup>
    <van-popup v-model="exchangeNoLimit.popupShow" closeable round :style="{ height: '9.48rem', width: '9.17rem', padding: '0.39rem', 'overflow-y': 'hidden' }">
      <!-- 无限兑换 -->
      <div class="popup-title">{{$t('exUnlimitedRedemption')}}</div>
      <div class="popup-content">
        <div class="row">
          <!-- <div>期号</div> -->
          <div>{{$t('exDateNumber')}}</div>
          <div>{{exchangeNoLimit.codeNo}}</div>
        </div>
        <div class="row">
          <!-- <div>兑换比例</div> -->
          <div>{{$t('exChangeRatio')}}</div>
          <div>{{exchangeNoLimit.ratio}} CRFI : 1 cFIL</div>
        </div>
        <div class="row">
          <!-- 兑换数量 -->
          <div><input v-model="noLimitAmount" :placeholder="$t('exNumberOfExchanges')" /></div>
          <div class="input-btn" @click="btnClick(false, 'max')">Max</div>
        </div>
        <div class="row">
          <div>Fee({{exchangeNoLimit.fee}}%）</div>
          <div>{{noLimitFee}} CRFI</div>
        </div>
        <div class="row">
          <!-- <div>CRFI余额</div> -->
          <div>{{$t('exCRFIBalance')}}</div>
          <div>{{toFloor(userCrfi,8)}}</div>
        </div>
        <div class="row">
          <!-- 确认 -->
          <div class="btn" @click="chainExchange(false)">{{$t('confirm')}}</div>
        </div>
      </div>
    </van-popup>
    <!--兑换提示-->
    <van-popup v-model="exchangeLimit.popupWithdrawShow" closeable round :style="{ height: '10.7rem', width: '9.17rem', padding: '0.39rem', 'overflow-y': 'hidden' }">
      <!-- 限额兑换 -->
      <div class="popup-title">{{$t('exWithdrawTip')}}</div>
      <div class="popup-content" style="padding-left: 0.7rem; padding-right: 0.7rem;">
        <div class="row">
          <!-- <div>成功兑换</div> -->
          <div>{{$t('exSuccess')}}</div>
          <div>{{toFloor(exchangeLimit.success, 8)}} cFIL/{{toFloor(exchangeLimit.success * exchangeLimit.ratio, 8)}} CRFI</div>
        </div>
        <div class="row">
          <!-- <div>总参与兑换</div> -->
          <div>{{$t('exParticipationTotal')}}</div>
          <div>{{toFloor(exchangeLimit.Crfilnum, 8)}} CRFI</div>
        </div>
        <div class="row">
          <!-- <div>剩余</div> -->
          <div>{{$t('exBalance')}}</div>
          <div>{{toFloor(exchangeLimit.surplus, 8)}} CRFI</div>
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
    <van-popup v-model="exchangeNoLimit.popupWithdrawShow" closeable round :style="{ height: '11.48rem', width: '9.17rem', padding: '0.39rem', 'overflow-y': 'hidden' }">
      <!-- 无限兑换 -->
      <div class="popup-title">{{$t('exWithdrawTip')}}</div>
      <div class="popup-content" style="padding-left: 0.7rem; padding-right: 0.7rem;">
        <div class="row">
          <div>{{$t('exSuccess')}}</div>
          <div>{{toFloor(exchangeNoLimit.success, 8)}} cFIL/{{toFloor(exchangeNoLimit.success * exchangeNoLimit.ratio, 8)}} CRFI</div>
        </div>
        <div class="row">
          <!-- <div>总参与兑换</div> -->
          <div>{{$t('exParticipationTotal')}}</div>
          <div>{{toFloor(exchangeNoLimit.Crfilnum, 8)}} CRFI</div>
        </div>
        <div class="row">
          <!-- <div>兑换手续费</div> -->
          <div>{{$t('exChangeFee')}}</div>
          <div>{{toFloor(exchangeNoLimit.success * exchangeNoLimit.ratio * exchangeNoLimit.fee / 100, 8)}} CRFI</div>
        </div>
        <div class="row">
          <!-- <div>剩余</div> -->
          <div>{{$t('exBalance')}}</div>
          <div>{{toFloor(exchangeNoLimit.surplus, 8)}} CRFI</div>
        </div>
        <div class="row" style="text-align: left;line-height: 0.6rem;">
          {{$t('exWithdrawRemark1')}} {{toFloor(exchangeNoLimit.success * exchangeNoLimit.ratio * exchangeNoLimit.fee / 100, 8)}} {{$t('exWithdrawRemark2')}}
        </div>
        <div class="row">
          <!-- 确认 -->
          <div class="btn" @click="chainWithdraw(false)">{{$t('confirm')}}</div>
        </div>
      </div>
    </van-popup>
    <!--<van-overlay :show="showLoading">
      <div class="wrapper">
        <van-loading size="24px" vertical>{{ $t('exLoading') }}</van-loading>
      </div>
    </van-overlay>-->
  </div>
</template>

<script>
  import BigNumber from 'bignumber.js'
  import { mapActions, mapMutations } from 'vuex'
  import { utils } from '@/config'
  import { Toast } from 'vant'
  import Web3 from 'web3'
  import detectEthereumProvider from '@metamask/detect-provider'

  export default {
    data() {
      return {
        currentRate: 0,
        active: 0,
        exchangeLimit: { // 限额兑换对象
          isExist: true,
          showData: false,
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
          success: 0,                 // 成功兑换的CFIL
          surplus: 0,                 // 剩余CRFI
          popupWithdrawShow: false,
          timeText: '',
        },
        exchangeNoLimit: { // 非限额兑换对象
          isExist: true,
          showData: false,
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
          timeText: '',
        },
        limitAmount: 0,
        noLimitAmount: 0,
        noLimitFee: 0,
        showExchange: false,
        allowance: 0,
        interv: 0,
        intervState: 0,
        timeStamp: new Date().getTime(),
        timeStampChain: false,
      }
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
      userAddress() {
        return this.$store.state.userAddress
      },
      showLoading() {
        return this.$store.state.showLoading
      },
      text() {
        return this.currentRate.toFixed(0) + '%'
      },
      limitWithdraw() {
        if (!isNaN(parseFloat(this.exchangeLimit.success)) && !isNaN(parseFloat(this.exchangeLimit.hadwithdraw))) {
          return parseFloat(this.exchangeLimit.hadwithdraw) === parseFloat(this.exchangeLimit.success)
        }
        return true
      },
      noLimitWithdraw() {
        if (!isNaN(parseFloat(this.exchangeNoLimit.success)) && !isNaN(parseFloat(this.exchangeNoLimit.hadwithdraw))) {
          return parseFloat(this.exchangeNoLimit.hadwithdraw) === parseFloat(this.exchangeNoLimit.success)
        }
        return true
      },
      userCrfi() {
        if (this.$store.state.wallet.walletCRFI) {
          return utils.fromWei(this.$store.state.wallet.walletCRFI.toString())
        }
        return 0
      },
    },
    watch: {
      limitAmount(newVal) {
        if (newVal > this.userCrfi) {
          return this.userCrfi
        }
        if (newVal > this.exchangeLimit.ratio * this.exchangeLimit.userLimit) {
          return this.exchangeLimit.ratio * this.exchangeLimit.userLimit
        }
        return newVal
      },
      noLimitAmount(newVal) {
        if (newVal > this.userCrfi) {
          this.noLimitFee = this.exchangeNoLimit.fee * this.userCrfi / 100
          return this.userCrfi
        }
        this.noLimitFee = this.exchangeNoLimit.fee * newVal / 100
        return newVal
      },
    },
    mounted() {
      this.interv = setInterval(this.initData, 2000)
      this.intervState = setInterval(this.handleState, 1000)
    },
    destroyed() {
      clearInterval(this.interv)
      clearInterval(this.intervState)
    },
    methods: {
      ...mapMutations(['setUserAddress']),
      ...mapActions(['init', 'exIsInit']),
      openUrl(url) {
        window.location.href = url
      },
      changeTab(data) {
        if (parseInt(data) === 0) {
          this.$store.commit('setExchangeEnd', this.exchangeLimit.endTime || 0)
          this.$store.commit('setExchangeStart', this.exchangeLimit.startTime || 0)
        } else {
          this.$store.commit('setExchangeEnd', this.exchangeNoLimit.endTime || 0)
          this.$store.commit('setExchangeStart', this.exchangeNoLimit.startTime || 0)
        }
      },
      initData: async function() {
        let self = this
        let isInit = await this.exIsInit()
        if (!isInit) return
        clearInterval(self.interv)
        console.log('chainId:', self.$store.state.chainId)
        // 查询限额合约
        self.$api.getCurrent(self.userAddress, 1, self.$store.state.chainId).then(res => {
          // if (res.data.times > 100) self.timeStamp = res.data.times - 2
          self.exchangeLimit = Object.assign(self.exchangeLimit, res.data)
          if (self.active === 0) {
            self.$store.commit('setExchangeEnd', self.exchangeLimit.endTime || 0)
          }
          self.$store.commit('setExchangeLimit', self.exchangeLimit.codeNo)
          // TODO 限额兑换：根据期号获取当前人的链上信息，并赋值self.exchangeNoLimit的当前参与总数量、用户输入CRFI，是否已兑换、用户提取数量，
          // 查询参与总量
          self.$store.dispatch('exGetIssueInfoMap', { limit: true, codeNo: self.exchangeLimit.codeNo }).then(res => {
            // console.log('11', res)
            if (res) self.exchangeLimit.totalDepoistCrfil = utils.fromWei(res.totalDepoistCrfil.toString())
            if (res) self.exchangeLimit.startTime = parseInt(res.starttime) * 1000
            if (res) self.exchangeLimit.endTime = parseInt(res.endtime) * 1000
          })
          // 查询用户兑换信息
          self.$store.dispatch('exGetUserInfo', { limit: true, codeNo: self.exchangeLimit.codeNo }).then(res => {
            //console.log('12', res)
            if (res) self.exchangeLimit.Crfilnum = utils.fromWei(res.Crfilnum.toString())
            if (res) self.exchangeLimit.isentry = res.isentry
            if (res) self.exchangeLimit.hadwithdraw = utils.fromWei(res.hadwithdraw.toString())
          })
          // 查询用户兑换信息
          self.$store.dispatch('exGetuserSwapCfil', { limit: true, codeNo: self.exchangeLimit.codeNo }).then(res => {
            //console.log('13', res)
            if (res) self.exchangeLimit.surplus = utils.fromWei(res.crfllite.toString())
            if (res) self.exchangeLimit.success = utils.fromWei(res.cfils.toString())
          })
          self.exchangeLimit.showData = true
        })
        // 查询非限额合约
        self.$api.getCurrent(self.userAddress, 0, self.$store.state.chainId).then(res => {
          if (self.active === 1) {
            self.$store.commit('setExchangeEnd', self.exchangeNoLimit.endTime || 0)
          }
          // if (res.data.times > 100) self.timeStamp = res.data.times - 2
          self.exchangeNoLimit = Object.assign(self.exchangeNoLimit, res.data)
          self.$store.commit('setExchangeNoLimit', self.exchangeNoLimit.codeNo)
          // TODO 非限额兑换：根据期号获取当前人的链上信息，并赋值self.exchangeNoLimit的当前参与总数量、用户输入CRFI，剩余CRFI，是否已兑换、用户提取数量，
          // 查询参与总量
          self.$store.dispatch('exGetIssueInfoMap', { limit: false, codeNo: self.exchangeNoLimit.codeNo }).then(res => {
            console.log('21', res)
            if (res) self.exchangeNoLimit.totalDepoistCrfil = utils.fromWei(res.totalDepoistCrfil.toString())
            if (res) self.exchangeNoLimit.startTime = parseInt(res.starttime) * 1000
            if (res) self.exchangeNoLimit.endTime = parseInt(res.endtime) * 1000
          })
          // 查询用户兑换信息
          self.$store.dispatch('exGetUserInfo', { limit: false, codeNo: self.exchangeNoLimit.codeNo }).then(res => {
            //console.log('22', res)
            if (res) self.exchangeNoLimit.Crfilnum = utils.fromWei(res.Crfilnum.toString())
            if (res) self.exchangeNoLimit.isentry = res.isentry
            if (res) self.exchangeNoLimit.hadwithdraw = utils.fromWei(res.hadwithdraw.toString())
          })
          // 查询用户兑换信息
          self.$store.dispatch('exGetuserSwapCfil', { limit: false, codeNo: self.exchangeNoLimit.codeNo }).then(res => {
            // console.log('23', res)
            if (res) self.exchangeNoLimit.surplus = utils.fromWei(res.crfllite.toString())
            if (res) self.exchangeNoLimit.success = utils.fromWei(res.nsend.toString())
          })
          self.exchangeNoLimit.showData = true
        })
        // 查询授权状态
        self.$store.dispatch('exGetApprove').then(res => {
          if (res) self.allowance = parseInt(res)
        })
      },
      async handleState() {
        let self = this
        if (!self.timeStampChain) {
          detectEthereumProvider().then(async res => {
            let web3
            if (typeof window.ethereum != 'undefined') {
              web3 = new Web3(res)
            } else {
              web3 = new Web3()
            }
            let block = await web3.eth.getBlock('latest')
            self.timeStamp = block.timestamp * 1000
            self.timeStampChain = true
            console.log(self.timeStamp)
          })
        }
        self.timeStamp += 1000
        // console.log(self.timeStamp)
        if (self.exchangeLimit.startTime > self.timeStamp) {
          let time = self.exchangeLimit.startTime - self.timeStamp + 20
          let h = parseInt(time / 1000 / 3600)
          self.exchangeLimit.timeText = self.$t('exTimesTxt') + (h === 0 ? '00' : h) + ''
          let m = parseInt((time / 1000 % 3600) / 60)
          self.exchangeLimit.timeText += ':' + (m === 0 ? '00' : m)
          let s = parseInt((time / 1000 % 3600) % 60)
          self.exchangeLimit.timeText += ':' + (s === 0 ? '00' : s)
          self.exchangeLimit.stateMark = 0
          self.$forceUpdate()
        } else if (self.exchangeLimit.endTime > self.timeStamp) {
          self.exchangeLimit.stateMark = 1
        } else {
          self.exchangeLimit.stateMark = 2
        }
        if (self.exchangeNoLimit.startTime > self.timeStamp) {
          let time = self.exchangeNoLimit.startTime - self.timeStamp + 20
          let h = parseInt(time / 1000 / 3600)
          self.exchangeNoLimit.timeText = self.$t('exTimesTxt') + (h === 0 ? '00' : h) + ''
          let m = parseInt((time / 1000 % 3600) / 60)
          self.exchangeNoLimit.timeText += ':' + (m === 0 ? '00' : m)
          let s = parseInt((time / 1000 % 3600) % 60)
          self.exchangeNoLimit.timeText += ':' + (s === 0 ? '00' : s)
          self.exchangeNoLimit.stateMark = 0
          self.$forceUpdate()
        } else if (self.exchangeNoLimit.endTime > self.timeStamp) {
          self.exchangeNoLimit.stateMark = 1
        } else {
          self.exchangeNoLimit.stateMark = 2
        }
      },
      // 按钮点击
      btnClick(isLimit, type) {
        console.log(isLimit, !this.exchangeLimit.isentry, !this.limitWithdraw, type === 'withdraw')
        if (isLimit && !this.exchangeLimit.isentry && !this.showLoading && type === 'exchange') {
          this.exchangeLimit.popupShow = true
        }
        if (isLimit && this.exchangeLimit.isentry && !this.limitWithdraw && type === 'withdraw') {
          this.exchangeLimit.popupWithdrawShow = true
        }
        if (isLimit && !this.exchangeLimit.isentry && type === 'max') {
          if (this.userCrfi > this.exchangeLimit.ratio * this.exchangeLimit.userLimit) {
            this.limitAmount = this.exchangeLimit.ratio * this.exchangeLimit.userLimit
          } else {
            this.limitAmount = this.userCrfi
          }
        }
        if (!isLimit && !this.exchangeNoLimit.isentry && !this.showLoading && type === 'exchange') {
          this.exchangeNoLimit.popupShow = true
        }
        if (!isLimit && this.exchangeNoLimit.isentry && !this.noLimitWithdraw && type === 'withdraw') {
          this.exchangeNoLimit.popupWithdrawShow = true
        }
        if (!isLimit && !this.exchangeNoLimit.isentry && type === 'max') {
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
      // 链上参与兑换
      chainExchange(isLimit) {
        let self = this
        // TODO 链上参与兑换方法：swapCfil(uint256 qinumber, uint256 amount)
        let codeNo = self.exchangeNoLimit.codeNo
        let amount = self.noLimitAmount
        if (isLimit) {
          codeNo = self.exchangeLimit.codeNo
          amount = self.limitAmount
          self.exchangeLimit.popupShow = false
          if (amount > self.exchangeLimit.ratio * self.exchangeLimit.userLimit) {
            Toast(self.$t('exOverLimit'))
            return
          }
        } else {
          self.exchangeNoLimit.popupShow = false
        }
        if (amount > self.userCrfi) {
          Toast(self.$t('exInsufficientBalance'))
          return
        }
        self.$store.dispatch('exSwapCfil', { limit: isLimit, codeNo: codeNo, amount: amount }).then(() => {
          self.initData()
          self.$api.logSuccess(self.userAddress, (isLimit ? '限额' : '非限额') + '兑换参与', '兑换期号：' + codeNo + '，参与数量：' + amount)
        }).catch(err => {
          if (isLimit) {
            self.exchangeLimit.popupShow = true
          } else {
            self.exchangeNoLimit.popupShow = true
          }
          self.$api.logError(self.userAddress, (isLimit ? '限额' : '非限额') + '兑换参与', '兑换期号：' + codeNo + '，参与数量：' + amount, err)
        })
      },
      // 链上提取
      chainWithdraw(isLimit) {
        let self = this
        // TODO 链上提取方法：withdraw(uint256 qinumber)
        let codeNo = self.exchangeNoLimit.codeNo
        if (isLimit) {
          codeNo = self.exchangeLimit.codeNo
          self.exchangeLimit.popupWithdrawShow = false
        } else {
          self.exchangeNoLimit.popupWithdrawShow = false
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
  @import '~@/assets/scss/exchange.scss'

</style>
