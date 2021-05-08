import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import i18n from '@/i18n/i18n'
import Contract from '@/plugin/eth'
import BigNumber from 'bignumber.js'
var ethUtil = require('ethereumjs-util')
var sigUtil = require('eth-sig-util')

import {
  CORSSLEND_ADDRESS,
  CRFI_ADDRESS,
  CFIL_ADDRESS,
  SFIL_ADDRESS,
} from '@/config'
import { Toast } from 'vant'

import { crossLendAbi } from '@/plugin/corsslend'
import { CRFIAbi } from '@/plugin/CRFI.js'
import { CFilAbi } from '@/plugin/CRFI.js'
import { SFilAbi } from '@/plugin/SRFI.js'

Vue.use(Vuex)

const corsslend = new Contract({
  address: CORSSLEND_ADDRESS,
  crossLendAbi,
})

let utils = corsslend.web3.utils
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
    userAddress: '',
    FilAddr: '',
    systemInfo: {
      affRate: '0',
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
    userList: [],
    userDemandList: [],
    demandFD: [],
    demandEFil: [],
    crfiList: [],
    eFilList: [],
  },
  getters: {
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
        let { Amount, Type, EndTime, EFilInterestRate, FDInterestRate } = e
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
      console.log('dfdlfkd', data)
    },
    setDemandFD(state, data) {
      state.demandFD = [data]
    },
    setDemandEFil(state, data) {
      state.demandEFil = [data]
    },
    setUserList(state, data) {
      state.userList = data
    },
    setUserDemandList(state, data) {
      state.userDemandList = data
    },
  },
  actions: {
    // 签名 登录
    login({ state, commit }) {
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
                  // .get('http://10.255.3.147:9980/get_addr', {
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
    },
    // 计算 CRFI
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
      let balanceEFil = new BigNumber(state.balance.watlletcfil)
      let balanceCRFI = new BigNumber(state.balance.watlletCRFI)
      value = new BigNumber(utils.toWei(value.toString() || 0))
      // 获取汇率
      let res = await eFileContract.callContract('burnEFilRateCRFI', [])
      let rate = utils.fromWei(res)
      let crfiValue = value.times(new BigNumber(res)).div(new BigNumber(1e18))
      console.log('balance', crfiValue.toString())
      console.log(123, crfiValue, utils.fromWei(crfiValue.toString()))
      // if (balanceCRFI.comparedTo(crfiValue) == -1) {
      //   Toast(i18n.t('balanceToast'))
      //   return
      // }

      // let crfiValue = value.times(new BigNumber(utils.fromWei(res)))
      if (balanceEFil.comparedTo(value) == -1) {
        Toast(i18n.t('balanceToast'))
        return
      }
      if (fileCoin == '') {
        Toast(i18n.t('toastFileCoin'))
        return
      }
      let betys1 = utils.utf8ToHex(fileCoin)
      let betys = crfiContract.web3.eth.abi.encodeParameters(
        ['string'],
        [fileCoin],
      )
      // 调用crfi send
      try {
        await crfiContract.executeContract(
          'send',
          [
            '0x1ccbf9217c06a641e88059578b5bf984e21f11ff',
            crfiValue.toString(),
            betys1,
          ],
          state.userAddress,
        )
        dispatch('initData')
      } catch (e) {
        Toast('code: ' + e.code + 'messag: ' + e.message)
      }
    },
    async ChangeAffRate({ state, commit, dispatch }, data) {
      let { value } = data
      value = utils.toWei(value.toString()) / 100
      try {
        await corsslend.executeContract(
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
        await corsslend.executeContract(
          'ChangePackageRate',
          [ID, crfi.toString(), cfil.toString()],
          state.userAddress,
        )
        dispatch('initData')
      } catch (e) {}
    },
    // 修改活期利率
    //
    async ChangeDemandRate({ state, commit, dispatch }, data) {
      let { ID, crfi, cfil } = data
      crfi = utils.toWei(crfi.toString()) / 100
      cfil = utils.toWei(cfil.toString()) / 100
      try {
        await corsslend.executeContract(
          'ChangeDemandRate',
          [ID, crfi.toString(), cfil.toString()],
          state.userAddress,
        )
        dispatch('initData')
      } catch (e) {
        console.log(e)
      }
    },

    async WithdrawDemand({ state, commit, dispatch }) {
      try {
        await corsslend.executeContract('WithdrawDemand', [], state.userAddress)
        dispatch('initData')
      } catch (e) {}
    },
    async Withdraw({ state, dispatch }) {
      await corsslend.executeContract('Withdraw', [], state.userAddress)
      dispatch('initData')
      try {
      } catch (e) {}
    },
    // 管理员充值
    async charge({ state, commit, dispatch }, data) {
      let { value } = data
      let betys = crfiContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [2, 0, '0x97b19d507f9acce9ae4c1d3af4c5393d11698b87'],
      )
      value = utils.toWei(value)
      try {
        await eFileContract.executeContract(
          'send',
          [corsslendAddress, value, betys],
          state.userAddress,
        )
        dispatch('initData')
      } catch (e) {}
    },
    async chargeCRFI({ state, commit, dispatch }, data) {
      let { value } = data
      let betys = crfiContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [3, 0, '0x97b19d507f9acce9ae4c1d3af4c5393d11698b87'],
      )
      value = utils.toWei(value)
      try {
        await crfiContract.executeContract(
          'send',
          [corsslendAddress, value, betys],
          state.userAddress,
        )
        dispatch('initData')
      } catch (e) {}
    },
    // 购买
    async buyCoin({ state, commit, dispatch }, data) {
      let { ID, Type, value, inviteValue } = data

      let isAddress = crfiContract.web3.utils.isAddress(inviteValue)
      let invite = isAddress
        ? inviteValue
        : '0x0000000000000000000000000000000000000000'
      let betys = crfiContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [0, ID, invite],
      )
      value = utils.toWei(value)
      let contract = Type == 0 ? crfiContract : eFileContract

      try {
        await contract.executeContract(
          'send',
          [corsslendAddress, value, betys],
          state.userAddress,
        )
        dispatch('initData')
      } catch (e) {}
    },
    // 活期购买
    async demandBuyCoin({ state, commit, dispatch }, data) {
      let { ID, Type, value, inviteValue } = data
      let isAddress = crfiContract.web3.utils.isAddress(inviteValue)
      let invite = isAddress
        ? inviteValue
        : '0x0000000000000000000000000000000000000000'
      let betys = crfiContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [1, parseInt(Type), invite],
      )
      // 0x97b19d507f9acce9ae4c1d3af4c5393d11698b87

      value = utils.toWei(value)
      let contract = Type == 0 ? crfiContract : eFileContract
      try {
        await contract.executeContract(
          'send',
          [corsslendAddress, value, betys],
          state.userAddress,
        )
        dispatch('initData')
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
      let { demandCRFI, demandCFil, financialPackages } = list
      let list1 = await corsslend.callContract('GetInvestRecords', [address])
      console.log('debug', list1)
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
      console.log('eFilList', cfilList)
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
