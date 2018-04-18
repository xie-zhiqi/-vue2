<template>
<div id="main">
  <div id="login">
    <div class="logo-info">
      <img class="logo" src="../assets/logo.png" alt="logo">
      <p class="name">企业级中后台模板 <br>
        <span class="sub">基于 Vue.js 的开源模板</span>
      </p>
    </div>
    <!-- .logo-info -->
    <ComForm ref="login" :items="loginItems" :model="login" :rules="loginRule" :btn-loading="this.$store.state.app.loading" @on-submit="handleLogin('login')"></ComForm>
    <!-- ComForm -->
    <p class="version">Version: {{ version }}</p>
    <!-- .version -->
  </div>
  <!-- #login -->
  <EnvBase></EnvBase>
  <!-- EnvBase -->
  <SysError></SysError>
  <!-- SysError -->
</div>
</template>
<script>
import config from '@/config'
import ax from '@/config/axios'
import {
  login
} from '@/services/app'
import EnvBase from './common/partials/EnvBase'
import SysError from './common/partials/Error'
export default {
  name: 'Login',
  components: {
    EnvBase,
    SysError
  },
  data: () => ({
    // 表单元素数组(登录)
    loginItems: [{
      prop: 'user',
      placeholder: 'Username'
    }, {
      prop: 'pwd',
      placeholder: 'Password',
      type: 'password'
    }, {
      button: [{
        long: true,
        name: 'submit',
        type: 'primary',
        text: 'Sign in'
      }]
    }],
    // 表单数据对象(登录)
    login: {
      user: '',
      pwd: ''
    },
    version: '',
    // 表单验证规则(登录)
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
  }),
  mounted() {
    const {
      version
    } = config
    const env = process.env.NODE_ENV
    switch (env) {
      case 'production':
        this.version = `${version} Production`
        break
      case 'release':
        this.version = `${version} Release`
        break
      default:
        this.login = {
          user: 'admin',
          pwd: 'wasd@007'
        }
        this.version = env === 'test' ? `${version} Test` : `${version} Develop`
    }
  },
  methods: {
    handleLogin(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          // 配置默认接口地址
          ax.defaults.baseURL = localStorage.getItem('newURL') || config.baseURL
          // 用户登录
          this.$store.commit('LOADING', true)
          const para = Object.assign({}, this.login)
          // 模拟异步请求
          setTimeout(() => {
            login(para).then(res => {
              // 获取用户信息
              sessionStorage.setItem('user', JSON.stringify(res.data))
              // 获取菜单列表
              this.$store.dispatch('handleMenu')
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
    height: 350px;
    margin: -175px 0 0 -180px;
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
        .sub {
            font-size: 12px;
        }
    }
    .version {
        text-align: center;
        color: #888;
    }
}
</style>
