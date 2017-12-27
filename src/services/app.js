import axios from '@/config/axios'

export const login = params => axios.post('/login', params) // 用户登录
export const getMenus = () => axios.get('/menu') // 获取菜单
export const modifyPwd = params => axios.post('/modify-pwd', params) // 修改密码
