<template>
<div id="sys-header">
  <div class="logo-info">
    <img class="logo" src="../../../assets/logo.png">
    <p class="name">XX管理系统 <br> <span class="sub">http://www.xx.com/</span></p>
  </div>
  <!-- .logo-info -->
  <div class="login-info">
    <Dropdown trigger="click" @on-click="handleDropdown">
      <strong class="user">
        <Avatar style="background-color: #3c3" icon="person" size="small"></Avatar>
        {{ userName }}
      </strong>
      <DropdownMenu slot="list">
        <DropdownItem v-for="(item, index) in dropdownItems" :key="index" :name="item.name">
          <Icon :type="item.icon"></Icon> {{ item.label }}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  </div>
  <!-- .login-info -->
  <ModifyPwd ref="modifyPwd"></ModifyPwd>
  <!-- ModifyPwd -->
</div>
</template>
<script>
import ModifyPwd from '@/views/common/pages/ModifyPwd'

export default {
  name: 'SysHeader',
  components: {
    ModifyPwd
  },
  data() {
    return {
      // 用户名
      userName: '',
      // 下拉菜单元素数组
      dropdownItems: [{
        label: 'Modify Pwd',
        name: 'modifyPwd',
        icon: 'unlocked'
      }, {
        label: 'Sign out',
        name: 'signout',
        icon: 'log-out'
      }]
    }
  },
  mounted() {
    // 获取用户信息
    const user = JSON.parse(localStorage.getItem('user'))
    this.userName = user.real_name || 'Null'
  },
  methods: {
    // 下拉菜单项
    handleDropdown(name) {
      // 修改密码
      if (name === 'modifyPwd') {
        this.$refs[name].showModal()
      }
      // 退出系统
      if (name === 'signout') {
        this.$Modal.confirm({
          title: 'Warning',
          content: 'Do you confirm the exit system?',
          okText: 'OK',
          cancelText: 'Cancel',
          onOk: () => {
            this.$router.push('/login') // 路由跳转登录页
            this.$store.commit('MENU_RESET') // 重置菜单
          }
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
#sys-header {
    overflow: hidden;
    color: #fff;
    background-color: #3f525a;
    .logo-info {
        float: left;
        width: 240px;
        .logo {
            float: left;
            width: 40px;
            height: 40px;
            margin: 10px 16px 10px 24px;
        }
        .name {
            float: left;
            width: 160px;
            margin: 12px 0 6px;
            font-size: 18px;
            line-height: 20px;
        }
        .sub {
            font-size: 12px;
        }
    }
    .login-info {
        float: right;
        height: 60px;
        padding-right: 20px;
        line-height: 60px;
        .user {
            display: block;
            margin-left: 8px;
            cursor: pointer;
            color: #fff;
        }
    }
}
</style>
