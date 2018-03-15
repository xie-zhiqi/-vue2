export default(Mock, qs) => {
  let data = Mock.mock({
    'users|87': [
      {
        'id|+1': 1,
        'name': '@name',
        'age|18-50': 1,
        'gender|1': [
          '0', '1'
        ],
        'email': '@email',
        'city|1': [
          'beijing',
          'shanghai',
          'shenzhen',
          'guangzhou',
          'hangzhou',
          'ningbo'
        ],
        'birth': '@date',
        'hobby': [
          'eat', 'sleep'
        ],
        'desc': '@paragraph'
      }
    ]
  })
  let Users = data.users

  // 用户列表
  Mock.mock(/\/user-list/, config => {
    let {page, pageSize, name} = qs.parse(config.url.split('?')[1])
    let mockUsers = Users.filter(u => {
      if (name && u.name.indexOf(name) === -1) {
        return false
      }
      return true
    })
    let total = mockUsers.length
    let pageMax = Math.ceil(total / pageSize)
    page = page > pageMax
      ? 1
      : page
    mockUsers = mockUsers.filter((u, index) => index < pageSize * page && index >= pageSize * (page - 1))
    return {
      code: 200,
      msg: 'get users success',
      data: {
        total: total,
        rpage: parseInt(page),
        users: mockUsers
      }
    }
  })

  // 删除用户
  Mock.mock(/\/user-delete/, config => {
    let {id} = qs.parse(config.body)
    Users = Users.filter(u => u.id !== parseInt(id))
    return {code: 200, msg: 'delete success'}
  })

  // 编辑用户
  Mock.mock(/\/user-edit/, config => {
    let {
      id,
      name,
      age,
      gender,
      email,
      city,
      hobby,
      birth,
      desc
    } = qs.parse(config.body)
    Users.some(u => {
      if (u.id === parseInt(id)) {
        u.name = name
        u.age = parseInt(age)
        u.gender = gender
        u.email = email
        u.city = city
        u.hobby = hobby
        u.birth = birth
        u.desc = desc
        return true
      }
    })
    return {code: 200, msg: 'update success'}
  })

  // 新增用户
  Mock.mock(/\/user-create/, config => {
    let {
      name,
      age,
      gender,
      email,
      city,
      hobby,
      birth,
      desc
    } = qs.parse(config.body)
    Users.unshift({
      id: Users.length + 1,
      name: name,
      age: parseInt(age),
      gender: gender,
      email: email,
      city: city,
      hobby: hobby,
      birth: birth,
      desc: desc
    })
    return {code: 200, msg: 'create success'}
  })
}
