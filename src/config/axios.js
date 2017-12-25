import axios from 'axios'
import qs from 'qs'
import {Message} from 'iview'
import config from '@/config'
import router from '@/router'
import store from '@/store'

// 配置默认接口地址
axios.defaults.baseURL = config.url
// 配置默认请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 配置默认请求超时
axios.defaults.timeout = 12000
// 版本控制
// axios.defaults.headers.post['Accept'] = config.headers.Accept
// axios.defaults.headers.common['Accept'] = config.headers.Accept

// 获取用户信息
// const user = JSON.parse(localStorage.getItem('user'))
// if (user) {
// 配置默认TOKEN
// axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
// }

// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(config => {
  // 在发送请求之前做参数序列化
  config.data = qs.stringify(config.data)
  return config
}, error => {
  return Promise.reject(error)
})

// TOKEN失效路由重定向(添加响应拦截器)
axios.interceptors.response.use(response => {
  console.log(response.data)
  // 用响应数据做路由重定向
  const {code, msg} = response.data
  if (code === 200) {
    return response.data
  }
  if (code > 5090 && code < 5095) {
    router.push('/login') // 路由跳转登录页
    store.commit('MENU_RESET') // 重置菜单
  } else {
    Message.error(msg)
  }
}, error => {
  console.log(`Error Status: ${error.response.status}`)
  return Promise.reject(error)
})

export default axios
