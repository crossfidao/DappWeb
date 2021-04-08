import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'
import i18n from '@/i18n/i18n'
import Contract from '@/plugin/eth'
import BigNumber from 'bignumber.js'

import { Toast } from 'vant'
import { abi } from '@/plugin/abi'
import { fdAbi } from '@/plugin/fdAbi'
import { coinAbi } from '@/plugin/coinAbi'
import detectEthereumProvider from '@metamask/detect-provider'

Vue.use(Vuex)

let corsslendAddress = '0x7117983d3be99e1cbe296dfeaf034c91db3cd02b'

let corsslend = new Contract({
  address: corsslendAddress,
  abi,
})

let utils = corsslend.web3.utils
let fdContract = new Contract({
  address: '0xa7b3058152165c72a4dd7c4812c5964f1c26f00d',
  abi: fdAbi,
})

let eFileContract = new Contract({
  address: '0x1ccbf9217c06a641e88059578b5bf984e21f11ff',
  abi: coinAbi,
})

eFileContract.contract.events
  .BurnedFDEfil({
    fromBlock: 0,
  })
  .on('connected', function(subscriptionId) {})
  .on('data', function(event) {
    console.log('eventData', event) // same results as the optional callback above
  })
  .on('changed', function(event) {})
  .on('error', function(error, receipt) {})

