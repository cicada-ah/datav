import Vue from 'vue'
import Router from 'vue-router'
import gisHome from '@/pages/gisHome'
import gisData from '@/pages/gisData'
import index from '@/pages/index'
Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: "/gisHome",
      name: "gisHome",
      component: gisHome
    },
    {
      path: "/gisData",
      name: "gisData",
      component: gisData
    }
  ]
})
