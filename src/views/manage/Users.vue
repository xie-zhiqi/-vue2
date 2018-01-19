<template>
<div id="users">
  <ComForm ref="search" :c-items="searchItems" :c-model="searchModel" @on-submit="getUsers('search')" @on-reset="handleReset('search')" inline></ComForm>
  <div class="toolbar">
    <Button type="ghost" @click="handleCreate">Create</Button>
  </div>
  <Table border :loading="listLoading" :columns="columns" :data="data"></Table>
  <div class="footbar">
    <Page show-elevator show-total :current="page" :total="total" @on-change="handleChange"></Page>
  </div>
  <Modal v-model="modalProps.visible" :title="modalProps.title" footer-hide>
    <ComForm :key="modalProps.visible" ref="edit" :c-items="userItems" :c-model="userModel" :c-rules="userRules" :loading="formLoading" :btn-loading="btnLoading" :label-width="80" @on-submit="handleSubmit('edit')"></ComForm>
  </Modal>
</div>
</template>
<script>
import {
  getUserList,
  delUser,
  editUser
} from '@/services/manage/users'
import usersData from './UsersData'

export default {
  data() {
    // 自定义验证(年龄)
    const validAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('Age cannot be empty'))
      }
      // 模拟异步验证效果
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('Please enter a numeric value'))
        } else if (value < 18) {
          callback(new Error('Must be over 18 years of age'))
        } else {
          callback()
        }
      }, 500)
    }
    return {
      ...usersData,
      // 列表描述数据对象数组(用户)
      columns: [{
        title: 'Name',
        key: 'name'
      }, {
        title: 'Age',
        key: 'age'
      }, {
        title: 'Gender',
        key: 'gender',
        render: (h, params) => params.row.gender === '1' ? 'Male' : 'Female'
      }, {
        title: 'E-mail',
        key: 'email'
      }, {
        title: 'City',
        key: 'city'
      }, {
        title: 'Birth',
        key: 'birth'
      }, {
        title: 'Operation',
        key: 'operation',
        width: 150,
        align: 'center',
        render: (h, params) => h('div', [
          h('Button', {
            props: {
              type: 'primary',
              size: 'small'
            },
            style: {
              marginRight: '5px'
            },
            on: {
              click: () => {
                this.handleEdit(params.row)
              }
            }
          }, 'Edit'),
          h('Button', {
            props: {
              type: 'error',
              size: 'small'
            },
            on: {
              click: () => {
                this.handleDel(params.row)
              }
            }
          }, 'Delete')
        ])
      }],
      // 列表数据
      data: [],
      // 数据总数
      total: 0,
      // 分页页码
      page: 1,
      // 补丁总数
      patchTotal: 0,
      // 列表加载状态
      listLoading: false,
      // 表单加载状态
      formLoading: false,
      // 按钮加载状态
      btnLoading: false,
      // 模态框属性对象
      modalProps: {
        visible: false,
        title: ''
      },
      // 表单数据对象(搜索)
      searchModel: {
        name: ''
      },
      // 新增数据对象(用户)
      createModel: {},
      // 表单数据对象(用户)
      userModel: {
        name: '',
        age: '',
        gender: '',
        email: '',
        city: '',
        hobby: [],
        birth: '',
        desc: ''
      },
      // 表单验证对象(用户)
      userRules: {
        name: [{
          required: true,
          message: 'The name cannot be empty',
          trigger: 'blur'
        }],
        age: [{
          required: true,
          validator: validAge,
          trigger: 'blur'
        }],
        email: [{
          required: true,
          message: 'Mailbox cannot be empty',
          trigger: 'blur'
        }, {
          type: 'email',
          message: 'Incorrect email format',
          trigger: 'blur'
        }],
        city: [{
          required: true,
          message: 'Please select the city',
          trigger: 'change'
        }],
        birth: [{
          required: true,
          type: 'date',
          message: 'Please select the date',
          trigger: 'change'
        }],
        gender: [{
          required: true,
          message: 'Please select gender',
          trigger: 'change'
        }],
        hobby: [{
          required: true,
          type: 'array',
          min: 1,
          message: 'Choose at least one hobby',
          trigger: 'change'
        }, {
          type: 'array',
          max: 3,
          message: 'Choose three hobbies at best',
          trigger: 'change'
        }],
        desc: [{
          required: true,
          message: 'Please enter a personal introduction',
          trigger: 'blur'
        }, {
          type: 'string',
          min: 20,
          message: 'Introduce no less than 20 words',
          trigger: 'blur'
        }]
      }
    }
  },
  mounted() {
    this.createModel = Object.assign({}, this.userModel) // 复制初始表单数据对象
    this.getUsers()
  },
  methods: {
    // 获取用户列表
    getUsers(name) {
      this.listLoading = true
      const page = name ? 1 : this.page
      const para = {
        page: page,
        name: this.searchModel.name
      }
      // 模拟异步请求(获取列表)
      setTimeout(() => {
        getUserList(para).then(res => {
          const {
            total,
            users
          } = res.data
          if (total > 0 && users.length === 0) {
            this.getUsers(1)
          } else {
            this.page = page
            this.total = res.data.total
            this.data = res.data.users
            this.listLoading = false
          }
        })
      }, 500)
    },
    // 分页
    handleChange(page) {
      this.page = page
      this.getUsers()
    },
    // 删除
    handleDel(row) {
      this.$Modal.confirm({
        title: 'Delete',
        content: 'Are you sure delete this record?',
        okText: 'OK',
        cancelText: 'Cancel',
        onOk: () => {
          const para = {
            id: row.id
          }
          this.listLoading = true
          // 模拟异步请求(删除)
          setTimeout(() => {
            delUser(para).then(res => {
              this.$Message.success(res.msg)
              this.getUsers()
            })
          }, 500)
        }
      })
    },
    // 编辑界面
    handleEdit(row) {
      this.handleModal('edit')
      // 模拟异步请求(获取详情)
      setTimeout(() => {
        this.userModel = Object.assign({}, row)
        this.handlePatch() // 获取补丁数据
      }, 800)
    },
    // 新增界面
    handleCreate() {
      this.handleModal('create')
      this.handlePatch() // 获取补丁数据
    },
    // 显示模态框
    handleModal(name) {
      this.modalProps.title = name === 'edit' ? 'Edit' : 'Create'
      this.modalProps.visible = true
      this.formLoading = true // 表单加载状态
      this.userModel = Object.assign({}, this.createModel)
    },
    // 获取补丁数据
    handlePatch() {
      const city = [{
        label: 'BeiJing',
        value: 'beijing'
      }, {
        label: 'ShangHai',
        value: 'shanghai'
      }, {
        label: 'ShenZhen',
        value: 'shenzhen'
      }, {
        label: 'GuangZhou',
        value: 'guangzhou'
      }, {
        label: 'HangZhou',
        value: 'hangzhou'
      }, {
        label: 'NingBo',
        value: 'ningbo'
      }]
      const hobby = [{
        label: 'Eat',
        value: 'eat'
      }, {
        label: 'Sleep',
        value: 'sleep'
      }, {
        label: 'Run',
        value: 'run'
      }, {
        label: 'Movie',
        value: 'movie'
      }]
      const patch = ['city', 'hobby']
      this.userItems.filter(n => {
        patch.map(item => {
          if (n.prop === item) {
            if (n.option.length === 0) {
              if (item === 'city') {
                // 模拟异步请求(获取补丁数据-城市)
                setTimeout(() => {
                  n.option = city
                  this.patchFinish(patch.length) // 完成补丁数据
                }, 1200)
              }
              if (item === 'hobby') {
                // 模拟异步请求(获取补丁数据-爱好)
                setTimeout(() => {
                  n.option = hobby
                  this.patchFinish(patch.length) // 完成补丁数据
                }, 400)
              }
            } else {
              this.formLoading = false // 表单加载状态
            }
          }
        })
      })
    },
    // 完成补丁数据
    patchFinish(name) {
      this.patchTotal += 1
      if (this.patchTotal === name) {
        this.formLoading = false // 表单加载状态
      }
    },
    // 表单提交
    handleSubmit(name) {
      this.btnLoading = true
      const para = Object.assign({}, this.userModel)
      para.birth = para.birth ? this.$Utils.formatDate.format(new Date(para.birth), 'yyyy-MM-dd') : ''
      // 模拟异步请求(编辑 or 新增)
      setTimeout(() => {
        editUser(para).then(res => {
          this.$Message.success(res.msg)
          this.getUsers()
          this.btnLoading = false
          this.modalProps.visible = false
        })
      }, 500)
    },
    // 表单重置
    handleReset(name) {
      this.getUsers(name)
    }
  }
}
</script>
<style lang="scss" scoped>
#users {
    .toolbar {
        margin-bottom: 16px;
    }
    .footbar {
        margin: 16px 0;
    }
}
</style>
