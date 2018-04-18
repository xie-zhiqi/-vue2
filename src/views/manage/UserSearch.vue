<template>
<div id="user-search">
  <Card style="margin-bottom: 16px;">
    <div slot="title">
      <Icon type="ios-search-strong"></Icon> Search
    </div>
    <ComForm inline :items="searchItems" :model="model" :btn-loading="btnLoading" @on-submit="handleSearch" @on-reset="handleSearch"></ComForm>
  </Card>
</div>
</template>
<script>
export default {
  name: 'UserSearch',
  props: {
    model: Object,
    btnLoading: Boolean
  },
  data: () => ({
    // 表单元素对象(搜索)
    searchItems: [{
      label: 'Name',
      prop: 'name',
      placeholder: 'Search Name',
      icon: 'ios-search-strong',
      labelWidth: 60
    }, {
      button: [{
        name: 'submit',
        type: 'primary',
        text: 'Search'
      }, {
        name: 'reset',
        type: 'ghost',
        text: 'Reset'
      }]
    }]
  }),
  methods: {
    handleSearch() {
      this.$emit('on-search', true)
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
