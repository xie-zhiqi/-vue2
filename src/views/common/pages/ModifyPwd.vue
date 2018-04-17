<template>
<div id="modify-pwd">
  <Modal v-model="modal.visible" :title="modal.title" footer-hide>
    <ComForm ref="modifyPwd" :key="modal.visible" :items="modifyPwdItems" :model="modifyPwd" :rules="modifyPwdRule" :btn-loading="loading" @on-submit="handleSubmit('modifyPwd')" @on-click="modal.visible = false" :width="360" :label-width="110"></ComForm>
  </Modal>
</div>
</template>
<script>
import {
  modifyPwd
} from '@/services/app'
export default {
  name: 'ModifyPwd',
  data() {
    const validPwd = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your new password'))
      } else {
        if (this.modifyPwd.pwdAgain) {
          // 对第二个密码框单独验证
          this.$refs['modifyPwd'].validateField('pwdAgain')
        }
        callback()
      }
    }
    const validPwdCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Please enter your password again'))
      } else {
        if (value !== this.modifyPwd.newPwd) {
          callback(new Error('The two input password do not match!'))
        } else {
          callback()
        }
      }
    }
    return {
      // 加载状态
      loading: false,
      // 模态框属性
      modal: {
        title: '',
        visible: false
      },
      // 表单元素数组
      modifyPwdItems: [{
        label: 'Old password',
        prop: 'oldPwd',
        placeholder: 'Please enter your old password',
        type: 'password'
      }, {
        label: 'New password',
        prop: 'newPwd',
        placeholder: 'Please enter your new password',
        type: 'password'
      }, {
        label: 'Password again',
        prop: 'pwdAgain',
        placeholder: 'Please enter your password again',
        type: 'password'
      }, {
        button: [{
          name: 'submit',
          type: 'primary',
          text: 'Submit'
        }, {
          type: 'ghost',
          text: 'Cancel'
        }]
      }],
      // 表单数据对象
      modifyPwd: {
        oldPwd: '',
        newPwd: '',
        pwdAgain: ''
      },
      // 表单验证规则
      modifyPwdRule: {
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
        pwdAgain: [{
          required: true,
          validator: validPwdCheck,
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    showModal() {
      this.modal = {
        title: 'Modify Pwd',
        visible: true
      }
    },
    handleSubmit(name) {
      this.loading = true
      setTimeout(() => {
        modifyPwd(this.modifyPwd).then(res => {
          this.$Message.success(res.error.msg)
          this.loading = false
          this.modal.visible = false
        }).catch(() => {
          this.loading = false
        })
      }, 500)
    }
  }
}
</script>
