import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import echarts from 'echarts'
import BaiduMap from 'vue-baidu-map'
import 'normalize.css'
import iView from 'iview'
import 'iview/dist/styles/iview.css'
import VueParticles from "vue-particles"

import "./assets/iconfont/iconfont.css"
import store from "./store"
import i18n from "./lang"
import VueI18n from "vue-i18n"
require('echarts-wordcloud')
// import 'echarts/extension/bmap/bmap'

Vue.use(iView)
Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
Vue.use(BaiduMap, {
  ak: 'utMtesGS1qABZVrQXwjU0TA2EtqyMVdS'
})
Vue.use(VueI18n, {
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueParticles)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
