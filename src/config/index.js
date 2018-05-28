// 系统参数配置
let url = {
  production: 'https://api.prod.xx.com',
  release: 'https://api.release.xx.com',
  test: 'https://api.test.xx.com',
  development: 'http://api.dev.xx.com'
}
let baseURL
let env = process.env.NODE_ENV
switch (env) {
  case 'production':
    baseURL = url[env]
    break
  case 'release':
    baseURL = url[env]
    break
  case 'test':
    baseURL = url[env]
    break
  default:
    baseURL = url[env]
}

export default {
  url: url, // 接口地址
  baseURL: baseURL, // 基础地址
  // headers: {
  //   ContentType: 'application/x-www-form-urlencoded'
  // },
  timeout: 10000, // 请求超时
  version: '1.3.0' // 应用版本
}
