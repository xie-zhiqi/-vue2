import axios from 'axios'
import qs from 'qs'
import {Message} from 'iview'
import config from '@/config'
import router from '@/router'
import store from '@/store'

// 配置默认接口地址
axios.defaults.baseURL = config.url
// 配置默认请求超时
axios.defaults.timeout = config.timeout
// 配置默认跨域访问凭证(Cookie)
// axios.defaults.withCredentials = true
// 配置默认请求头
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 配置版本号
// axios.defaults.headers.post['Accept'] = config.headers.Accept
// axios.defaults.headers.common['Accept'] = config.headers.Accept

// 获取用户TOKEN
// const user = JSON.parse(localStorage.getItem('user'))
// if (user) {
// 配置用户TOKEN
// axios.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
// }

// 添加请求拦截器
axios.interceptors.request.use(config => {
  store.commit('RES_ERROR', '') // 清空响应错误数据
  // 参数序列化
  config.data = qs.stringify(config.data)
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
  console.log(response.data)
  const {code} = response.data
  if (code === 200) {
    return response.data
  }
  // TOKEN失效
  if (code === 5000) {
    router.push('/login') // 路由跳转登录页
    store.commit('MENU_RESET') // 重置菜单
  } else {
    // store.commit('RES_ERROR', response) // 响应错误数据
    Message.error(response.data.msg)
  }
}, error => {
  const {status, timeout} = error.request
  if (status === 0 && timeout === config.timeout) {
    Message.error({content: '请求超时 或 服务器断开连接 请检查网络状态', duration: 8})
  } else {
    store.commit('RES_ERROR', error.response) // 响应错误数据
  }
  return Promise.reject(error)
})

export default axios
