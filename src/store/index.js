import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import i18n from '@/i18n/i18n'
import BigNumber from 'bignumber.js'
var sigUtil = require('eth-sig-util')
var ethUtil = require('ethereumjs-util')

import {
  utils,
  CROSSLEND_ADDRESS as ETH1,
  CFIL_ADDRESS as ETH2,
  crossLend as ETH3,
  API_HOST as ETH4,
  CRFIContract as ETH5,
  CFilContract as ETH6,
  SFilContract as ETH7,
  CROSSLEND_ADDRESSBSC as BSC1,
  CFIL_ADDRESSBSC as BSC2,
  crossLendBSC as BSC3,
  API_HOSTBSC as BSC4,
  CRFIContractBSC as BSC5,
  CFilContractBSC as BSC6,
  SFilContractBSC as BSC7,
  CHAINID,
  CHAINIDBSC,
} from '@/config'

let CROSSLEND_ADDRESS = null
let CFIL_ADDRESS = null
let crossLend = null
let API_HOST = null
let CRFIContract = null
let CFilContract = null
let SFilContract = null

import { Toast } from 'vant'

Vue.use(Vuex)

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
    otherSystemInfo: {
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
    promoteList: [],
    loanInvest: {
      Lending: '0',
      Pledge: '0',
      CFil: '0',
    },
    burnCFilFee: '',
    burnCFilRateCRFI: '',
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
    setOtherSystemInfo(state, data) {
      state.otherSystemInfo = data
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
      let item = state.CFilList.find(n => PackageID == n.ID)
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
      state.rewardsList = data
    },
    setPromoteList(state, data) {
      state.promoteList = data
    },
    setLoanInvest(state, data) {
      state.loanInvest = data
    },
    setMap(state, data) {
      state.crfiPrice = data.crfiPrice
      state.cfilPrice = data.cfilPrice
    },
    setBurnCFilFee(state, value) {
      state.burnCFilFee = value
    },
    setBurnCFilRateCRFI(state, value) {
      state.burnCFilRateCRFI = value
    },
  },
  actions: {
    // 修改 cfil 兑换燃烧crfi比例
    async ChangeBurnCFilRateCRFI({ state }, data) {
      let { value } = data
      value = utils.toWei(value.toString()) / 100
      await CFilContract.executeContract(
        'ChangeBurnCFilRateCRFI',
        [value.toString()],
        state.userAddress,
      )
      dispatch('init')
    },
    // 修改手续费
    async changeCFilFee({ state, commit, dispatch }, data) {
      let { value } = data
      value = utils.toWei(value.toString())
      await CFilContract.executeContract(
        'ChangeBurnCFilFee',
        [value.toString()],
        state.userAddress,
      )
      dispatch('init')
    },
    // 设置每日产出
    async ChangeCRFIMinerPerDay({ state, dispatch }, data) {
      let address = state.userAddress
      let { CRFI, cfil } = data
      let res = await crossLend.executeContract(
        'ChangeCRFIMinerPerDay',
        [utils.toWei(CRFI), utils.toWei(cfil)],
        address,
      )
      dispatch('init')
    },
    // 设置cfil 邀请返利
    async ChangeAffCFil({ state, dispatch }, bool) {
      let address = state.userAddress
      let res = await crossLend.executeContract(
        'ChangeAffCFil',
        [bool],
        address,
      )
      dispatch('init')
    },
    // 获取key - value
    async getKeyValue({ state }, key) {
      let res = await crossLend.callContract('GetMap', [key])
      return res
    },
    // 设置key
    async setKeyValue({ state, dispatch }, { key, value }) {
      let address = state.userAddress
      value = utils.toWei(value)

      let res = await crossLend.executeContract('SetMap', [key, value], address)
      dispatch('init')
    },
    async calcCFilToSFil({ state }) {
      let address = state.userAddress
      let walletCFil = await CFilContract.callContract('balanceOf', [address])
      let { CFil, Lending } = state.loanInvest
      let BN = utils.BN
      let total = new BN(CFil).add(new BN(Lending)).div(new BN(1))
      let tmp = total.div(new BN(1000))
      let target = total.add(tmp)

      // let a = total.mul(new BN(1))
      // console.log(
      //   'to',
      //   total1.toString(),
      //   total1.toNumber(),
      //   a,
      //   a.toString(),
      //   a.toNumber(),
      // )
      // if (new BigNumber(walletCFil).comparedTo(total1) == 1) {
      //   return utils.fromWei(total1.toString())
      // } else {
      //   return utils.fromWei(walletCFil)
      // }
      // console.log(
      //   new BigNumber(walletCFil).comparedTo(total1),
      //   total1,
      //   new BN(total1.toString()),
      //   total1.times(1.1).toString(),
      // )

      // console.log(123, total, new BN(2.2).mod(new BN(1)).toNumber())
      if (new BN(walletCFil).cmp(target) == 1) {
        return utils.fromWei(target.toString())
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
      let userAddress = state.userAddress
      let { APY, PledgeRate, PaymentDue } = data
      APY = (utils.toWei(APY.toString()) / 100).toString()
      PledgeRate = (utils.toWei(PledgeRate.toString()) / 100).toString()
      PaymentDue = utils.toWei(PaymentDue.toString())
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
      crossLend.contract
        .getPastEvents(
          'AffEvent',
          {
            filter: {
              receiver: [address],
            },
            fromBlock: 12645616,
            toBlock: 'latest',
          },
          function(error, events) {},
        )
        .then(function(events) {
          // same results as the optional callback above
          let arr = []
          events.forEach(e => {
            let { returnValues } = e
            arr.push(returnValues)
          })
          commit('setRewardsList', arr)
        })
    },
    // 获取推广列表
    async getPromoteList({ state, commit }) {
      let address = state.userAddress
      console.log(12, await crossLend.web3.eth.getBlockNumber())
      let toBlock = await crossLend.web3.eth.getBlockNumber()
      let fromBlock = toBlock - 1000
      crossLend.contract
        .getPastEvents(
          'AffBought',
          {
            filter: {
              affer: [address],
            }, // Using an array means OR: e.g. 20 or 23
            fromBlock: 12645616,
            toBlock: 'latest',
          },
          function(error, events) {},
        )
        .then(function(events) {
          // same results as the optional callback above
          let arr = []
          events.forEach(e => {
            let { returnValues } = e
            let { packageID } = returnValues
            let item = null
            item = state.CRFIList.find(n => n.ID == packageID)
            if (!item) {
              item = state.CFilList.find(n => n.ID == packageID)
            }
            let { Type } = item
            arr.push({ ...returnValues, Type })
          })
          commit('setPromoteList', arr)
        })
    },

    // 初始化
    async init({ state, commit, dispatch }, chainId) {
      if (chainId === CHAINID) {
        CROSSLEND_ADDRESS = ETH1
        CFIL_ADDRESS = ETH2
        crossLend = ETH3
        API_HOST = ETH4
        CRFIContract = ETH5
        CFilContract = ETH6
        SFilContract = ETH7
      } else if (chainId === CHAINIDBSC) {
        CROSSLEND_ADDRESS = BSC1
        CFIL_ADDRESS = BSC2
        crossLend = BSC3
        API_HOST = BSC4
        CRFIContract = BSC5
        CFilContract = BSC6
        SFilContract = BSC7
      }
      let address = state.userAddress

      let cfilPrice = await crossLend.callContract('GetMap', ['cfilPrice'])
      let crfiPrice = await crossLend.callContract('GetMap', ['crfiPrice'])

      commit('setMap', {
        cfilPrice: cfilPrice || 1,
        crfiPrice: crfiPrice || 1,
      })

      let burnCFilFee = await CFilContract.callContract('burnCFilFee', [])
      let burnCFilRateCRFI = await CFilContract.callContract(
        'burnCFilRateCRFI',
        [],
      )
      commit('setBurnCFilFee', burnCFilFee)
      commit('setBurnCFilRateCRFI', burnCFilRateCRFI)
      let systemInfo = await crossLend.callContract('GetSystemInfo', [])
      // let { affRate, cfilInterestPool, crfiInterestPool } = systemInfo

      // console.log('sys', systemInfo)
      commit('setSystemInfo', systemInfo)
      // packages
      let data = await crossLend.callContract('GetPackages', [])

      let { financialPackages, loanCFil } = data
      commit('setLoanCFil', loanCFil)
      let CRFIList = []
      let CFilList = []
      financialPackages.forEach(e => {
        let {
          Type,
          CFilInterestRate,
          CRFIInterestRate,
          CRFIInterestRateDyn,
          Days,
          ID,
          Total,
          Weight,
          deleteFlag,
        } = e
        if (Type === '0') {
          CRFIList.push({
            Type,
            CFilInterestRate,
            CRFIInterestRate,
            CRFIInterestRateDyn,
            Days,
            ID,
            Total,
            Weight,
            deleteFlag,
            Amount: '0',
          })
        } else {
          CFilList.push({
            Type,
            CFilInterestRate,
            CRFIInterestRate,
            CRFIInterestRateDyn,
            Days,
            ID,
            Total,
            Weight,
            deleteFlag,
            Amount: '0',
          })
        }
      })

      commit('setCRFIList', CRFIList)
      commit('setCFilList', CFilList)
      dispatch('getUserWallet')
      dispatch('getInvestList')
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
      let arr = []

      for (let i = 0; i < res.length; i++) {
        let address = res[i].Addr
        console.log(address)
        let CFIL = await CFilContract.callContract('balanceOf', [address])
        let CRFI = await CRFIContract.callContract('balanceOf', [address])
        let SFIL = await SFilContract.callContract('balanceOf', [address])
        console.log('wallet', CFIL)
        let { Info, Addr, SID, validIdx } = res[i]
        if (Info) {
          Info = JSON.parse(Info)
        }
        arr.push({
          CFIL,
          CRFI,
          SFIL,
          SID,
          Info,
          Addr,
          validIdx,
        })
      }
      // res.forEach(e => {
      //   let { Info, Addr, SID, validIdx } = e
      //   if (Info) {
      //     Info = JSON.parse(Info)
      //   }
      //   arr.push({
      //     SID,
      //     Info,
      //     Addr,
      //     validIdx,
      //   })
      // })
      commit('setApplyList', arr)
    },
    // 获取用户投资列表
    async getInvestList({ state, commit }, data) {
      let address = state.userAddress
      let userList = []
      let list = await crossLend.callContract('GetInvestRecords', [address])

      let { records, loanInvest, interestDetail } = list
      let { Lending, Pledge } = loanInvest
      let arr = JSON.parse(JSON.stringify(interestDetail))
      let loanInterest = arr.pop()
      let recordsInterest = arr
      if (interestDetail.length > 0) {
        commit('setLoanInvest', {
          Lending,
          Pledge,
          CFil: loanInterest[1],
        })
      }
      let BN = utils.BN
      records.forEach((e, index) => {
        let { Type, Days, PackageID } = e

        if (Type == 0) {
          commit('setCRFITotalAmount', e)
        } else {
          commit('setCFilTotalAmount', e)
        }
        let item = userList.find(n => n.PackageID === PackageID && Days == 0)
        let itemIndex = userList.findIndex(
          n => n.PackageID === PackageID && Days == 0,
        )

        // let CFilInterestRate, CRFIInterestRateDyn
        let packageList = Type == 0 ? state.CRFIList : state.CFilList
        let { CFilInterestRate, CRFIInterestRateDyn } = packageList.find(
          n => n.ID == PackageID,
        )

        if (item) {
          let { Amount, CRFIInterest, CFilInterest } = item
          Amount = new BN(Amount).add(new BN(e.Amount))
          CRFIInterest = new BN(CRFIInterest)
            .add(new BN(recordsInterest[index][0]))
            .toString()
          CFilInterest = new BN(CFilInterest)
            .add(new BN(recordsInterest[index][1]))
            .toString()
          userList[itemIndex] = {
            ...e,
            Amount,
            CFilInterest,
            CRFIInterest,
            CFilInterestRate,
            CRFIInterestRateDyn,
          }
        } else {
          userList.push({
            ...e,
            CRFIInterest: recordsInterest[index][0],
            CFilInterest: recordsInterest[index][1],
            CFilInterestRate,
            CRFIInterestRateDyn,
          })
        }
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
      // console.log('user', res)
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
      return new Promise(async (resolve, reject) => {
        let timestamp = parseInt(new Date().getTime() / 1000)
        let chainId = await ethereum.request({ method: 'eth_chainId' })
        // * 主网 0x1
        //  * Ropsten 0x3
        //  * Kovan 0x2a
        //  * Rinkeby 0x4
        //  * Goerli 0x5
        let chainMap = {
          '0x1': 1,
          '0x2a': 42,
          '0x3': 3,
          '0x4': 5,
          '0x5': 6,
          '0x38': 56,
          '0x61': 97,
        }
        if (!chainMap[chainId]) {
          Toast('没有该测试链，请确认后重新登录')
          reject()
          return
        }
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
                chainId: chainMap[chainId],
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
                  .get(API_HOST + '/get_addr', {
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
                        code,
                        result: { FilAddr },
                      },
                    } = response
                    if (code === 0) {
                      commit('setFileAddr', FilAddr)
                      localStorage.setItem(state.userAddress, FilAddr)
                      resolve()
                    } else {
                      reject()
                    }
                  })
                  .catch(function(error) {
                    console.log(error)
                    reject()
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
      if (new BigNumber(tmpCRFI).comparedTo(new BigNumber(res)) == -1) {
        let value = state.wallet.walletCRFI
        let res = await CFilContract.callContract('_calcBurnCFil', [value])
        return utils.fromWei(res)
      } else {
        return utils.fromWei(tmp)
      }
      // 在判断 CRFI 是否足够
    },
    // 回购
    async Repurchase({ state, commit, dispatch }, data) {
      let BN = utils.BN
      let { value, fileCoin = '' } = data
      if (value == '') {
        Toast(i18n.t('eFilPlaceholder'))
        return
      }
      // 数量限制测试环境放开，上线重新使用
      if (value < 0.1) {
        Toast(i18n.t('minNumberToast'))
        return
      }

      let balanceCFil = new BigNumber(state.wallet.walletCFil)
      let balanceCRFI = new BigNumber(state.wallet.walletCRFI)
      value = new BN(utils.toWei(value.toString() || 0))
      // 获取汇率
      // TODO: 比例为0时直接调用CFil burn方法
      let res = await CFilContract.callContract('burnCFilRateCRFI', [])
      let betys1 = utils.utf8ToHex(fileCoin)
      // let betys = CRFIContract.web3.eth.abi.encodeParameters(
      //   ['string'],
      //   [fileCoin],
      // )
      if (res == 0) {
        await CFilContract.executeContract(
          'burn',
          [value.toString(), betys1],
          state.userAddress,
        )
        dispatch('init')
        return
      }
      let rate = utils.fromWei(res)
      // 计算crfi
      let crfiValue = value.times(new BigNumber(res)).div(new BigNumber(1e18))
      // if (balanceCRFI.comparedTo(crfiValue) == -1) {
      //   Toast(i18n.t('balanceToast'))
      //   return
      // }
      // let crfiValue = value.times(new BigNumber(utils.fromWei(res)))
      // 手续费、crfi余额、
      if (
        balanceCFil.comparedTo(value) == -1 ||
        balanceCRFI.comparedTo(crfiValue) == -1 ||
        value.comparedTo(new BigNumber(state.burnCFilFee)) == -1
      ) {
        Toast(i18n.t('balanceToast'))
        return
      }

      if (fileCoin == '') {
        Toast(i18n.t('FilecoinPlaceholder'))
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
    // 修改邀请返利利率
    async ChangeAffRate({ state, commit, dispatch }, data) {
      let { value } = data
      value = utils.toWei(value.toString()) / 100
      try {
        await crossLend.executeContract(
          'ChangeAffRate',
          [value.toString()],
          state.userAddress,
        )
        dispatch('init')
      } catch (e) {}
    },
    // 修改邀请返利最低限制
    async ChangeAffRateLimit({ state, commit, dispatch }, data) {
      let { value } = data
      value = utils.toWei(value.toString())
      try {
        await crossLend.executeContract(
          'ChangeAffRequire',
          [value.toString()],
          state.userAddress,
        )
        dispatch('init')
      } catch (e) {}
    },
    // 修改利率
    async ChangePackageRate({ state, commit, dispatch }, data) {
      let { ID, crfi, cfil } = data
      crfi = utils.toWei(crfi.toString())
      cfil = utils.toWei(cfil.toString()) / 100
      try {
        await crossLend.executeContract(
          'ChangePackageRate',
          [ID, cfil.toString(), crfi.toString()],
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

    // 活期提现
    /**
     * @param {*} PackageID 提取的投资ID
     */
    async WithdrawDemand({ state, commit, dispatch }, type) {
      try {
        await crossLend.executeContract(
          'WithdrawDemand',
          [type],
          state.userAddress,
        )
        dispatch('init')
      } catch (e) {}
    },
    // opcode 0xfe not defined
    /**
     *
     * @param {Boolean} isDemond 是否为全部提现
     * @param {Number} PackageID 理财ID
     */
    async Withdraw({ state, dispatch }, { PackageID, bool }) {
      await crossLend.executeContract(
        'Withdraw',
        [PackageID, bool, 0],
        state.userAddress,
      )
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
    // 充值CRFI池子
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
        let { walletSFil } = state.wallet
        if (parseFloat(value) < parseFloat(paymentDue)) {
          // console.log('xiaoyu')
          Toast(i18n.t('toastPaymentDue'))
          return
        }
        if (
          new BigNumber(utils.toWei(value)).comparedTo(
            new BigNumber(walletSFil),
          ) == 1
        ) {
          Toast(i18n.t('balanceToast'))
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
      } else {
        value = utils.toWei(value)
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
  },
  modules: {},
})
