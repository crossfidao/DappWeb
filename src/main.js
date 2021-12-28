import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n/i18n'
import '@/plugin/filter.js'
import '@/components/index'
import Api from './api'
import 'normalize.css'
import 'amfe-flexible'
import './assets/scss/common.scss'
import Vant from 'vant'
import 'vant/lib/index.css'
// import VConsole from 'vconsole'
// new VConsole()
// if (process.env.NODE_ENV === 'production') {
// }
// 引入echarts核心模块
import * as echarts from 'echarts/core'
// 引入图表
import { BarChart, GaugeChart } from 'echarts/charts'
// 引入提示框，标题，直角坐标系等组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
} from 'echarts/components'
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers'
// 注册组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  GaugeChart,
  CanvasRenderer,
])
// 将echarts挂载到Vue原型上
Vue.prototype.$echarts = echarts
// import echarts from 'echarts'
Vue.config.productionTip = false
Vue.use(Api)
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
