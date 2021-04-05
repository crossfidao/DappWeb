import Web3 from 'web3'
import { Toast } from 'vant'
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
    this.abi = abi
    this.address = address
    if (typeof window.web3 != undefined) {
      this.web3 = new Web3(window.web3.currentProvider)
      window.web3 = this.web3

      window.ethereum.on('accountsChanged', account => {
        this.userAddress = account[0]
      })
      window.ethereum.on('connect', () => {})
    } else {
      this.web3 = new Web3()
    }

    this.init()
  }

  async init() {
    window.ethereum.on('accountsChanged', account => {
      this.userAddress = account[0]
    })
    this.contract = new this.web3.eth.Contract(this.abi, this.address)
  }

  async callContract(methods, args) {
    // console.log(methods, args)
    try {
      return await this.contract.methods[methods](...args).call()
    } catch (e) {
      Toast(e.message)
    }
  }
  async executeContract(methods, args, address) {
    console.log(methods, args)
    store.commit('setLoading', true)
    return new Promise(async (resolve, reject) => {
      // console.log(methods, args)
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
          Toast(e)
          store.commit('setLoading', false)
          reject()
          throw e.message
        }
      } catch (e) {
        console.log('dfdlfd', e.code, e.message)
        console.log('gas', e, e.code)
        Toast(e.toString())
        store.commit('setLoading', false)
        reject()
        throw e.message
      }
    })
  }
}
