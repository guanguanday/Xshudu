// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import router from '@/router/index'
import store from '@/vuex/index'
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.use(VueRouter)
Vue.use(Vuex)
Vue.use(Mint)

FastClick.attach(document.body)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app-box')
