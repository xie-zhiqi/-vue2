export default(Mock, qs) => {
  // 用户登录
  Mock.mock(/\/login/, config => {
    const para = qs.parse(config.body)
    if (para.user === 'admin' && para.pwd === 'wasd@007') {
      return {
        code: 200,
        msg: 'login success',
        data: {
          user_id: 1,
          real_name: 'Admin'
        }
      }
    }
    return {code: 500, msg: 'Your account username or password is incorrect'}
  })

  // 菜单获取
  Mock.mock(/\/menu/, {
    code: 200,
    msg: 'get menu success',
    data: [
      {
        name: 'Dashboard',
        path: '/'
      }, {
        name: 'Hello',
        path: '/hello',
        children: [
          {
            name: 'HelloWorld',
            path: '/hello/hello-world'
          }
        ]
      }, {
        name: 'Manage',
        path: '/manage',
        children: [
          {
            name: 'Users',
            path: '/manage/users'
          }
        ]
      }
    ]
  })

  // 密码修改
  Mock.mock(/\/modify-pwd/, config => {
    const para = qs.parse(config.body)
    if (para.oldPwd === 'wasd@007') {
      return {code: 200, msg: 'password modify success'}
    }
    return {code: 500, msg: 'Your old password is incorrect'}
  })
}
