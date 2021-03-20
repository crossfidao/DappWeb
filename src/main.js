import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'

Vue.config.productionTip = false

import 'amfe-flexible'
import './assets/scss/common.scss'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import BaseHeader from '@/components/base/BaseHeader.vue'
console.log(BaseHeader)
Vue.component('BaseHeader', BaseHeader)
// Vue.use(BaseHeader, BaseHeader)
Vue.use(Element)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
