// 系统配置参数
const version = 'v1'
const domain = process.env.NODE_ENV === 'production'
  ? 'api.xx.com'
  : process.env.NODE_ENV === 'release'
    ? 'api.r.xx.com'
    : 'api.d.xx.com'
export default {
  headers: {
    Accept: `application/vnd.xx.${version}+json`
  },
  url: `http://${domain}/backend/`, // 接口地址
  limit: 10 // 每页显示条目个数
}
