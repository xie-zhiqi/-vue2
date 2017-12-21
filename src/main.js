// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// mock 数据引入
import Mock from './mock'
// vue-axios 插件引入
import VueAxios from 'vue-axios'
import axios from './config/axios'
// iView 完整引入
import iView from 'iview'
import 'iview/dist/styles/iview.css'
// 自定义组件引入
import vCom from './components'

Mock()
Vue.use(VueAxios, axios)
Vue.use(iView)
Vue.use(vCom)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  // el: '#app',
  router,
  store,
  render: h => h(App)
  // template: '<App/>',
  // components: {
  //   App
  // }
}).$mount('#app')