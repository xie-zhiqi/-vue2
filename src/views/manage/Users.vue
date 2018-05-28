<template>
<div id="users">
  <Search :elem="searchElem" :model="search" :btn-loading="list.loading" :label-width="60" @on-search="handleGetList"></Search>
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
    <div v-if="toolbar.visible" class="toolbar">
      <Button type="primary" @click="handleBatchDelete()">Delete</Button>
      <span class="number">Selected {{ toolbar.number }} items</span>
    </div>
    <!-- .toolbar -->
    <ComTablePage ref="list" :columns="columns" :loading="list.loading" :data="list.data" :total="list.total" @on-page-change="handleGetList" @on-selection-change="handleSelectionChange"></ComTablePage>
    <!-- ComTablePage -->
  </Card>
  <Edit ref="edit" :model="edit" @on-update="handleGetList"></Edit>
  <!-- Edit -->
</div>
</template>
<script>
import {
  delUser,
  batchDelUser,
  getUserList
} from '@/services/manage/users'
import Search from '@/views/components/Search'
import Edit from './UserEdit'
export default {
  name: 'Users',
  components: {
    Edit,
    Search
  },
  data() {
    return {
      // 工具条(批量删除)
      toolbar: {
        ids: [], // ID数组
        visible: false, // 按钮可视状态
        number: 0 // 选择数量
      },
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
      // 表单元素(搜索)
      searchElem: [{
        label: 'Name',
        prop: 'name',
        placeholder: 'Search Name',
        icon: 'ios-search-strong'
      }, {
        labelWidth: 4,
        button: [{
          name: 'submit',
          type: 'primary',
          text: 'Search'
        }, {
          name: 'reset',
          type: 'ghost',
          text: 'Reset'
        }]
      }],
      // 列表属性
      list: {
        data: [], // 结构化数据
        total: 0, // 数据总数
        loading: false // 加载状态
      },
      // 表格列的配置描述(用户)
      columns: [{
        type: 'selection',
        width: 60,
        align: 'center'
      }, {
        title: 'Name',
        key: 'name',
        minWidth: 120
      }, {
        title: 'Age',
        key: 'age',
        minWidth: 80
      }, {
        title: 'Gender',
        key: 'gender',
        minWidth: 80,
        render: (h, params) => h('span', params.row.gender === 1 ? 'Male' : 'Female')
      }, {
        title: 'E-mail',
        key: 'email',
        minWidth: 120
      }, {
        title: 'City',
        key: 'city',
        minWidth: 100,
        render: (h, params) => {
          let city = params.row.city
          for (let key in city) {
            city = city[key]
          }
          return h('span', city)
        }
      }, {
        title: 'Birth',
        key: 'birth',
        minWidth: 100
      }, {
        title: 'Hobby',
        key: 'hobby',
        minWidth: 100,
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
        minWidth: 150,
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
    this.init = Object.assign({}, this.edit) // 复制初始表单数据
    this.handleGetList() // 获取列表数据
  },
  methods: {
    /**
     * 在多选模式下有效，只要选中项发生变化时就会触发
     * @param  {array} selection 已选项数据
     */
    handleSelectionChange(selection) {
      let ids = []
      let num = selection.length
      let _true = true
      for (var i = 0; i < selection.length; i++) {
        ids.push(selection[i]['id'])
      }
      this.toolbar = {
        ids: ids,
        number: num,
        visible: num ? _true : false
      }
    },
    // 批量删除用户
    handleBatchDelete() {
      this.list.loading = true
      let para = {
        ids: this.toolbar.ids.join(',')
      }
      // 模拟异步请求(批量删除)
      setTimeout(() => {
        batchDelUser(para).then(res => {
          this.$Message.success(res.error.msg)
          this.handleGetList()
        }).catch(() => {
          this.list.loading = false
        })
      }, 500)
    },
    /**
     * 获取用户列表
     * @param  {string} type 是否使用搜索, 默认值, undefined
     */
    handleGetList(type) {
      this.$refs['list'].selectAll(false) // 取消全选
      this.list.loading = true // 列表加载状态
      let page = this.$refs['list'].getPage(type) // 获取分页信息
      // 请求参数(搜索)
      let para = this.search
      para = {
        ...para,
        pagePara: {
          current: page.current,
          pageSize: page.pageSize
        }
      }
      // 模拟异步请求(搜索)
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
<style lang="postcss" scoped>
.toolbar {
    margin-bottom: 16px;
}
</style>
