import Vue from 'vue'
import Vuex from 'vuex'
import Contract from '@/plugin/eth'
import router from '@/router'
import { abi } from '@/plugin/abi'
import { coinAbi } from '@/plugin/coinAbi'

Vue.use(Vuex)

let corsslend = new Contract({
  address: '0x7eef73f1ddbd0dab8ebb19f9696b532071c4c3fe',
  abi,
})

let utils = corsslend.web3.utils
let fdContract = new Contract({
  address: '0x1ccbf9217c06a641e88059578b5bf984e21f11ff',
  abi: coinAbi,
})

let eFileContract = new Contract({
  address: '0xde72e9f35176f11274ae6c0654da745c97531501',
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
    // 购买
    async buyCoin({ commit, dispatch }, data) {
      let { ID, Type, value } = data
      console.log(ID, Type, value, data)
      let betys = fdContract.web3.eth.abi.encodeParameters(
        ['uint256', 'uint256'],
        [0, ID],
      )
      value = utils.toWei(value)
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      commit('setLoading', true)
      if (Type == 0) {
        console.log('fd')
        await fdContract.executeContract('send', [
          '0x7eef73f1ddbd0dab8ebb19f9696b532071c4c3fe',
          value,
          betys,
        ])
      } else {
        await eFileContract.executeContract('send', [
          '0x7eef73f1ddbd0dab8ebb19f9696b532071c4c3fe',
          value,
          betys,
        ])
      }
      commit('setLoading', false)
      dispatch('initData')
    },
    async initData({ commit }) {
      let accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      })
      console.log('init')

      let { admin } = await corsslend.callContract(
        'GetInvestInfoByAddr',
        accounts,
      )
      console.log(admin)
      if (!admin) {
        router.push('/admin')
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
