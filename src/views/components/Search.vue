<template>
<div id="search">
  <Card style="margin-bottom: 16px;">
    <div slot="title">
      <Icon type="ios-search-strong"></Icon> Search
    </div>
    <ComForm inline :elem="elem" :model="model" :loading="loading" :btn-loading="btnLoading" :label-width="labelWidth" @on-submit="handleSearch" @on-reset="handleSearch"></ComForm>
  </Card>
</div>
</template>
<script>
export default {
  name: 'Search',
  props: {
    elem: Array,
    model: Object,
    loading: Boolean,
    btnLoading: Boolean,
    labelWidth: Number
  },
  data: () => ({

  }),
  methods: {
    handleSearch() {
      this.$emit('on-search', 'search')
    }
  }
}
</script>
<style lang="postcss" scoped>
</style>