export default new Vuex.Store({
  state: {
    showLoading: false,
    userAddress: '',
    systemInfo: {
      affRate: '0',
      fdInterestPool: '',
      efilInterestPool: '0',
    },
    balance: {
      CRFI: '0',
      efil: '0',
      efilInterest: '0',
      fdInterest: '0',
      watlletCRFI: '0',
      watlletefil: '0',
    },
    userInfo: {
      id: '0',
      admin: false,
      fd: '0',
      efil: '0',
      efilInterest: '0',
      fdInterest: '0',
    },
    userList: [],
    userDemandList: [],
    demandFD: [],
    demandEFil: [],
    fdList: [],
    eFilList: [],
  },
  getters: {
    efilWithdrawable: state => {
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
    fdWithdrawable: state => {
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
    efilTotal: state => {
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
    fdTotal: state => {
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
    setCorsslend(state, data) {},
    setUserInfo(state, data) {
      state.userInfo = data
    },
    setBalance(state, data) {
      state.balance = data
    },
    setFdList(state, data) {
      state.fdList = data
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
    setUserList(state, data) {
      state.userList = data
    },
    setUserDemandList(state, data) {
      state.userDemandList = data
    },
  },
  actions: {
    // 回购
    async Repurchase({ state, commit, dispatch }, data) {
      let { value, fileCoin = '1' } = data
      let balanceEFil = new BigNumber(state.balance.watlletefil)
      let balanceCRFI = new BigNumber(state.balance.watlletCRFI)
      value = new BigNumber(utils.toWei(value.toString() || 0))
      // 获取汇率
      let res = await eFileContract.callContract('burnEFilRateFD', [])
      let rate = utils.fromWei(res)

      let fdValue = value.times(new BigNumber(utils.fromWei(res)))
      if (balanceEFil.comparedTo(value) == -1) {
        Toast(i18n.t('balanceToast'))
        return
      }

      let betys = fdContract.web3.eth.abi.encodeParameter(
        'bytes',
        '0x4920686176652031303021',
      )
      console.log('betys', betys)
      // 调用fd send
      try {
        await fdContract.executeContract(
          'send',
          ['0xa7b3058152165c72a4dd7c4812c5964f1c26f00d', fdValue, betys],
          state.userAddress,
        )
        dispatch('initData')
      } catch (e) {
        console.log('error', e)
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
      let { ID, fd, efil } = data
      fd = utils.toWei(fd.toString()) / 100
      efil = utils.toWei(efil.toString()) / 100
      try {
        await corsslend.executeContract(
          'ChangePackageRate',
          [ID, fd.toString(), efil.toString()],
          state.userAddress,
        )
        dispatch('initData')
      } catch (e) {}
    },
    // 修改活期利率
    //
    async ChangeDemandRate({ state, commit, dispatch }, data) {
      let { ID, fd, efil } = data
      fd = utils.toWei(fd.toString()) / 100
      efil = utils.toWei(efil.toString()) / 100
      try {
        await corsslend.executeContract(
          'ChangeDemandRate',
          [ID, fd.toString(), efil.toString()],
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
      let betys = fdContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [2, 0, '0x97b19d507f9acce9ae4c1d3af4c5393d11698b87'],
      )
      value = utils.toWei(value)
      commit('setLoading', true)
      try {
        await eFileContract.executeContract(
          'send',
          [corsslendAddress, value, betys],
          state.userAddress,
        )
        dispatch('initData')
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
      }
    },
    async chargeCRFI({ state, commit, dispatch }, data) {
      let { value } = data
      let betys = fdContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [3, 0, '0x97b19d507f9acce9ae4c1d3af4c5393d11698b87'],
      )
      value = utils.toWei(value)
      commit('setLoading', true)
      try {
        await fdContract.executeContract(
          'send',
          [corsslendAddress, value, betys],
          state.userAddress,
        )
        dispatch('initData')
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
      }
    },
    // 购买
    async buyCoin({ state, commit, dispatch }, data) {
      let { ID, Type, value, inviteValue } = data

      let isAddress = fdContract.web3.utils.isAddress(inviteValue)
      let invite = isAddress
        ? inviteValue
        : '0x0000000000000000000000000000000000000000'
      console.log('inbiteAddress', inviteValue)
      let betys = fdContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [0, ID, invite],
      )
      value = utils.toWei(value)
      let contract = Type == 0 ? fdContract : eFileContract

      try {
        await contract.executeContract(
          'send',
          [corsslendAddress, value, betys],
          state.userAddress,
        )
        dispatch('initData')
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
      }
    },
    // 活期购买
    async demandBuyCoin({ state, commit, dispatch }, data) {
      // commit('setLoading', true)
      let { ID, Type, value, inviteValue } = data
      let isAddress = fdContract.web3.utils.isAddress(inviteValue)
      let invite = isAddress
        ? inviteValue
        : '0x0000000000000000000000000000000000000000'
      let betys = fdContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [1, parseInt(Type), invite],
      )
      // 0x97b19d507f9acce9ae4c1d3af4c5393d11698b87

      value = utils.toWei(value)
      commit('setLoading', true)
      let contract = Type == 0 ? fdContract : eFileContract
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
      console.log('initData')
      let address = state.userAddress
      let systemInfo = await corsslend.callContract('GetSystemInfo', [])

      let { affRate, efilInterestPool, fdInterestPool } = systemInfo
      commit('setSystemInfo', {
        affRate,
        fdInterestPool,
        efilInterestPool,
      })
      let res = await corsslend.callContract('GetInvestInfo', [0, address])
      let { id, admin, fd, efil, efilInterest, fdInterest } = res
      commit('setUserInfo', {
        id,
        admin,
        fd,
        efil,
        efilInterest,
        fdInterest,
      })
      // if (admin) {
      //   router.replace('/admin')
      // }
      // 获取余额
      // TODO: //efilInterestPoo
      let watlletCRFI = await fdContract.callContract('balanceOf', [address])
      let watlletefil = await eFileContract.callContract('balanceOf', [address])
      commit('setBalance', {
        admin,
        fd,
        efil,
        watlletCRFI,
        watlletefil,
        efilInterest,
        fdInterest,
      })

      // 获取列表
      let list = await corsslend.callContract('GetPackages', [])
      let { demandEFil, demandFD, financialPackages } = list
      console.log('list', list)
      let list1 = await corsslend.callContract('GetInvestRecords', [address])
      let fdList = []
      let efilList = []

      financialPackages.forEach((element, index) => {
        let { Type } = element
        if (Type == 0) {
          fdList.push(element)
        } else {
          efilList.push(element)
        }
      })
      fdList.unshift(demandFD)
      efilList.unshift(demandEFil)

      commit('setFdList', fdList)
      commit('setEFilList', efilList)
      commit('setDemandFD', {
        ...demandFD,
      })

      let FDInterestRate =
        demandFD.NewFDInterestRate == 0
          ? demandFD.FDInterestRate
          : demandFD.NewFDInterestRate

      let EFilInterestRate =
        demandFD.NewEFilInterestRate == 0
          ? demandFD.EFilInterestRate
          : demandFD.NewEFilInterestRate

      let FDInterestRate1 =
        demandEFil.NewFDInterestRate == 0
          ? demandEFil.FDInterestRate
          : demandEFil.NewFDInterestRate

      let EFilInterestRate1 =
        demandEFil.NewEFilInterestRate == 0
          ? demandEFil.EFilInterestRate
          : demandEFil.NewEFilInterestRate

      commit('setDemandEFil', {
        ...demandEFil,
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
    },
  },
  modules: {},
})
