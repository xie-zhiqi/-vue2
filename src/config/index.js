// 系统参数配置
// const version = 'v1'
let host
switch (process.env.NODE_ENV) {
  case 'production':
    host = 'https://api.xx.com'
    break
  case 'release':
    host = 'https://api.r.xx.com'
    break
  case 'testing':
    host = 'https://api.t.xx.com'
    break
  default:
    host = 'http://api.d.xx.com'
}

export default {
  // headers: {
  //   Accept: `application/vnd.xx.${version}+json`
  // },
  baseURL: host, // 接口地址
  timeout: 60000, // 请求超时
  version: '1.0.0' // 应用版本
}
