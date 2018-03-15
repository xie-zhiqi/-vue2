<template>
<div id="users">
  <Card>
    <div slot="title">
      <Icon type="ios-search-strong"></Icon> Search
    </div>
    <ComForm inline ref="search" :items="searchItems" :model="search" @on-submit="handleDataList('search')" @on-reset="handleDataList('search')"></ComForm>
  </Card>
  <br>
  <Card>
    <div slot="title">
      <Icon type="ios-list-outline"></Icon> User List
    </div>
    <div slot="extra">
      <a href="#" @click.prevent="handleCreate"> Create </a>
    </div>
    <Table border :loading="loading.list" :columns="columns" :data="data"></Table>
    <br>
    <Page v-if="data.length" show-elevator show-total show-sizer placement="top" :current="page" :total="total" :page-size="pageSize" @on-change="handlePageChange" @on-page-size-change="handlePageSizeChange"></Page>
  </Card>
  <Modal v-model="modal.visible" :title="modal.title" footer-hide>
    <ComForm :key="modal.visible" ref="user" :items="userItems" :model="user" :rules="userRule" :loading="loading.form" :btn-loading="loading.btn" :label-width="80" @on-submit="handleSubmit('user')" @on-click="modal.visible = false" style="width: 360px;"></ComForm>
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
        render: (h, params) => h('span', params.row.gender === '1' ? 'Male' : 'Female')
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
          h('a', {
            style: {
              marginRight: '16px'
            },
            on: {
              click: () => {
                this.handleEdit(params.row)
              }
            }
          }, [h('Icon', {
            props: {
              type: 'edit',
              size: 16
            },
            style: {
              marginRight: '4px'
            }
          }), 'Edit']),
          h('Poptip', {
            props: {
              confirm: true,
              transfer: true,
              title: 'Are you sure delete this task?',
              'ok-text': 'yes',
              'cancel-text': 'no'
            },
            on: {
              'on-ok': () => {
                this.handleDel(params.row)
              }
            }
          }, [
            h('a', [h('Icon', {
              props: {
                type: 'trash-a',
                size: 16
              },
              style: {
                marginRight: '4px'
              }
            }), 'Delete'])
          ])
        ])
      }],
      // 列表数据
      data: [],
      // 数据总数
      total: 0,
      // 当页页码
      page: 1,
      // 每页条数
      pageSize: 10,
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
          message: 'Incorrect email format',
          trigger: 'blur',
          type: 'email'
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
    this.handleDataList() // 获取用户列表
  },
  methods: {
    // 获取用户列表
    handleDataList(type) {
      let page = type ? 1 : this.page
      let para = {
        name: this.search.name,
        page: page,
        pageSize: this.pageSize
      }
      this.loading.list = true
      // 模拟异步请求(查询)
      setTimeout(() => {
        getUserList(para).then(res => {
          let {
            users,
            rpage,
            total
          } = res.data
          this.data = users
          this.page = rpage ? res.data.rpage : page
          this.total = total
          this.loading.list = false
        }).catch(() => {
          this.loading.list = false
        })
      }, 500)
    },
    // 改变页码
    handlePageChange(page) {
      this.page = page
      this.handleDataList()
    },
    // 切换每页条数
    handlePageSizeChange(page) {
      this.pageSize = page
      this.handleDataList()
    },
    // 删除用户
    handleDel(row) {
      let para = {
        id: row.id
      }
      this.loading.list = true
      // 模拟异步请求(删除)
      setTimeout(() => {
        delUser(para).then(res => {
          this.$Message.success(res.msg)
          this.handleDataList()
        }).catch(() => {
          this.loading.list = false
        })
      }, 500)
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
      this.handleModal() // 显示模态框
      this.handlePatch() // 获取补丁数据
    },
    // 显示模态框
    handleModal(name) {
      this.loading.form = true // 表单加载状态
      this.modal = {
        title: 'Edit',
        visible: true
      }
      if (!name) {
        this.modal.title = 'Create'
        this.user = Object.assign({}, this.initUser)
      }
    },
    // 获取补丁数据
    handlePatch() {
      const patch = this.userItems.filter(n => n.option && n.option.length === 0)
      this.patchTotal = patch.length === 0 ? this.patchTotal : 0
      if (patch.length === 0) {
        this.loading.form = false
        return false
      }
      patch.map(val => {
        if (val.prop === 'city') {
          // 模拟异步请求(获取补丁数据-城市)
          setTimeout(() => {
            val.option = this.city
            this.handlePatchState(patch.length) // 补丁状态
          }, 800)
        }
        if (val.prop === 'hobby') {
          // 模拟异步请求(获取补丁数据-爱好)
          setTimeout(() => {
            val.option = this.hobby
            this.handlePatchState(patch.length) // 补丁状态
          }, 400)
        }
      })
    },
    // 补丁完成状态
    handlePatchState(state) {
      this.patchTotal += 1
      if (this.patchTotal === state) {
        this.loading.form = false // 表单加载状态
      }
    },
    // 表单提交
    handleSubmit(name) {
      let para = Object.assign({}, this.user)
      para = {
        ...para,
        birth: para.birth ? this.$Utils.formatDate.format(new Date(para.birth), 'yyyy-MM-dd') : ''
      }
      this.loading.btn = true
      // 模拟异步请求(编辑 or 新增)
      setTimeout(() => {
        editUser(para).then(res => {
          this.$Message.success(res.msg)
          this.handleDataList()
          this.loading.btn = false
          this.modal.visible = false
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
