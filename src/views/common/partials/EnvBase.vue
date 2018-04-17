<template>
<div id="env-base" v-if="envBase.visible">
  <p class="url base-url"> BaseURL: {{ envBase.baseURL }} </p>
  <!-- .base-url -->
  <p class="url" v-for="item in env" :key="item" v-if="envBase.baseURL !== envBase[item]">
    <Icon v-if="envBase.newURL === envBase[item]" type="checkmark-round" :size="14"></Icon>
    <a href="#" @click.prevent="handleChange(envBase[item], envName[item])"> {{envName[item]}}URL: {{ envBase[item] }} </a>
  </p>
  <!-- .url -->
  <Form inline ref="envBase" :model="envBase" :rules="envBaseRule" @keyup.enter.native="handleSave('envBase')">
    <FormItem prop="newURL">
      <Input v-model="envBase.newURL" placeholder="You can enter newURL" style="width: 240px;"></Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSave('envBase')">Save</Button>
      <Button type="ghost" @click="handleReset('envBase')" style="margin-left: 8px">Reset</Button>
    </FormItem>
  </Form>
  <!-- Form -->
</div>
</template>
<script>
import config from '@/config'
export default {
  name: 'EnvBase',
  data: () => ({
    env: ['production', 'release', 'test', 'development'],
    envName: {
      production: 'Production',
      release: 'Release',
      test: 'Test',
      development: 'Development'
    },
    // 表单数据对象(接口URL)
    envBase: {
      baseURL: '',
      newURL: '',
      visible: false
    },
    // 表单验证规则(接口URL)
    envBaseRule: {
      newURL: [{
        required: true,
        message: 'Please enter your newURL',
        trigger: 'blur'
      }]
    }
  }),
  mounted() {
    const {
      url,
      baseURL
    } = config
    const env = process.env.NODE_ENV
    if (env === 'development' || env === 'test') {
      this.envBase = {
        ...url,
        baseURL,
        newURL: localStorage.getItem('newURL') || '',
        visible: true
      }
    }
  },
  methods: {
    handleChange(name, env) {
      this.$Modal.confirm({
        content: `Are you sure switch to ${env} environment?`,
        okText: 'OK',
        cancelText: 'Cancel',
        onOk: () => {
          this.$Message.success('Save success!')
          this.envBase.newURL = name
          localStorage.setItem('newURL', name)
        }
      })
    },
    handleSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$Message.success('Save success!')
          localStorage.setItem('newURL', this.envBase.newURL)
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
      this.$Message.success('Reset Success!')
      this.envBase.newURL = ''
      localStorage.removeItem('newURL')
    }
  }
}
</script>
<style lang="scss" scoped>
#env-base {
    position: fixed;
    top: 10px;
    left: 10px;
    padding: 10px;
    border: 1px dashed #ccc;
    background-color: #fff;
    .url {
        margin-bottom: 8px;
        color: #888;
    }
    .base-url {
        color: #333;
    }
}
</style>
