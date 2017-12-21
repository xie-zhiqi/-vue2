<template>
<div id="dashboard">
  <Row>
    <Col span="8">
    <img class="logo" src="../assets/logo.png">
    </Col>
    <Col span="16">
    <h1>{{ msg }}</h1>
    <h2>iView UI Componests</h2>
    <h3>iView 组件
      <a href="https://www.iviewui.com/docs/guide/install" target="_blank">https://www.iviewui.com/docs/guide/install</a>
    </h3>
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
    </Col>
  </Row>
  <p>XX系统由XX技术团队提供技术支持</p>
</div>
</template>
<script>
export default {
  name: 'dashboard',
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
    p {
        text-align: right;
        color: #999;
    }
}
</style>
