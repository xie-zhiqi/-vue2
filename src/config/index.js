let version = '2.0.0' // 系统版本
let baseAPI = {
  development: 'http://dev.api.xx.com',
  test: 'https://test.api.xx.com',
  release: 'https://release.api.xx.com',
  production: 'https://prod.api.xx.com'
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
