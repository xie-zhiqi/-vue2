<template>
<div id="modify-pwd">
  <Form ref="modifyPwdForm" :model="modifyPwdModel" :rules="modifyPwdRules" :label-width="110" @keyup.enter.native="handleModifyPwd('modifyPwdForm')">
    <FormItem :label="item.label" :prop="item.prop" v-for="(item, key) in modifyPwdItems" :key="key">
      <Input type="password" v-model="modifyPwdModel[item.prop]" :placeholder="item.placeholder"></Input>
    </FormItem>
    <FormItem>
      <Button :loading="logining" @click="handleModifyPwd('modifyPwdForm')" type="primary">Submit</Button>
    </FormItem>
  </Form>
</div>
</template>
<script>
import {
  modifyPwd
} from '@/services/app'

export default {
  name: 'modify-pwd',
  data() {
    const validPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your password'))
      } else {
        if (this.modifyPwdModel.pwdCheck) {
          // 对第二个密码框单独验证
          this.$refs['modifyPwdForm'].validateField('pwdCheck')
        }
        callback()
      }
    }
    const validPwdCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your password again'))
      } else if (value !== this.modifyPwdModel.newPwd) {
        callback(new Error('The two input passwords do not match!'))
      } else {
        callback()
      }
    }
    return {
      // 加载状态
      logining: false,
      // 表单数据对象
      modifyPwdModel: {
        oldPwd: '',
        newPwd: '',
        pwdCheck: ''
      },
      // 表单元素对象
      modifyPwdItems: [{
        label: 'Old password',
        prop: 'oldPwd',
        placeholder: 'Old password'
      }, {
        label: 'New password',
        prop: 'newPwd',
        placeholder: 'New password'
      }, {
        label: 'Password check',
        prop: 'pwdCheck',
        placeholder: 'Password check'
      }],
      // 表单验证规则
      modifyPwdRules: {
        oldPwd: [{
          required: true,
          message: 'Please enter your old password',
          trigger: 'blur'
        }],
        newPwd: [{
          required: true,
          validator: validPwd,
          trigger: 'blur'
        }],
        pwdCheck: [{
          required: true,
          validator: validPwdCheck,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    handleModifyPwd(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.logining = true
          // 请求参数
          let para = Object.assign({}, this.modifyPwdModel)
          setTimeout(() => {
            modifyPwd(para).then(res => {
              this.$Message.success(res.msg)
              this.$emit('close', false)
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
