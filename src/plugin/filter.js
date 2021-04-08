import Vue from 'vue'
import Web3 from 'web3'

import moment from 'moment'

let web3 = new Web3()
let { utils } = web3

Vue.filter('date', value => {
  return (value / 24 / 3600).toFixed(0)
})

Vue.filter('decimals', value => {
  value = value || '0'
  // return value
  // .toFixed(9)
  return parseFloat(utils.fromWei(value.toString())).toFixed(5)
})

Vue.filter('rate', value => {
  value = value * 100
  return utils.fromWei(value.toString())
})

Vue.filter('format', value => {
  return moment(value * 1000).format('MM-DD HH:mm')
})
