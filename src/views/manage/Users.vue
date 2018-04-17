<template>
<div id="users">
  <Search :model="search" :btn-loading="list.loading" @on-search="handleGetList"></Search>
  <!-- Search -->
  <Card>
    <div slot="title">
      <Icon type="ios-list-outline"></Icon> User List
    </div>
    <!-- title -->
    <div slot="extra">
      <a href="#" @click.prevent="handleCreate('edit')"> Create </a>
    </div>
    <!-- extra -->
    <ComTablePage ref="list" :columns="columns" :loading="list.loading" :data="list.data" :total="list.total" @on-page-change="handleGetList"></ComTablePage>
    <!-- ComTablePage -->
  </Card>
  <Edit ref="edit" :model="edit" @on-update="handleGetList"></Edit>
  <!-- Edit -->
</div>
</template>
<script>
import {
  delUser,
  getUserList
} from '@/services/manage/users'
import Edit from './UserEdit'
import Search from './UserSearch'
export default {
  name: 'Users',
  components: {
    Edit,
    Search
  },
  data() {
    return {
      // 表单数据(用户)
      edit: {
        name: '',
        age: '',
        gender: '',
        email: '',
        city: '',
        hobby: [],
        birth: '',
        desc: ''
      },
      // 初始表单数据(用户)
      init: '',
      // 表单数据(搜索)
      search: {
        name: ''
      },
      // 列表属性
      list: {
        data: [], // 结构化数据
        total: 0, // 数据总数
        loading: false // 加载状态
      },
      // 表格列的配置描述(用户)
      columns: [{
        title: 'Name',
        key: 'name'
      }, {
        title: 'Age',
        key: 'age'
      }, {
        title: 'Gender',
        key: 'gender',
        render: (h, params) => h('span', params.row.gender === 1 ? 'Male' : 'Female')
      }, {
        title: 'E-mail',
        key: 'email'
      }, {
        title: 'City',
        key: 'city',
        render: (h, params) => {
          let city = params.row.city
          for (let key in city) {
            city = city[key]
          }
          return h('span', city)
        }
      }, {
        title: 'Birth',
        key: 'birth'
      }, {
        title: 'Hobby',
        key: 'hobby',
        render: (h, params) => {
          let hobby = params.row.hobby
          let hobbys = []
          for (let key in hobby) {
            hobbys.unshift(hobby[key])
          }
          return h('span', hobbys.join())
        }
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
                this.handleDelete(params.row)
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
      }]
    }
  },
  mounted() {
    this.init = Object.assign({}, this.edit) // 复制初始表单数据对象
    this.handleGetList() // 获取列表数据
  },
  methods: {
    /**
     * 获取用户列表
     * @param  {boolean} type 是否使用搜索, 默认值, undefined
     */
    handleGetList(type) {
      this.list.loading = true
      let page = this.$refs['list'].getPage()
      if (type) {
        page.current = 1
        this.$refs['list'].resetCurrent()
      }
      let para = this.search
      // 请求参数
      para = {
        ...para,
        pagePara: {
          current: page.current,
          pageSize: page.pageSize
        }
      }
      // 模拟异步请求(查询)
      setTimeout(() => {
        getUserList(para).then(res => {
          let {
            users,
            total
          } = res.data
          this.list = {
            data: users,
            total: total,
            loading: false
          }
        }).catch(() => {
          this.list.loading = false
        })
      }, 500)
    },
    /**
     * 删除用户
     * @param  {object} row 当前行数据
     */
    handleDelete(row) {
      this.list.loading = true
      let para = {
        id: row.id
      }
      // 模拟异步请求(删除)
      setTimeout(() => {
        delUser(para).then(res => {
          this.$Message.success(res.error.msg)
          this.handleGetList()
        }).catch(() => {
          this.list.loading = false
        })
      }, 500)
    },
    /**
     * 编辑界面
     * @param  {object} row 当前行数据
     */
    handleEdit(row) {
      this.$refs['edit'].showModal('edit')
      // 模拟异步请求(获取详情)
      setTimeout(() => {
        let edit = Object.assign({}, row)
        let birth = row.birth ? this.$Utils.formatDate.parse(row.birth, 'yyyy-MM-dd') : ''
        let city
        for (let key in row.city) {
          city = key
        }
        let hobby = []
        for (let key in row.hobby) {
          hobby.push(key)
        }
        this.edit = {
          ...edit,
          city,
          birth,
          hobby
        }
        this.$refs['edit'].getPatch() // 获取补丁数据
      }, 800)
    },
    // 新增界面
    handleCreate(name) {
      this.edit = Object.assign({}, this.init)
      this.$refs[name].showModal() // 显示模态框
      this.$refs[name].getPatch() // 获取补丁数据
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
