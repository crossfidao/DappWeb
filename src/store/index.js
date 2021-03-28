import Vue from 'vue'
import Vuex from 'vuex'
import Contract from '@/plugin/eth'
import router from '@/router'
import { abi } from '@/plugin/abi'
import { fdAbi } from '@/plugin/fdAbi'
import { coinAbi } from '@/plugin/coinAbi'

Vue.use(Vuex)

let corsslendAddress = '0x261d3953f4304584f051e36692cfa89fcace7446'

let corsslend = new Contract({
  address: corsslendAddress,
  abi,
})

let utils = corsslend.web3.utils
let fdContract = new Contract({
  address: '0xc5189f0b4f3ab454616d6b499fe0a51e116a14c0',
  abi: fdAbi,
})

let eFileContract = new Contract({
  address: '0xbffa5f97d5119580003410d4fdf829b6cc4ae3fb',
  abi: coinAbi,
})

export default new Vuex.Store({
  state: {
    showLoading: false,
    balance: {
      CRFI: 0,
      efil: 0,
      efilInterest: 0,
      fdInterest: 0,
      watlletCRFI: 0,
      watlletefil: 0,
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
    setCorsslend(state, data) {},
    setBalance(state, data) {
      state.balance = data
      console.log('balance', state.balance)
    },
    setFdList(state, data) {
      state.fdList = data
    },
    setEFilList(state, data) {
      state.eFilList = data
    },
    setDemandFD(state, data) {
      state.demandFD = [data]
      console.log('demandFD', state.demandFD)
    },
    setDemandEFil(state, data) {
      state.demandEFil = [data]
      console.log('demandEFil', state.demandEFil)
    },
    setUserList(state, data) {
      state.userList = data
      console.log('user', state.userList)
    },
    setUserDemandList(state, data) {
      state.userDemandList = data
    },
  },
  actions: {
    // 修改利率
    async ChangePackageRate({ commit, dispatch }, data) {
      commit('setLoading', true)
      let { ID, fd, efil } = data
      // fd = parseFloat(fd) / 100
      console.log(fd.toString(), utils.toWei(fd.toString()).toString())
      fd = utils.toWei(fd.toString()) / 100
      efil = utils.toWei(efil.toString()) / 100
      console.log(fd, efil)
      // utils.toWei(utils.toWei(fd).toString())
      try {
        await corsslend.executeContract('ChangePackageRate', [
          ID,
          fd.toString(),
          efil.toString(),
        ])
      } catch (e) {}
      commit('setLoading', false)
    },
    // 修改活期利率
    //
    async ChangeDemandRate({ commit, dispatch }, data) {
      let { ID, fd, efil } = data
      await corsslend.executeContract('ChangeDemandRate', [
        0,
        utils.toWei('0.2'),
        utils.toWei('0.3'),
      ])
    },
    // 回购
    async Repurchase({ commit, dispatch }) {
      // 调用fd send
      let res = await eFileContract.callContract('burnEFilRateFD', [])
      console.log('burnEFilRateFD', res)
    },
    async WithdrawDemand() {
      await corsslend.executeContract('WithdrawDemand', [])
    },
    async Withdraw() {
      await corsslend.executeContract('Withdraw', [])
    },
    // 管理员充值
    async charge({ commit, dispatch }, data) {
      let { value } = data
      console.log('value', value)
      let betys = fdContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [2, 0, '0x97b19d507f9acce9ae4c1d3af4c5393d11698b87'],
      )
      value = utils.toWei(value)
      commit('setLoading', true)
      try {
        await eFileContract.executeContract('send', [
          corsslendAddress,
          value,
          betys,
        ])
        dispatch('initData')
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
      }
    },
    // 购买
    async buyCoin({ commit, dispatch }, data) {
      let { ID, Type, value } = data
      let betys = fdContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [0, ID, '0x5E95DbE6dd707B988e6CC2396b3F75a4Ea0afd0C'],
      )
      value = utils.toWei(value)
      commit('setLoading', true)
      let contract = Type == 0 ? fdContract : eFileContract

      try {
        await contract.executeContract('send', [corsslendAddress, value, betys])
        dispatch('initData')
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
      }
    },
    // 活期购买
    async demandBuyCoin({ commit, dispatch }, data) {
      commit('setLoading', true)
      let { ID, Type, value } = data
      let betys = fdContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256', 'address'],
        [1, parseInt(Type), '0x0000000000000000000000000000000000000000'],
      )
      // 0x97b19d507f9acce9ae4c1d3af4c5393d11698b87

      value = utils.toWei(value)
      commit('setLoading', true)
      let contract = Type == 0 ? fdContract : eFileContract

      try {
        await contract.executeContract('send', [corsslendAddress, value, betys])
        dispatch('initData')
        commit('setLoading', false)
      } catch (e) {
        console.log('catcch', e)
        commit('setLoading', false)
      }
    },
    async initData({ commit }) {
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      let res = await corsslend.callContract('GetInvestInfo', [0, accounts[0]])
      let { admin, CRFI, efil, efilInterest, fdInterest } = res
      console.log('userInfo', res)
      // if (admin) {
      //   router.replace('/admin')
      // }
      // 获取余额
      let watlletCRFI = await fdContract.callContract('balanceOf', accounts)
      let watlletefil = await eFileContract.callContract('balanceOf', accounts)
      commit('setBalance', {
        admin,
        CRFI,
        efil,
        watlletCRFI,
        watlletefil,
        efilInterest,
        fdInterest,
      })

      // 获取列表
      let list = await corsslend.callContract('GetPackages', [])
      let { demandEFil, demandFD, financialPackages } = list
      let list1 = await corsslend.callContract('GetInvestRecords', accounts)
      let fdList = []
      let efilList = []
      console.log('userList', list1)
      console.log('demandEFil', list.demandEFil)
      console.log('demandFD', list.demandFD)
      console.log('demandList', [
        { ...list1.demandEFil },
        { ...list1.demandFD },
      ])
      commit('setUserDemandList', [
        { ...list1.demandEFil },
        { ...list1.demandFD },
      ])
      financialPackages.forEach(element => {
        let { Type } = element
        if (Type == 0) {
          fdList.push(element)
        } else {
          efilList.push(element)
        }
      })

      commit('setFdList', fdList)
      commit('setEFilList', efilList)
      commit('setDemandFD', {
        ...demandFD,
      })
      commit('setDemandEFil', {
        ...demandEFil,
      })
      commit('setUserList', list1.records)
    },
  },
  modules: {},
})
