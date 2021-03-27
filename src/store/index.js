import Vue from 'vue'
import Vuex from 'vuex'
import Contract from '@/plugin/eth'
import router from '@/router'
import { abi } from '@/plugin/abi'
import { coinAbi } from '@/plugin/coinAbi'

Vue.use(Vuex)

let corsslend = new Contract({
  address: '0x97b19d507f9acce9ae4c1d3af4c5393d11698b87',
  abi,
})

let utils = corsslend.web3.utils
let fdContract = new Contract({
  address: '0x36e3383367e4604d6365c809624b0ee06e6dcc5a',
  abi: coinAbi,
})

let eFileContract = new Contract({
  address: '0xa2bae2ecfdf6a20cd85d028d5e925f7fe29308b6',
  abi: coinAbi,
})

export default new Vuex.Store({
  state: {
    showLoading: false,
    balance: {
      fd: 0,
      eFile: 0,
    },
    userList: [],
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
    },
    setFdList(state, data) {
      state.fdList = data
    },
    setEFilList(state, data) {
      state.eFilList = data
    },
    setUserList(state, data) {
      state.userList = data
    },
  },
  actions: {
    async Withdraw() {
      await corsslend.executeContract('Withdraw', [])
    },
    // 管理员充值
    async charge({ commit, dispatch }, data) {
      let { value } = data
      let betys = fdContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256'],
        [1, 0],
      )
      value = utils.toWei(value)
      commit('setLoading', true)
      try {
        await eFileContract.executeContract('send', [
          '0x97b19d507f9acce9ae4c1d3af4c5393d11698b87',
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
      console.log(ID, Type, value, data)
      let betys = fdContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256'],
        [0, ID],
      )
      value = utils.toWei(value)
      commit('setLoading', true)
      let contract = Type == 0 ? fdContract : eFileContract

      try {
        await contract.executeContract('send', [
          '0x97b19d507f9acce9ae4c1d3af4c5393d11698b87',
          value,
          betys,
        ])
        dispatch('initData')
        commit('setLoading', false)
      } catch (e) {
        commit('setLoading', false)
      }
    },
    async initData({ commit }) {
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })

      let { admin } = await corsslend.callContract('GetInvestInfo', [
        0,
        accounts[0],
      ])
      console.log(admin)
      if (admin) {
        router.replace('/admin')
      }

      // 获取余额
      let fd = await fdContract.callContract('balanceOf', accounts)
      let eFile = await eFileContract.callContract('balanceOf', accounts)
      commit('setBalance', {
        fd,
        eFile,
      })
      // 获取列表
      let list = await corsslend.callContract('GetFinancialPackage', [])

      let list1 = await corsslend.callContract('GetInvesterRecords', accounts)
      console.log('user', list1)
      let fdList = []
      let efilList = []
      list.forEach(element => {
        let { Type } = element
        if (Type == 0) {
          fdList.push(element)
        } else {
          efilList.push(element)
        }
      })
      commit('setFdList', fdList)
      commit('setEFilList', efilList)
      commit('setUserList', list1)
    },
  },
  modules: {},
})
