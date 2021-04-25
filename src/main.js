import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'
import Contract from '@/plugin/eth'
import { abi } from '@/plugin/abi'
import { coinAbi } from '@/plugin/coinAbi'
import '@/plugin/filter.js'
Vue.config.productionTip = false
import '@/components/index'

import 'amfe-flexible'
import './assets/scss/common.scss'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

let corsslend = new Contract({
  address: '0x75ed624ada7c9c810b10ec633e60c715f3c723fb',
  abi,
})

let utils = corsslend.web3.utils

Vue.prototype.$corsslend = corsslend
Vue.prototype.$utils = utils

Vue.use(Element)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
