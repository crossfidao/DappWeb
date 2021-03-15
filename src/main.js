import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import 'amfe-flexible'
import './assets/scss/common.scss'
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Element)

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
