import Web3 from 'web3'
import { Toast } from 'vant'
import i18n from '@/i18n/i18n'
import detectEthereumProvider from '@metamask/detect-provider'

import store from '@/store'
// web3.eth.send({
//   from: web3.eth.accounts[0],
//   to: singleUseAddr1.toString('hex'),
//   value: web3.toBigNumber('80000000000000000'),
// })

/* ===========================================================================
5. Broadcast the deployment transaction.
===========================================================================  */
// web3.eth.sendRawTransaction(erc1820rawData, function(err, hash) {
//   if (!err) console.log(hash)
//   else console.log(err)
// })

export default class Contract {
  abi = null
  web3 = null
  address = ''
  userAddress = ''
  contract = null
  constructor({ abi, address }) {
    detectEthereumProvider().then(res => {
      this.abi = abi
      this.address = address
      if (typeof window.ethereum != 'undefined') {
        this.web3 = new Web3(res)

        ethereum.on('accountsChanged', account => {
          this.userAddress = account[0]
        })
        ethereum.on('connect', () => {})
      } else {
        this.web3 = new Web3()
      }

      this.init()
    })
  }

  async init() {
    window.ethereum.on('accountsChanged', account => {
      this.userAddress = account[0]
    })
    this.contract = new this.web3.eth.Contract(this.abi, this.address)
  }

  async callContract(methods, args) {
    // console.log('call', methods, args)
    try {
      let res = await this.contract.methods[methods](...args).call()
      return res
    } catch (e) {
      console.log('合约方法methods', methods)
      console.log('合约方法参数', args)
      console.log('报错信息', e.message)
      Toast(e.message)
    }
  }
  async executeContract(methods, args, address) {
    console.log('execute', methods, args, address)
    let isLoading = store.state.showLoading
    if (isLoading) {
      Toast(i18n.t('inexecution'))
      return false
    }
    store.commit('setLoading', true)
    return new Promise(async (resolve, reject) => {
      console.log(methods, args)
      try {
        let gasAmount = await this.contract.methods[methods](
          ...args,
        ).estimateGas({
          from: address,
        })
        try {
          await this.contract.methods[methods](...args).send({
            from: address,
            gas: gasAmount,
            // gasPrice: '20000000000',
          })
          store.commit('setLoading', false)
          resolve()
        } catch (e) {
          console.log(e)
          let { code } = e
          console.log(code)
          if (code == 4001) {
            console.log(123, code)
            Toast(i18n.t('cancel'))
          } else {
            // Toast(e)
          }
          store.commit('setLoading', false)
          reject()
          throw e.message
        }
      } catch (e) {
        console.log('dfd', e)
        // Toast(e.toString())
        console.log(e.message.code)
        store.commit('setLoading', false)
        reject()
        throw e.message
      }
    })
  }
}
