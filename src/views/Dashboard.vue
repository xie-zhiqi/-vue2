<template>
<div id="dashboard">
  <img class="logo" src="../assets/logo.png">
  <h1>{{ msg }}</h1>
  <h2>iView UI Componests</h2>
  <h3>iView 组件
    <a href="https://www.iviewui.com/docs/guide/install" target="_blank">https://www.iviewui.com/docs/guide/install</a>
  </h3>
  <Button type="info">Info</Button>
  <Button type="success">Success</Button>
  <Button type="warning">Warning</Button>
  <Button type="error">Error</Button>
  <h3>项目仓库
    <a href="https://gitee.com/cssui/vue-admin-block.git" target="_blank">https://gitee.com/cssui/vue-admin-block.git</a>
  </h3>
</div>
</template>
<script>
export default {
  name: 'Dashboard',
  data() {
    return {
      msg: 'XX管理系统'
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
#dashboard {
    img {
        float: left;
        margin-right: 32px;
    }
    h1 {
        margin-bottom: 10px;
        font-size: 20px;
    }
    h3 {
        margin: 20px 0;
        font-weight: 400;
        a {
            color: #42b983;
        }
    }
}
</style>
