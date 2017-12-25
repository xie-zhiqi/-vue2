// 系统参数配置
// const version = 'v1'
const domain = process.env.NODE_ENV === 'production'
  ? 'api.xx.com'
  : process.env.NODE_ENV === 'release'
    ? 'api.r.xx.com'
    : 'api.d.xx.com'
export default {
  // headers: {
  //   Accept: `application/vnd.xx.${version}+json`
  // },
  url: `http://${domain}` // 接口地址
}
