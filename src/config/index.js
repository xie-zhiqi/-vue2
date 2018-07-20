let baseAPI = {
  production: 'https://api.prod.xx.com',
  release: 'https://api.release.xx.com',
  test: 'https://api.test.xx.com',
  development: 'http://api.dev.xx.com'
}
let baseURL
let env = process.env.NODE_ENV
switch (env) {
  case 'production':
    baseURL = baseAPI[env]
    break
  case 'release':
    baseURL = baseAPI[env]
    break
  case 'test':
    baseURL = baseAPI[env]
    break
  default:
    baseURL = baseAPI[env]
}

// 系统参数配置
export default {
  env: env, // 当前环境
  baseAPI: baseAPI, // API 接口
  baseURL: baseURL, // API 地址
  timeout: 10000, // 请求超时
  version: '1.3.0' // 应用版本
}
