// 系统参数配置
// const version = 'v1'
const domain = process.env.NODE_ENV === 'production'
  ? 'api.xx.com'
  : process.env.NODE_ENV === 'testing'
    ? 'api.t.xx.com'
    : 'api.d.xx.com'

export default {
  // headers: {
  //   Accept: `application/vnd.xx.${version}+json`
  // },
  url: `http://${domain}` // 接口地址
}
