import Web3 from 'web3'

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
    return await this.contract.methods[methods](...args).call()
  }
  async executeContract(methods, args) {
    let accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    })
    // let gasPrict = await this.web3.eth.getGasPrice()
    let gasAmount = await this.contract.methods[methods](...args).estimateGas({
      from: accounts[0],
    })
    return await this.contract.methods[methods](...args).send({
      from: accounts[0],
      gas: gasAmount,
      gasPrice: '20000000000',
    })
  }
}
