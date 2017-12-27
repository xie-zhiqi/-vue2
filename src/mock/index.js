import Mock from 'mockjs'
import qs from 'qs'
import app from './app'
import users from './users'

export default() => {
  // 登录，菜单，改密
  app(Mock, qs)
  // 用户管理
  users(Mock, qs)
}
