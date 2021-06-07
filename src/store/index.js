import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import i18n from '@/i18n/i18n'
import Contract from '@/plugin/eth'
import BigNumber from 'bignumber.js'
var ethUtil = require('ethereumjs-util')
var sigUtil = require('eth-sig-util')

import {
  CROSSLEND_ADDRESS,
  CRFI_ADDRESS,
  CFIL_ADDRESS,
  SFIL_ADDRESS,
} from '@/config'
import { Toast } from 'vant'

import { crossLendAbi } from '@/plugin/crossLend.js'
import { CRFIAbi } from '@/plugin/CRFI.js'
import { CFilAbi } from '@/plugin/CFil.js'
import { SFilAbi } from '@/plugin/SFil.js'

Vue.use(Vuex)

const crossLend = new Contract({
  address: CROSSLEND_ADDRESS,
  abi: crossLendAbi,
})

const utils = crossLend.web3.utils

const CRFIContract = new Contract({
  address: CRFI_ADDRESS,
  abi: CRFIAbi,
})

const CFilContract = new Contract({
  address: CFIL_ADDRESS,
  abi: CFilAbi,
})

const SFilContract = new Contract({
  address: SFIL_ADDRESS,
  abi: SFilAbi,
})

export default new Vuex.Store({
  state: {
    showLoading: false,
    isHome: false,
    userAddress: '',
    FilAddr: '',
    systemInfo: {
      affRate: '0',
      nowInvestCRFI: '',
      cfilLendingTotal: '0',
      crfiInterestPool: '',
      cfilInterestPool: '0',
    },
    balance: {
      CRFI: '0',
      cfil: '0',
      cfilInterest: '0',
      crfiInterest: '0',
      watlletCRFI: '0',
      watlletcfil: '0',
    },
    userInfo: {
      id: '0',
      admin: false,
      crfi: '0',
      cfil: '0',
      cfilInterest: '0',
      crfiInterest: '0',
    },
    cfilPrice: '',
    crfiPrice: '',
    userList: [],
    userDemandList: [],
    demandFD: [],
    demandEFil: [],
    crfiList: [],
    eFilList: [],

    CRFIList: [],
    CFilList: [],
    wallet: {
      watlletCRFI: 0,
      watlletCFil: 0,
      watlletSFil: 0,
    },
    applyList: [],
    loanCFil: {
      APY: '0',
      PaymentDue: '0',
      PledgeRate: '0',
    },
    rewardsList: [],
    loanInvest: {
      Lending: '0',
      Pledge: '0',
      CFil: '0',
    },
  },
  getters: {
    pledgeRate: state => {
      let { Lending, Pledge } = state.loanInvest

      let rate = new BigNumber(Lending).div(new BigNumber(Pledge))

      if (Pledge == 0) {
        return 0
      }
      return rate
    },
    cfilWithdrawable: state => {
      let number = 0
      let now = parseInt(new Date().getTime() / 1000)
      state.userList.forEach(e => {
        let { Amount, Type, EndTime, EFilInterestRate, FDInterestRate } = e
        if (now > EndTime) {
          if (Type == 1) {
            let value =
              parseFloat(utils.fromWei(Amount.toString())) *
              (1 + parseFloat(utils.fromWei(EFilInterestRate.toString())))
            number += value
          } else {
            let value =
              parseFloat(utils.fromWei(Amount.toString())) *
              parseFloat(utils.fromWei(FDInterestRate.toString()))
            number += value
          }
        }
      })
      return parseFloat(number).toFixed(2)
    },
    crfiWithdrawable: state => {
      let number = 0
      let now = parseInt(new Date().getTime() / 1000)
      state.userList.forEach(e => {
        let { Amount, Type, EndTime, EFilInterestRate, FDInterestRate } = e
        if (now > EndTime) {
          if (Type == 0) {
            let value =
              parseFloat(utils.fromWei(Amount.toString())) *
              (1 + parseFloat(utils.fromWei(FDInterestRate.toString())))
            number += value
          } else {
            let value =
              parseFloat(utils.fromWei(Amount.toString())) *
              parseFloat(utils.fromWei(EFilInterestRate.toString()))
            number += value
          }
        }
      })
      return parseFloat(number).toFixed(2)
    },
    cfilTotal: state => {
      let number = 0

      state.userList.forEach(e => {
        let { Amount, Type, EFilInterestRate, FDInterestRate } = e
        if (Type == 1) {
          let value =
            parseFloat(utils.fromWei(Amount.toString())) *
            (1 + parseFloat(utils.fromWei(EFilInterestRate.toString())))
          number += value
        } else {
          let value =
            parseFloat(utils.fromWei(Amount.toString())) *
            parseFloat(utils.fromWei(FDInterestRate.toString()))
          number += value
        }
      })
      return parseFloat(number).toFixed(2)
    },
    crfiTotal: state => {
      let number = 0
      state.userList.forEach(e => {
        let { Amount, Type, EFilInterestRate, FDInterestRate } = e
        if (Type == 0) {
          let value =
            parseFloat(utils.fromWei(Amount.toString())) *
            (1 + parseFloat(utils.fromWei(FDInterestRate.toString())))
          number += value
        } else {
          let value =
            parseFloat(utils.fromWei(Amount.toString())) *
            parseFloat(utils.fromWei(EFilInterestRate.toString()))
          number += value
        }
      })
      return parseFloat(number).toFixed(2)
    },
  },
  mutations: {
    setHome(state, value) {
      state.isHome = value
    },
    setLoading(state, value) {
      state.showLoading = value
    },
    setSystemInfo(state, data) {
      state.systemInfo = data
    },
    setUserAddress(state, value) {
      state.userAddress = value
    },
    setFileAddr(state, value) {
      state.FilAddr = value
    },
    setCorsslend(state, data) {},
    setUserInfo(state, data) {
      state.userInfo = data
    },
    setBalance(state, data) {
      state.balance = data
    },
    setFdList(state, data) {
      state.crfiList = data
    },
    setEFilList(state, data) {
      state.eFilList = data
    },
    setDemandFD(state, data) {
      state.demandFD = [data]
    },
    setDemandEFil(state, data) {
      state.demandEFil = [data]
    },
    setUserDemandList(state, data) {
      state.userDemandList = data
    },

    // 新增
    setCRFIList(state, data) {
      state.CRFIList = data
    },
    setCFilList(state, data) {
      state.CFilList = data
    },
    setWallet(state, data) {
      state.wallet = data
    },
    setCRFITotalAmount(state, data) {
      let { PackageID, Amount } = data
      let item = state.CRFIList.find(n => PackageID == n.ID)
      item['Amount'] = new BigNumber(item.Amount)
        .plus(new BigNumber(Amount))
        .toString()
    },
    setCFilTotalAmount(state, data) {
      let { PackageID, Amount } = data
      console.log('data', data, PackageID, state.CFilList)
      console.log('dlfkdfldj;')
      let item = state.CFilList.find(n => PackageID == n.ID)
      console.log('amount', Amount, item, state.CFilList)
      item['Amount'] = new BigNumber(item.Amount)
        .plus(new BigNumber(Amount))
        .toString()
    },
    setCRFIDemandTotalAmount(state, data) {
      let { PackageID, Amount } = data
      let item = state.CRFIList.find(n => PackageID == n.ID)
      item['Amount'] = new BigNumber(item.Amount)
        .plus(new BigNumber(Amount))
        .toString()
    },
    setCFilDemandTotalAmount(state, data) {
      let { PackageID, Amount } = data
      let item = state.CFilList.find(n => PackageID == n.ID)
      console.log('paacdkf', PackageID)
      item['Amount'] = new BigNumber(item.Amount)
        .plus(new BigNumber(Amount))
        .toString()
    },
    setUserList(state, data) {
      state.userList = data
    },
    setApplyList(state, data) {
      state.applyList = data
    },
    setLoanCFil(state, data) {
      state.loanCFil = data
    },
    setRewardsList(state, data) {
      state.rewardsList.unshift(data)
    },
    setLoanInvest(state, data) {
      state.loanInvest = data
    },
    setMap(state, data) {
      state.crfiPrice = data.crfiPrice
      state.cfilPrice = data.cfilPrice
    },
  },
  actions: {
    // 获取key - value
    async getKeyValue({ state }, key) {
      let res = await crossLend.callContract('GetMap', [key])
      return res
    },
    async calcCFilToSFil({ state }) {
      let address = state.userAddress
      let walletCFil = await CFilContract.callContract('balanceOf', [address])
      let { CFil, Lending } = state.loanInvest
      let total = new BigNumber(CFil).plus(new BigNumber(Lending))
      if (new BigNumber(walletCFil).comparedTo(total) == 1) {
        return utils.fromWei(total.toString())
      } else {
        return utils.fromWei(walletCFil)
      }
    },
    async calcSFilToCFil({ state }) {
      let address = state.userAddress
      let walletSFil = await SFilContract.callContract('balanceOf', [address])
      let res = await crossLend.callContract('calcSFilToCFil', [walletSFil])
      return utils.fromWei(res)
    },
    async changeLoanRate({ state, commit, dispatch }, data) {
      console.log(data)
      let userAddress = state.userAddress
      let { APY, PledgeRate, PaymentDue } = data
      APY = (utils.toWei(APY.toString()) / 100).toString()
      PledgeRate = (utils.toWei(PledgeRate.toString()) / 100).toString()
      PaymentDue = utils.toWei(PaymentDue.toString())
      console.log(APY, PledgeRate, PaymentDue)
      await crossLend.executeContract(
        'ChangeLoanRate',
        [APY, PledgeRate, PaymentDue],
        userAddress,
      )
      this.dispatch('init')
    },
    // 获取推荐列表
    async getRewardList({ state, commit }) {
      let address = state.userAddress
      console.log('address', address)
      crossLend.contract
        .getPastEvents(
          'AffEvent',
          {
            filter: {
              receiver: [address],
            }, // Using an array means OR: e.g. 20 or 23
            fromBlock: 0,
            toBlock: 'latest',
          },
          function(error, events) {
            console.log('watch123', events)
          },
        )
        .then(function(events) {
          console.log('watch', events)
          // same results as the optional callback above
          events.forEach(e => {
            let { returnValues } = e
            commit('setRewardsList', returnValues)
          })
        })
    },
    // 初始化
    async init({ state, commit, dispatch }) {
      let address = state.userAddress

      let cfilPrice = await crossLend.callContract('GetMap', ['cfilPrice'])
      let crfiPrice = await crossLend.callContract('GetMap', ['crfiPrice'])

      commit('setMap', {
        cfilPrice: cfilPrice || 1,
        crfiPrice: crfiPrice || 1,
      })
      let systemInfo = await crossLend.callContract('GetSystemInfo', [])
      // let { affRate, cfilInterestPool, crfiInterestPool } = systemInfo
      console.log('setSystemInfo', systemInfo)
      commit('setSystemInfo', systemInfo)
      // packages
      let data = await crossLend.callContract('GetPackages', [])
      // console.log('package', data)
      let { financialPackages, demandCFil, demandCRFI, loanCFil } = data
      console.log('fina', data)
      commit('setLoanCFil', loanCFil)
      let CRFIList = []
      let CFilList = []
      financialPackages.forEach(e => {
        let { Type } = e
        if (Type === '0') {
          CRFIList.push({
            ...e,
            Amount: '0',
          })
        } else {
          CFilList.push({
            ...e,
            Amount: '0',
          })
        }
      })
      CFilList.unshift({
        Days: '0',
        Amount: '0',
        ...demandCFil,
      })
      CRFIList.unshift({
        Days: '0',
        Amount: '0',
        ...demandCRFI,
      })
      commit('setCRFIList', CRFIList)
      commit('setCFilList', CFilList)
      dispatch('getUserWallet')
      dispatch('getInvestList', {
        demandCFil,
        demandCRFI,
      })
      let fileCoin = localStorage.getItem(state.userAddress)
      commit('setFileAddr', fileCoin)
    },
    async applyStaking({ state, commit }, data) {
      let address = state.userAddress
      let res = await SFilContract.executeContract(
        'ApplyStaking',
        [data],
        address,
      )
    },
    // 拒绝
    async deleteStaking({ state, dispatch }, data) {
      let userAddress = state.userAddress
      let { SID } = data
      await SFilContract.executeContract(
        'DeleteStakingByAdmin',
        [SID],
        userAddress,
      )
      dispatch('getApplyStaking')
    },
    // 通过
    async issusStaking({ state, commit, dispatch }, data) {
      let { SID, value } = data

      let userAddress = state.userAddress
      await SFilContract.executeContract(
        'IssueStaking',
        [SID, utils.toWei(value)],
        userAddress,
      )
      dispatch('getApplyStaking')
    },
    // 获取 apply 事件
    async getApplyStaking({ state, commit }) {
      let res = await SFilContract.callContract('GetNowStakingApply', [])
      console.log('res', res)
      let arr = []
      res.forEach(e => {
        let { Info, Addr, SID, validIdx } = e
        console.log(Info)
        if (Info) {
          Info = JSON.parse(Info)
        }
        arr.push({
          SID,
          Info,
          Addr,
          validIdx,
        })
      })
      commit('setApplyList', arr)
    },
    // 获取用户投资列表
    async getInvestList({ state, commit }, data) {
      let address = state.userAddress
      let userList = []
      let list = await crossLend.callContract('GetInvestRecords', [address])
      console.log('records', list)
      let { records, demandCFil, demandCRFI, loanInvest, interestDetail } = list
      let { Lending, Pledge } = loanInvest
      // console.log('GetInvestRecords', list)

      let arr = JSON.parse(JSON.stringify(interestDetail))
      // console.log('arrlenght', arr.length, arr)
      let loanInterest = arr.pop()
      let demandCFilInterest = arr.pop()
      let demandCRFIInterest = arr.pop()
      let recordsInterest = arr
      // console.log('dfdf', interestDetail, loanInterest)
      if (interestDetail.length > 0) {
        commit('setLoanInvest', {
          Lending,
          Pledge,
          CFil: loanInterest[1],
        })
      }

      if (demandCFil.Amount != 0) {
        let CRFIInterestRate =
          data.demandCFil.NewCRFIInterestRate == 0
            ? data.demandCFil.CRFIInterestRate
            : data.demandCFil.NewCRFIInterestRate
        let CFilInterestRate =
          data.demandCFil.NewCFilInterestRate == 0
            ? data.demandCFil.CFilInterestRate
            : data.demandCFil.NewCFilInterestRate
        userList.unshift({
          ...demandCFil,
          CRFIInterestRate,
          CFilInterestRate,
          CFilInterest: demandCFilInterest[0],
          CRFIInterest: demandCFilInterest[1],
          Type: 1,

          Days: '0',
        })
        commit('setCFilDemandTotalAmount', demandCFil)
      }
      if (demandCRFI.Amount != 0) {
        let CRFIInterestRate =
          data.demandCFil.NewCRFIInterestRate == 0
            ? data.demandCFil.CRFIInterestRate
            : data.demandCFil.NewCRFIInterestRate
        let CFilInterestRate =
          data.demandCFil.NewCFilInterestRate == 0
            ? data.demandCFil.CFilInterestRate
            : data.demandCFil.NewCFilInterestRate
        userList.unshift({
          ...demandCRFI,
          CRFIInterestRate,
          CFilInterestRate,
          CFilInterest: demandCRFIInterest[0],
          CRFIInterest: demandCRFIInterest[1],
          Type: 0,
          Days: '0',
        })
        commit('setCRFIDemandTotalAmount', demandCRFI)
      }
      records.forEach((e, index) => {
        let { Type, PackageID } = e

        console.log('e', PackageID)
        if (Type == 0) {
          commit('setCRFITotalAmount', e)
        } else {
          commit('setCFilTotalAmount', e)
        }
        userList.push({
          ...e,
          CRFIInterest: recordsInterest[index][0],
          CFilInterest: recordsInterest[index][1],
        })
      })
      commit('setUserList', userList)
    },
    // 获取用户余额
    async getUserWallet({ state, commit }) {
      let address = state.userAddress
      let walletCFil = await CFilContract.callContract('balanceOf', [address])
      let walletCRFI = await CRFIContract.callContract('balanceOf', [address])
      let walletSFil = await SFilContract.callContract('balanceOf', [address])
      commit('setWallet', {
        walletCFil,
        walletCRFI,
        walletSFil,
      })
      let res = await crossLend.callContract('GetInvestInfo', [0, address])
      commit('setUserInfo', res)
    },
    // 获取 SFil 总量
    async getTotalSupply({ state, commit }) {
      let res = await SFilContract.callContract('totalSupply', [])
      // console.log('res', res)
      return res
    },
    // 签名 登录
    async login({ state, commit }) {
      return new Promise((resolve, reject) => {
        let timestamp = parseInt(new Date().getTime() / 1000)
        web3.currentProvider.sendAsync(
          {
            method: 'net_version',
            params: [],
            jsonrpc: '2.0',
          },
          function(err, result) {
            const netId = result.result
            const msgParams = JSON.stringify({
              types: {
                Challenge: [
                  { name: 'address', type: 'address' },
                  { name: 'timestamp', type: 'uint256' },
                ],
                EIP712Domain: [
                  { name: 'name', type: 'string' },
                  { name: 'chainId', type: 'uint256' },
                  { name: 'version', type: 'string' },
                  { name: 'salt', type: 'string' },
                ],
              },
              primaryType: 'Challenge',
              domain: {
                name: 'CrossFI_ETHChallenger',
                version: '1.0',
                chainId: 654321,
                salt: 'asasdfiuosicvuxzoiv',
              },
              message: {
                address: state.userAddress,
                timestamp,
              },
            })

            let from = state.userAddress

            var params = [from, msgParams]
            var method = 'eth_signTypedData_v3'

            web3.currentProvider.sendAsync(
              {
                method,
                params,
                from,
              },
              function(err, result) {
                if (err) return console.dir(err)
                if (result.error) {
                  alert(result.error.message)
                }
                if (result.error) return console.error('ERROR', result)
                // console.log('TYPED SIGNED:' + JSON.stringify(result.result))
                // console.log('TYPED SIGNED:' + result.result.substring(2))
                const signature = result.result.substring(2)

                // sendToServerForVerification(signature)
                axios
                  .get('https://clserver.mm.comeonbtc.com:8443/get_addr', {
                    // .get('http://10.30.0.1:9980/get_addr', {
                    params: {
                      eth_addr: state.userAddress,
                      signed: signature,
                      timestamp: timestamp,
                    },
                  })
                  .then(function(response) {
                    let {
                      data: {
                        result: { FilAddr },
                      },
                    } = response
                    commit('setFileAddr', FilAddr)
                    localStorage.setItem(state.userAddress, FilAddr)
                    resolve()
                  })
                  .catch(function(error) {
                    console.log(error)
                  })
                const recovered = sigUtil.recoverTypedSignature({
                  data: JSON.parse(msgParams),
                  sig: result.result,
                })
                // console.log(
                //   'recovered',
                //   recovered,
                //   ethUtil.toChecksumAddress(recovered),
                //   ethUtil.toChecksumAddress(from),
                // )
                if (
                  ethUtil.toChecksumAddress(recovered) ===
                  ethUtil.toChecksumAddress(from)
                ) {
                  // alert('Successfully ecRecovered signer as ' + from)
                } else {
                  alert(
                    'Failed to verify signer when comparing ' +
                      result +
                      ' to ' +
                      from,
                  )
                }
              },
            )
          },
        )
      })
    },
    // 计算 CRFI
    // total
    async ComputedCRFI({ state, commit, dispatch }, value) {
      if (value == '') {
        return 0
      }
      // 获取汇率
      value = new BigNumber(utils.toWei(value.toString() || 0))
      let res = await eFileContract.callContract('burnEFilRateCRFI', [])
      let crfiValue = value.times(new BigNumber(res)).div(new BigNumber(1e18))
      return crfiValue.toString()
    },
    async RepurchaseMax({ state }) {
      let tmp = state.wallet.walletCFil
      let tmpCRFI = state.wallet.walletCRFI
      // 根据现有CFil 计算要销毁的 CRFI
      let res = await CFilContract.callContract('_calcNeedBurnCRFI', [tmp])
      console.log('need', res)
      if (new BigNumber(tmpCRFI).comparedTo(new BigNumber(res)) == -1) {
        console.log('小于')
        let value = state.wallet.walletCRFI
        let res = await CFilContract.callContract('_calcBurnCFil', [value])
        return utils.fromWei(res)
      } else {
        console.log('大于')
        return utils.fromWei(tmp)
      }
      // 在判断 CRFI 是否足够
    },
    // 回购
    async Repurchase({ state, commit, dispatch }, data) {
      let { value, fileCoin = '' } = data
      if (value == '') {
        Toast(i18n.t('eFilPlaceholder'))
        return
      }
      if (value < 10) {
        Toast(i18n.t('minNumberToast'))
        return
      }

      let balanceCFil = new BigNumber(state.wallet.walletCFil)
      let balanceCRFI = new BigNumber(state.balance.watlletCRFI)
      value = new BigNumber(utils.toWei(value.toString() || 0))
      // 获取汇率
      // TODO: 比例为0时直接调用CFil burn方法
      let res = await CFilContract.callContract('burnCFilRateCRFI', [])
      let betys1 = utils.utf8ToHex(fileCoin)
      // let betys = CRFIContract.web3.eth.abi.encodeParameters(
      //   ['string'],
      //   [fileCoin],
      // )
      if (res == 0) {
        console.log('直接烧')
        await CRFIContract.executeContract(
          'burn',
          [value, betys1],
          state.userAddress,
        )
        dispatch('init')
        return
      }
      let rate = utils.fromWei(res)
      let crfiValue = value.times(new BigNumber(res)).div(new BigNumber(1e18))
      // if (balanceCRFI.comparedTo(crfiValue) == -1) {
      //   Toast(i18n.t('balanceToast'))
      //   return
      // }
      // let crfiValue = value.times(new BigNumber(utils.fromWei(res)))
      if (balanceCFil.comparedTo(value) == -1) {
        Toast(i18n.t('balanceToast'))
        return
      }
      if (fileCoin == '') {
        Toast(i18n.t('toastFileCoin'))
        return
      }

      // 调用crfi send
      try {
        await CRFIContract.executeContract(
          'send',
          [CFIL_ADDRESS, crfiValue.toString(), betys1],
          state.userAddress,
        )
        dispatch('init')
      } catch (e) {
        Toast('code: ' + e.code + 'messag: ' + e.message)
      }
    },
    async ChangeAffRate({ state, commit, dispatch }, data) {
      let { value } = data
      value = utils.toWei(value.toString()) / 100
      try {
        await crossLend.executeContract(
          'ChangeAffRate',
          [value.toString()],
          state.userAddress,
        )
      } catch (e) {}
    },
    // 修改利率
    async ChangePackageRate({ state, commit, dispatch }, data) {
      let { ID, crfi, cfil } = data
      crfi = utils.toWei(crfi.toString()) / 100
      cfil = utils.toWei(cfil.toString()) / 100
      try {
        await crossLend.executeContract(
          'ChangePackageRate',
          [ID, crfi.toString(), cfil.toString()],
          state.userAddress,
        )
        dispatch('init')
      } catch (e) {}
    },
    // 修改活期利率
    //
    async ChangeDemandRate({ state, commit, dispatch }, data) {
      let { ID, crfi, cfil } = data
      crfi = utils.toWei(crfi.toString()) / 100
      cfil = utils.toWei(cfil.toString()) / 100
      try {
        await crossLend.executeContract(
          'ChangeDemandRate',
          [ID, crfi.toString(), cfil.toString()],
          state.userAddress,
        )
        dispatch('init')
      } catch (e) {
        console.log(e)
      }
    },

    async WithdrawDemand({ state, commit, dispatch }, type) {
      console.log('type', type)
      try {
        await crossLend.executeContract(
          'WithdrawDemand',
          [type],
          state.userAddress,
        )
        dispatch('init')
      } catch (e) {}
    },
    async Withdraw({ state, dispatch }) {
      await crossLend.executeContract('Withdraw', [], state.userAddress)
      dispatch('init')
      try {
      } catch (e) {}
    },
    // 管理员充值
    async charge({ state, commit, dispatch }, data) {
      let { value } = data
      let betys = CRFIContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [2, 0, '0x97b19d507f9acce9ae4c1d3af4c5393d11698b87'],
      )
      value = utils.toWei(value)
      try {
        await CFilContract.executeContract(
          'send',
          [CROSSLEND_ADDRESS, value, betys],
          state.userAddress,
        )
        dispatch('init')
      } catch (e) {}
    },
    async chargeCRFI({ state, commit, dispatch }, data) {
      let { value } = data
      let betys = CRFIContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [3, 0, '0x97b19d507f9acce9ae4c1d3af4c5393d11698b87'],
      )
      value = utils.toWei(value)
      try {
        await CRFIContract.executeContract(
          'send',
          [CROSSLEND_ADDRESS, value, betys],
          state.userAddress,
        )
        dispatch('init')
      } catch (e) {}
    },
    // 购买
    async buyCoin({ state, commit, dispatch }, data) {
      let { ID, Type, value, inviteValue } = data
      // 判断余额
      let { walletCFil, walletCRFI } = state.wallet
      value = utils.toWei(value)
      console.log(state.wallet, walletCFil, walletCRFI, value)
      let balance = Type == 0 ? walletCRFI : walletCFil

      if (new BigNumber(balance).comparedTo(new BigNumber(value)) == -1) {
        Toast(i18n.t('balanceToast'))
        return
      }
      // 判断是否为正确的地址格式
      let isAddress = CRFIContract.web3.utils.isAddress(inviteValue)
      let invite = isAddress
        ? inviteValue
        : '0x0000000000000000000000000000000000000000'
      let betys = CRFIContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [0, ID, invite],
      )
      let contract = Type == 0 ? CRFIContract : CFilContract

      try {
        await contract.executeContract(
          'send',
          [CROSSLEND_ADDRESS, value, betys],
          state.userAddress,
        )
        dispatch('init')
      } catch (e) {}
    },
    // stake
    async stake({ state, commit, dispatch }, data) {
      let { mode = 4, value } = data
      let betys = CRFIContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [mode, 0, '0x0000000000000000000000000000000000000000'],
      )
      let SFil = ''
      if (mode == 4) {
        let paymentDue = utils.fromWei(state.loanCFil.PaymentDue)
        if (parseFloat(value) < parseFloat(paymentDue)) {
          // console.log('xiaoyu')
          Toast(i18n.t('toastPaymentDue'))
          return
        }
        SFil = await crossLend.callContract('calcCFilToSFil', [
          utils.toWei(value),
        ])
        try {
          await SFilContract.executeContract(
            'send',
            [CROSSLEND_ADDRESS, SFil, betys],
            state.userAddress,
          )
          dispatch('init')
        } catch (e) {}
        console.log('sfil', SFil)
      } else {
        value = utils.toWei(value)
        console.log('sendValue', value)
        try {
          await CFilContract.executeContract(
            'send',
            [CROSSLEND_ADDRESS, value, betys],
            state.userAddress,
          )
          dispatch('init')
        } catch (e) {}
      }

      // console.log('stake', mode, value)
      // try {
      //   await SFilContract.executeContract(
      //     'send',
      //     [CROSSLEND_ADDRESS, SFil, betys],
      //     state.userAddress,
      //   )
      //   dispatch('init')
      // } catch (e) {}
    },
    // 活期购买
    async demandBuyCoin({ state, commit, dispatch }, data) {
      let { ID, Type, value, inviteValue } = data
      // 判断余额
      let { walletCFil, walletCRFI } = state.wallet
      value = utils.toWei(value)
      console.log(state.wallet, walletCFil, walletCRFI, value)
      let balance = Type == 0 ? walletCRFI : walletCFil

      if (new BigNumber(balance).comparedTo(new BigNumber(value)) == -1) {
        Toast(i18n.t('balanceToast'))
        return
      }

      let isAddress = CRFIContract.web3.utils.isAddress(inviteValue)

      let invite = isAddress
        ? inviteValue
        : '0x0000000000000000000000000000000000000000'
      let betys = CRFIContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [1, parseInt(Type), invite],
      )
      // 0x97b19d507f9acce9ae4c1d3af4c5393d11698b87
      console.log('betys', betys)
      let contract = Type == 0 ? CRFIContract : CFilContract
      try {
        await contract.executeContract(
          'send',
          [CROSSLEND_ADDRESS, value, betys],
          state.userAddress,
        )
        dispatch('init')
      } catch (e) {}
    },
    async initData({ state, commit }) {
      let address = state.userAddress
      let systemInfo = await corsslend.callContract('GetSystemInfo', [])
      let { affRate, cfilInterestPool, crfiInterestPool } = systemInfo
      commit('setSystemInfo', {
        affRate,
        crfiInterestPool,
        cfilInterestPool,
      })
      let res = await corsslend.callContract('GetInvestInfo', [0, address])

      let {
        id,
        admin,
        crfi,
        cfil,
        cfilInterest,
        cfilDemandInterest,
        crfiInterest,
        crfiDemandInterest,
        totalAffFD,
      } = res
      commit('setUserInfo', {
        id,
        admin,
        crfi,
        cfil,
        cfilInterest,
        crfiDemandInterest,
        cfilDemandInterest,
        crfiInterest,
        totalAffFD,
      })
      // if (admin) {
      //   router.replace('/admin')
      // }
      // 获取余额
      // TODO: //cfilInterestPoo
      let watlletCRFI = await crfiContract.callContract('balanceOf', [address])
      let watlletcfil = await eFileContract.callContract('balanceOf', [address])
      let BN = utils.BN
      let totalEfil = new BN(cfilDemandInterest).add(new BN(cfilInterest))
      let totalFD = new BN(crfiDemandInterest).add(new BN(crfiInterest))
      commit('setBalance', {
        admin,
        crfi,
        totalFD,
        cfil,
        totalEfil,
        watlletCRFI,
        watlletcfil,
        cfilInterest,
        crfiInterest,
        totalAffFD,
      })

      // 获取列表
      let list = await corsslend.callContract('GetPackages', [])
      console.log('getPackages', list)
      let { demandCRFI, demandCFil, financialPackages } = list
      let list1 = await corsslend.callContract('GetInvestRecords', [address])
      let records = list1.records
      let crfiList = []
      let cfilList = []
      financialPackages.forEach((element, index) => {
        let { Type, ID } = element
        let deposited = new BN(0)
        for (let i = 0; i < records.length; i++) {
          if (records[i].PackageID == ID) {
            deposited = deposited.add(new BN(records[i].Amount))
          }
        }

        if (Type == 0) {
          crfiList.push({
            ...element,
            deposited: deposited,
          })
        } else {
          cfilList.push({
            ...element,
            deposited: deposited,
          })
        }
      })
      crfiList.unshift({
        ...demandCRFI,
        deposited: list1.demandCRFI.Amount,
      })
      cfilList.unshift({
        ...demandCFil,
        deposited: list1.demandCFil.Amount,
      })
      commit('setFdList', crfiList)
      commit('setEFilList', cfilList)
      commit('setDemandFD', {
        ...demandCRFI,
      })

      let FDInterestRate =
        demandCRFI.NewFDInterestRate == 0
          ? demandCRFI.FDInterestRate
          : demandCRFI.NewFDInterestRate

      let EFilInterestRate =
        demandCRFI.NewEFilInterestRate == 0
          ? demandCRFI.EFilInterestRate
          : demandCRFI.NewEFilInterestRate

      let FDInterestRate1 =
        demandCFil.NewFDInterestRate == 0
          ? demandCFil.FDInterestRate
          : demandCFil.NewFDInterestRate

      let EFilInterestRate1 =
        demandCFil.NewEFilInterestRate == 0
          ? demandCFil.EFilInterestRate
          : demandCFil.NewEFilInterestRate

      commit('setDemandEFil', {
        ...demandCFil,
      })
      commit('setUserList', list1.records)
      commit('setUserDemandList', [
        {
          ...list1.demandEFil,
          Type: 1,
          FDInterestRate: FDInterestRate1,
          EFilInterestRate: EFilInterestRate1,
        },
        {
          ...list1.demandFD,
          Type: 0,
          FDInterestRate,
          EFilInterestRate,
        },
      ])
      // 获取 fileCoin 地址
      let fileCoin = localStorage.getItem(state.userAddress)
      commit('setFileAddr', fileCoin)
    },
  },
  modules: {},
})
