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
export const CHAINIDBSC = '0x61'
// 合约地址 官方测试链
export const CROSSLEND_ADDRESSBSC = '0x1A0dD4C57e9af18FF52Cd28ef66d5ecBDFDd5433'

export const CRFI_ADDRESSBSC = '0x099AC96D0602E5fa3BF4F91Bc254D145c2ef7A64'

export const CFIL_ADDRESSBSC = '0x546c524068217e8f2b0C8C019736a1abb90A7159'

export const SFIL_ADDRESSBSC = '0x6F8EE8F6AA4B7cE01A3C2E1e21C4887A2c0b07fD'

export const API_HOSTBSC = 'http://104.219.250.197:17001'

// 主网
export const CHAINID = '0x1'
// 合约地址 官方测试链
export const CROSSLEND_ADDRESS = '0x9A1d5103Ef765a3EdE26d5757353DF2Af0dd3856'

export const CRFI_ADDRESS = '0x642C75E5E61b3169Ed40644E14260b6f5a366d65'

export const CFIL_ADDRESS = '0x0f91445A15a1353A099E742f9B51b1b41C2CbFe8'

export const SFIL_ADDRESS = '0x642C75E5E61b3169Ed40644E14260b6f5a366d65'

export const API_HOST = 'https://api.crossfimain.com'

// 合约地址 官方测试链 R
// export const CHAINID = '0x3'
// export const CROSSLEND_ADDRESS = '0x422066b2F51bD090BAbBb499B01dB79A8F3B335a'

// export const CRFI_ADDRESS = '0x666bdb9a79ca3565a4b712655567066866791649'

// export const CFIL_ADDRESS = '0x23262fb2c1c8ca008608035fa5821fb7b06c43c3'

// export const SFIL_ADDRESS = '0xb3b2c4987d0f5888d38db03bcdd9beb8f8d295b8'

// export const API_HOST = 'https://api.crossfimain.com'
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
