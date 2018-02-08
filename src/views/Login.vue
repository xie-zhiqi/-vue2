<template>
<div id="main">
  <ComError></ComError>
  <!-- ComError -->
  <div id="login">
    <div class="logo-info">
      <img class="logo" src="../assets/logo.png">
      <p class="name">XX管理系统 <br> <span>http://www.xx.com/</span></p>
    </div>
    <!-- .logo-info -->
    <Form ref="login" :model="login" :rules="loginRule" @keyup.enter.native="handleLogin('login')">
      <FormItem v-for="(item, index) in loginItems" :key="index" :prop="item.prop">
        <Input :type="item.type" v-model="login[item.prop]" :placeholder="item.placeholder"></Input>
      </FormItem>
      <FormItem>
        <Button type="primary" long :loading="this.$store.state.app.loading" @click="handleLogin('login')">Sign in</Button>
      </FormItem>
    </Form>
    <!-- Form -->
    <p class="prompt">
      <span class="span">Username：admin</span>
      <span class="span">Password：wasd@007</span>
    </p>
    <!-- .prompt -->
  </div>
</div>
</template>
<script>
import ComError from './common/partials/Error'
import {
  login
} from '@/services/app'

export default {
  name: 'login',
  components: {
    ComError
  },
  data() {
    return {
      // 表单元素数组
      loginItems: [{
        prop: 'user',
        placeholder: 'Username'
      }, {
        prop: 'pwd',
        placeholder: 'Password',
        type: 'password'
      }],
      // 表单数据对象
      login: {
        user: 'admin',
        pwd: 'wasd@007'
      },
      // 表单验证规则
      loginRule: {
        user: [{
          required: true,
          message: 'Please fill in the username',
          trigger: 'blur'
        }],
        pwd: [{
          required: true,
          message: 'Please fill in the password',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleLogin(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 请求参数
          let para = Object.assign({}, this.login)
          this.$store.commit('LOADING', true)
          // 模拟异步请求
          setTimeout(() => {
            login(para).then(res => {
              if (res) {
                localStorage.setItem('user', JSON.stringify(res.data))
                // 配置用户TOKEN
                // this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
                // 获取菜单信息
                this.$store.dispatch('handleMenu')
              }
              this.$store.commit('LOADING', false)
            }).catch(() => {
              this.$store.commit('LOADING', false)
            })
          }, 800)
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
#login {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 360px;
    height: 360px;
    margin: -180px 0 0 -180px;
    padding: 36px;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
    .logo-info {
        height: 64px;
        margin-bottom: 22px;
        text-align: center;
        .logo {
            width: 64px;
            height: 64px;
            margin-right: 10px;
        }
        .name {
            position: relative;
            bottom: 14px;
            display: inline-block;
            text-align: left;
            font-size: 18px;
            line-height: 20px;
        }
        span {
            font-size: 12px;
        }
    }
    .prompt {
        text-align: center;
        .span {
            margin: 0 10px;
            color: #ccc;
        }
    }
}
</style>
