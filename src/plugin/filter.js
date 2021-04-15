import Vue from 'vue'
import Web3 from 'web3'
import BigNumber from 'bignumber.js'
import moment from 'moment'

console.log(new BigNumber('1e18'))

let web3 = new Web3()
let { utils } = web3

Vue.filter('date', value => {
  return (value / 24 / 3600).toFixed(0)
})

Vue.filter('decimals', value => {
  value = value || '0'
  return parseFloat(utils.fromWei(value)).toFixed(5)
})

Vue.filter('decimals1', value => {
  console.log(typeof value, value)
  if (typeof value == 'object') {
  }
  console.log(typeof value, value, new BigNumber(value))
  value = value || '0'
  return new BigNumber(value).div(new BigNumber(1e18))
  // return value
  // .toFixed(9)
  return parseFloat(utils.fromWei(new BigNumber(value))).toFixed(5)
})

Vue.filter('rate', value => {
  value = value * 100
  return utils.fromWei(value.toString())
})

Vue.filter('format', value => {
  return moment(value * 1000).format('MM-DD HH:mm')
})
