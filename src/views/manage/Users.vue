<template>
<div id="users">
  <Card>
    <strong slot="title">
      <Icon type="ios-search-strong"></Icon> Search
    </strong>
    <ComForm ref="search" :items="searchItems" :model="search" @on-submit="getUsers('search')" @on-reset="getUsers('search')" inline></ComForm>
  </Card>
  <br>
  <Card>
    <strong slot="title">
      <Icon type="ios-list-outline"></Icon> User List
    </strong>
    <a href="#" slot="extra" @click.prevent="handleCreate"> Create </a>
    <Table border :loading="loading.list" :columns="columns" :data="data"></Table>
    <br>
    <Page show-elevator show-total :current="page" :total="total" @on-change="handleChange"></Page>
  </Card>
  <Modal v-model="modal.visible" :title="modal.title" footer-hide>
    <ComForm :key="modal.visible" ref="user" :items="userItems" :model="user" :rules="userRule" :loading="loading.form" :btn-loading="loading.btn" :label-width="80" @on-submit="handleSubmit('user')"></ComForm>
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
      // 模拟异步验证
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
        align: 'center',
        width: 160,
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
      // 加载状态
      loading: {
        list: false, // 列表
        form: false, // 表单
        btn: false // 按钮
      },
      // 模态框属性对象
      modal: {
        title: '',
        visible: false
      },
      // 表单数据对象(搜索)
      search: {
        name: ''
      },
      // 表单数据对象(用户)
      user: {
        name: '',
        age: '',
        gender: '',
        email: '',
        city: '',
        hobby: [],
        birth: '',
        desc: ''
      },
      // 初始表单数据对象(用户)
      initUser: {},
      // 表单验证对象(用户)
      userRule: {
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
          message: 'Please select the date',
          trigger: 'change',
          type: 'date'
        }],
        gender: [{
          required: true,
          message: 'Please select gender',
          trigger: 'change'
        }],
        hobby: [{
          required: true,
          message: 'Choose at least one hobby',
          trigger: 'change',
          type: 'array',
          min: 1
        }, {
          message: 'Choose three hobbies at best',
          trigger: 'change',
          type: 'array',
          max: 3
        }],
        desc: [{
          required: true,
          message: 'Please enter a personal introduction',
          trigger: 'blur'
        }, {
          message: 'Introduce no less than 20 words',
          trigger: 'blur',
          type: 'string',
          min: 20
        }]
      }
    }
  },
  mounted() {
    this.initUser = Object.assign({}, this.user) // 复制初始表单数据对象
    this.getUsers() // 获取用户列表
  },
  methods: {
    // 获取用户列表
    getUsers(name) {
      const page = name ? 1 : this.page
      const para = {
        page: page,
        name: this.search.name
      }
      this.loading.list = true
      // 模拟异步请求(查询)
      setTimeout(() => {
        getUserList(para).then(res => {
          const {
            total,
            users
          } = res.data
          if (total > 0 && users.length === 0) {
            this.getUsers('search')
          } else {
            this.page = page
            this.total = res.data.total
            this.data = res.data.users
            this.loading.list = false
          }
        }).catch(() => {
          this.loading.list = false
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
          this.loading.list = true
          // 模拟异步请求(删除)
          setTimeout(() => {
            delUser(para).then(res => {
              this.$Message.success(res.msg)
              this.getUsers()
            }).catch(() => {
              this.loading.list = false
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
        this.user = Object.assign({}, row)
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
      this.modal.title = name === 'edit' ? 'Edit' : 'Create'
      this.modal.visible = true
      this.loading.form = true // 表单加载状态
      this.user = Object.assign({}, this.initUser)
    },
    // 获取补丁数据
    handlePatch() {
      const patch = ['city', 'hobby']
      this.userItems.filter(n => {
        patch.map(item => {
          if (n.prop === item) {
            if (n.option.length === 0) {
              if (item === 'city') {
                // 模拟异步请求(获取补丁数据-城市)
                setTimeout(() => {
                  n.option = this.city
                  this.patchFinish(patch.length) // 完成补丁数据
                }, 1200)
              }
              if (item === 'hobby') {
                // 模拟异步请求(获取补丁数据-爱好)
                setTimeout(() => {
                  n.option = this.hobby
                  this.patchFinish(patch.length) // 完成补丁数据
                }, 400)
              }
            } else {
              this.loading.form = false // 表单加载状态
            }
          }
        })
      })
    },
    // 完成补丁数据
    patchFinish(name) {
      this.patchTotal += 1
      if (this.patchTotal === name) {
        this.loading.form = false // 表单加载状态
      }
    },
    // 表单提交
    handleSubmit(name) {
      const para = Object.assign({}, this.user)
      para.birth = para.birth ? this.$Utils.formatDate.format(new Date(para.birth), 'yyyy-MM-dd') : ''
      this.loading.btn = true
      // 模拟异步请求(编辑 or 新增)
      setTimeout(() => {
        editUser(para).then(res => {
          this.$Message.success(res.msg)
          this.getUsers()
          this.modal.visible = false
          this.loading.btn = false
        }).catch(() => {
          this.loading.btn = false
        })
      }, 500)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
