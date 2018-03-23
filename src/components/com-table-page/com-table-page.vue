<template>
<div id="com-table-page">
  <Table border ref="table" :loading="loading" :columns="columns" :data="data"></Table>
  <!-- Table -->
  <Page v-if="data.length && !pageHide" class-name="page" show-elevator show-total show-sizer placement="top" :total="total" :current="current" :page-size="pageSize" @on-change="handlePageChange" @on-page-size-change="handlePageSizeChange"></Page>
  <!-- Page -->
</div>
</template>
<script>
export default {
  name: 'ComTablePage',
  props: {
    pageHide: Boolean,
    loading: Boolean,
    columns: Array,
    data: Array,
    total: Number
  },
  data: () => ({
    current: 1,
    pageSize: 10
  }),
  methods: {
    // 将数据导出为 .csv 文件
    exportCsv(obj) {
      this.$refs['table'].exportCsv(obj)
    },
    // 获取当前分页
    getPage() {
      return {
        current: this.current,
        pageSize: this.pageSize
      }
    },
    // 重置当前页码
    resetCurrent() {
      this.current = 1
    },
    // 改变页码
    handlePageChange(page) {
      this.current = page
      this.$emit('on-page-change')
    },
    // 切换每页条数
    handlePageSizeChange(page) {
      this.pageSize = page
      if (this.current === 1) {
        this.$emit('on-page-change')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.page {
    margin-top: 16px;
}
</style>
