<template>
<div id="not-found">
  <h1 class="nf-title">404</h1>
  <h2>抱歉，您所访问的页面不存在！</h2>
  <h3 class="nf-count"> 系统将在
    <span class="count">{{ count }}</span>
    秒后为您返回首页
  </h3>
</div>
</template>
<script>
export default {
  name: 'not-found',
  data() {
    return {
      count: 3
    }
  },
  mounted() {
    this.delayAndRedirect()
  },
  methods: {
    delayAndRedirect() {
      setInterval(() => {
        this.count -= 1
      }, 1000)
      setTimeout(() => {
        this.$router.push('/') // 路由跳转首页
        this.$store.commit('MENU_RESET') // 重置菜单
      }, 3000)
    }
  }
}
</script>
<style lang="scss" scoped>
#not-found {
    overflow: hidden;
    text-align: center;
    .nf-title {
        color: coral;
    }
    .nf-count {
        color: green;
    }
    .count {
        color: red;
        font-size: 24px;
    }
}
</style>
