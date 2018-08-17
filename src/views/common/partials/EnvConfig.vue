<template>
<div id="env-config" v-if="envConfig.visible">
  <p class="url base-url"> BaseURL : {{ envConfig.baseURL }} </p>
  <!-- .base-url -->
  <p class="url" v-for="item in env" :key="item" v-if="envConfig.baseURL !== envConfig.baseAPI[item]">
    <Icon v-if="envConfig.newURL === envConfig.baseAPI[item]" type="md-checkmark-circle-outline" size="16" style="margin-top: -2px;"></Icon>
    <a href="#" @click.prevent="handleChange(envConfig.baseAPI[item], envName[item])">
      <strong>{{envName[item]}}URL : </strong> {{ envConfig.baseAPI[item] }} </a>
  </p>
  <!-- .url -->
  <Form ref="envConfig" :model="envConfig" :rules="envConfigRule" @keyup.enter.native="handleSave('envConfig')">
    <FormItem prop="newURL">
      <Input v-model="envConfig.newURL" placeholder="You can enter newURL"></Input>
    </FormItem>
    <Row :gutter="16">
      <Col span="12">
      <Button long type="primary" @click="handleSave('envConfig')">Save</Button>
      </Col>
      <Col span="12">
      <Button long @click="handleReset('envConfig')">Reset</Button>
      </Col>
    </Row>
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
    envConfig: {
      baseURL: '',
      newURL: '',
      visible: false
    },
    // 表单验证规则(接口URL)
    envConfigRule: {
      newURL: [{
        required: true,
        message: 'Please enter your newURL',
        trigger: 'blur'
      }]
    }
  }),
  mounted() {
    const {
      baseAPI,
      baseURL
    } = config
    const env = process.env.NODE_ENV
    if (env === 'development' || env === 'test') {
      this.envConfig = {
        baseAPI,
        baseURL,
        newURL: localStorage.getItem('newURL') || '',
        visible: true
      }
    }
  },
  methods: {
    handleChange(name, env) {
      this.$Modal.confirm({
        title: 'Warning',
        content: `Are you sure switch to ${env} environment?`,
        okText: 'OK',
        cancelText: 'Cancel',
        onOk: () => {
          this.$emit('on-click', false)
          this.$Message.success('Save success!')
          this.envConfig.newURL = name
          localStorage.setItem('newURL', name)
        }
      })
    },
    handleSave(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$emit('on-click', false)
          this.$Message.success('Save success!')
          localStorage.setItem('newURL', this.envConfig.newURL)
        }
      })
    },
    handleReset(name) {
      this.$refs[name].resetFields()
      this.$emit('on-click', false)
      this.$Message.success('Reset Success!')
      this.envConfig.newURL = ''
      localStorage.removeItem('newURL')
    }
  }
}
</script>
<style lang="postcss" scoped>
#env-config {
  position: absolute;
  width: 288px;
  & .url {
    margin-bottom: 16px;
    color: #888;
  }
  & .base-url {
    color: #333;
    font-weight: 700;
  }
}
</style>
