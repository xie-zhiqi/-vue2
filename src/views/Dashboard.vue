<template>
<div id="dashboard">
  <Row>
    <Col :xs="24" :sm="9" :md="7" :lg="5">
    <img class="logo" src="../assets/logo.png" alt="logo">
    </Col>
    <Col :xs="24" :sm="15" :md="17" :lg="19">
    <h1>{{ msg }}</h1>
    <h2>基于 Vue.js 的开源模板</h2>
    <h3>iView UI 组件库
      <a href="https://www.iviewui.com/docs/guide/install" target="_blank">https://www.iviewui.com/docs/guide/install</a>
    </h3>
    <Button type="info">Info</Button>
    <Button type="success">Success</Button>
    <Button type="warning">Warning</Button>
    <Button type="error">Error</Button>
    <h3>项目仓库
      <a href="https://gitee.com/cssui/vue-admin-block.git" target="_blank">https://gitee.com/cssui/vue-admin-block.git</a>
    </h3>
    </Col>
  </Row>
</div>
</template>
<script>
export default {
  name: 'Dashboard',
  data: () => ({
    msg: '企业级中后台模板'
  })
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="postcss" scoped>
#dashboard {
    & img {
      display: block;
      margin: 0 auto;
    }
    & h1 {
        margin-bottom: 10px;
        font-size: 20px;
    }
    & h3 {
        margin: 20px 0;
        font-weight: 400;
        & a {
            color: #51b883;
        }
    }
}
</style>
