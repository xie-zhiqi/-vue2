let version = '2.0.0' // 系统版本
let baseAPI = {
  production: 'https://api.prod.xx.com',
  release: 'https://api.release.xx.com',
  test: 'https://api.test.xx.com',
  development: 'http://api.dev.xx.com'
}
let env = process.env.NODE_ENV
let baseURL = baseAPI[env]

// 系统参数配置
export default {
  timeout: 10000, // 请求超时
  version, // 系统版本
  baseAPI, // 所有环境接口对象
  env, // 当前环境
  baseURL // 当前环境接口地址
}
