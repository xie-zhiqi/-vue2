<template>
<div id="login">
  <div class="logo-info">
    <img class="logo" src="../assets/logo.png">
    <p class="name">XX管理系统 <br> <span>http://www.xx.com/</span></p>
  </div>
  <!-- .logo-info -->
  <Form ref="loginForm" :model="loginModel" :rules="loginRules" @keyup.enter.native="handleLogin('loginForm')">
    <FormItem :prop="item.prop" v-for="(item, key) in loginItems" :key="key">
      <Input :type="item.type" v-model="loginModel[item.prop]" :placeholder="item.placeholder"></Input>
    </FormItem>
    <FormItem>
      <Button :loading="logining" @click="handleLogin('loginForm')" type="primary" class="submit">Sign in</Button>
    </FormItem>
  </Form>
  <!-- form -->
  <p class="prompt">
    <span class="span">Username：admin</span>
    <span class="span">Password：wasd@007</span>
  </p>
  <!-- .prompt -->
</div>
</template>
<script>
import {
  login
} from '@/services/app'

export default {
  name: 'login',
  data() {
    return {
      // 加载状态
      logining: false,
      // 表单元素数组
      loginItems: [{
        prop: 'user',
        placeholder: 'Username'
      }, {
        prop: 'pwd',
        type: 'password',
        placeholder: 'Password'
      }],
      // 表单数据对象
      loginModel: {
        user: 'admin',
        pwd: 'wasd@007'
      },
      // 表单验证规则
      loginRules: {
        user: [{
          required: true,
          message: 'Please fill in the user name',
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
          this.logining = true
          // 请求参数
          let para = Object.assign({}, this.loginModel)
          setTimeout(() => {
            login(para).then(res => {
              // 响应数据
              if (res) {
                localStorage.setItem('user', JSON.stringify(res.data))
              }
              // 配置用户TOKEN
              // this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + res.data.token
              this.$router.push('/') // 路由跳转首页
              this.logining = false
            }).catch(() => {
              this.logining = false
            })
          }, 500)
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
    .submit {
        width: 100%;
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
