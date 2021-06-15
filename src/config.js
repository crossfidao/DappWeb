/**
 * 配置文件
 */

// 合约地址
export const CROSSLEND_ADDRESS = '0x7e27e8f3aa4bda26502c38ccd28a4838aeca7966'

export const CRFI_ADDRESS = '0x1ccbf9217c06a641e88059578b5bf984e21f11ff'

export const CFIL_ADDRESS = '0x7117983d3be99e1cbe296dfeaf034c91db3cd02b'

export const SFIL_ADDRESS = '0x97c4cf2c2318171aa9c075bf66b27be57321aeee'

export const API_HOST = 'https://clserver.mm.comeonbtc.com:8443'

import Contract from '@/plugin/eth'
import { CRFIAbi } from '@/plugin/CRFI.js'
import { CFilAbi } from '@/plugin/CFil.js'
import { SFilAbi } from '@/plugin/SFil.js'
import { crossLendAbi } from '@/plugin/crossLend.js'

export const crossLend = new Contract({
  address: CROSSLEND_ADDRESS,
  abi: crossLendAbi,
})

export const utils = crossLend.web3.utils

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
