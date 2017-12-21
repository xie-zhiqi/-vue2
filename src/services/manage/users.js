import axios from '@/config/axios'

export const getUserList = params => axios.get('/user-list', {params: params}) // 列表
export const delUser = params => axios.post('/user-delete', params) // 删除
export const editUser = params => {
  const apiUrl = params.id
    ? '/user-edit' // 编辑
    : '/user-create' // 新增
  return axios.post(apiUrl, params)
}
