/**
 * 配置文件
 */

// 链ID
/**
 * 主网 0x1
 * Ropsten 0x3
 * Kovan 0x2a
 * Rinkeby 0x4
 * Goerli 0x5
 * bsc主网 0x38
 * bsc test 0x61
 */
// BSC主网
export const CHAINIDBSC = '0x38'
// 合约地址 官方测试链
export const CROSSLEND_ADDRESSBSC = '0x4De8E1a97acb3c71A959E947c27796EC83469f7d'

export const CRFI_ADDRESSBSC = '0xae20bc46300bab5d85612c6bc6ea87ea0f186035'

export const CFIL_ADDRESSBSC = '0x4eab1d37213B08C224E4C9C28efbA23DC493dFD2'

export const SFIL_ADDRESSBSC = '0x86ef562a68e1EB7E3CEC2DE9b7a752A231Bf3CFF'

// 兑换合约对象地址
export const EX_ADDRESSBSC = '0x91c8adf65892165eb50f5bcac330029e56b61c54'

export const API_HOSTBSC = 'https://bsc.prod.crossfimain.com'

// 主网
export const CHAINID = '0x1'

export const CROSSLEND_ADDRESS = '0x9A1d5103Ef765a3EdE26d5757353DF2Af0dd3856'

export const CRFI_ADDRESS = '0x8848812bd31aeee33313c10a840ffc3169078c5b'

export const CFIL_ADDRESS = '0x0f91445A15a1353A099E742f9B51b1b41C2CbFe8'

export const SFIL_ADDRESS = '0x642C75E5E61b3169Ed40644E14260b6f5a366d65'

// // 兑换合约对象地址
// export const EX_ADDRESS = '0x72457db5fB4c7346B5DD20Ba9FB52e679f40Aff8'
//
// export const API_HOST = 'https://api.crossfimain.com'

// 合约地址 官方测试链 R
// export const CHAINID = '0x3'

// export const CROSSLEND_ADDRESS = '0x422066b2F51bD090BAbBb499B01dB79A8F3B335a'

// export const CRFI_ADDRESS = '0xacd6012077c1dd95bc4561a0e566d16080b10698'

// export const CFIL_ADDRESS = '0xd6c0ea77bcfb756a36ca1746a7f0e4cb927bc43b'

// export const SFIL_ADDRESS = '0xb3b2c4987d0f5888d38db03bcdd9beb8f8d295b8'

// 兑换合约对象地址
// export const EX_ADDRESS = '0x35854041a12fc2ad4ED6346D1FaF81c7d9bF4F7C'
export const EX_ADDRESS = '0x15A799D9BC58286c921348BCFDd3186b61BfA2a4'

export const API_HOST = 'https://api.crossfimain.com'

// export const CHAINID = '0x9fbf1'
// export const CROSSLEND_ADDRESS = '0x7e27e8f3aa4bda26502c38ccd28a4838aeca7966'
// export const CRFI_ADDRESS = '0x1ccbf9217c06a641e88059578b5bf984e21f11ff'
// export const CFIL_ADDRESS = '0x7117983d3be99e1cbe296dfeaf034c91db3cd02b'
// export const SFIL_ADDRESS = '0x97c4cf2c2318171aa9c075bf66b27be57321aeee'
// export const API_HOST = 'https://clserver.mm.comeonbtc.com:8443'
import Contract from '@/plugin/eth'
import { CRFIAbi } from '@/plugin/CRFI.js'
import { CFilAbi } from '@/plugin/CFil.js'
import { SFilAbi } from '@/plugin/SFil.js'
import { crossLendAbi } from '@/plugin/crossLend.js'
import { ExchangeAbi } from '@/plugin/exchange.js'
import Web3 from 'web3'

export const crossLend = new Contract({
  address: CROSSLEND_ADDRESS,
  abi: crossLendAbi,
})

export const utils = new Web3().utils

export const CRFIContract = new Contract({
  address: CRFI_ADDRESS,
  abi: CRFIAbi,
})

export const CFilContract = new Contract({
  address: CFIL_ADDRESS,
  abi: CFilAbi,
})

export const SFilContract = new Contract({
  address: SFIL_ADDRESS,
  abi: SFilAbi,
})

export const EXContract = new Contract({
  address: EX_ADDRESS,
  abi: ExchangeAbi,
})

export const crossLendBSC = new Contract({
  address: CROSSLEND_ADDRESSBSC,
  abi: crossLendAbi,
})

export const CRFIContractBSC = new Contract({
  address: CRFI_ADDRESSBSC,
  abi: CRFIAbi,
})

export const CFilContractBSC = new Contract({
  address: CFIL_ADDRESSBSC,
  abi: CFilAbi,
})

export const SFilContractBSC = new Contract({
  address: SFIL_ADDRESSBSC,
  abi: SFilAbi,
})

export const EXContractBSC = new Contract({
  address: EX_ADDRESSBSC,
  abi: ExchangeAbi,
})

export const getETHSystemInfo = async () => {
  const web3js = new Web3(
    new Web3.providers.HttpProvider(
      'https://mainnet.infura.io/v3/ac295ebab93d4349b15ab8a63016c771',
    ),
  )
  var crossFiAddress = CROSSLEND_ADDRESS;
  const crossFi = new web3js.eth.Contract(crossLendAbi, crossFiAddress)
  const result = await crossFi.methods.GetSystemInfo().call()
  return result
}

export const getBSCSystemInfo = async () => {
  const web3js = new Web3(
    new Web3.providers.HttpProvider(
      // 'https://data-seed-prebsc-1-s1.binance.org:8545',
      'https://bsc-dataseed.binance.org',
    ),
  )
  var crossFiAddress = CROSSLEND_ADDRESSBSC;
  const crossFi = new web3js.eth.Contract(crossLendAbi, crossFiAddress)
  const result = await crossFi.methods.GetSystemInfo().call()
  return result
}

export const getETHStakingInfo = async (address, type = 'ETH') => {
  // 由于手机上部分节点调用合约超时，故写死获取质押节点的路径
  const nodeUrl =
    type == 'ETH'
      ? 'https://mainnet.infura.io/v3/ac295ebab93d4349b15ab8a63016c771'
      : 'https://bsc-dataseed.binance.org'
  const web3js = new Web3(new Web3.providers.HttpProvider(nodeUrl))
  var sFilAddress = type == 'ETH' ? SFIL_ADDRESS : SFIL_ADDRESSBSC;
  const Sfil = new web3js.eth.Contract(SFilAbi, sFilAddress)
  const applyEvent = await Sfil.getPastEvents(
    'ApplyStakingEvent', // 申请
    {
      filter: {
        receiver: [address],
      },
      fromBlock: 12645616,
      toBlock: 'latest',
    },
    function() {},
  )
  const stakingEvent = await Sfil.getPastEvents(
    'IssueStakingEvent', // 实际
    {
      filter: {
        receiver: [address],
      },
      fromBlock: 12645616,
      toBlock: 'latest',
    },
    function() {},
  )
  let obj = {}

  applyEvent.map(item => {
    if (item.returnValues.info) {
      obj[item.returnValues.sid] = JSON.parse(item.returnValues.info)
    }
  })
  const list = stakingEvent
    .filter(i => Boolean(obj[i.returnValues.sid]))
    .map(item => {
      return {
        sid: item.returnValues.sid,
        sfilNum: item.returnValues.sfilNum,
        detail: obj[item.returnValues.sid],
      }
    })
  return list
}
