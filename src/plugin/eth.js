import Web3 from 'web3'

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
    return await this.contract.methods[methods](...args).call()
  }
  async executeContract(methods, args) {
    console.log(methods, args)
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
