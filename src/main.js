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

const baseSize = 75
// 设置 rem 函数
function setRem() {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  const scale = Math.min(document.documentElement.clientWidth, 500) / 750
  // 设置页面根节点字体大小
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function() {
  setRem()
}
