import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'
import '@/plugin/filter.js'
Vue.config.productionTip = false
import '@/components/index'

import 'normalize.css'
import 'amfe-flexible'
import './assets/scss/common.scss'
import Vant from 'vant'
import 'vant/lib/index.css'

// import VConsole from 'vconsole'

// new VConsole()
// if (process.env.NODE_ENV === 'production') {
// }

Vue.use(Vant)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
}).$mount('#app')
