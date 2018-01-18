<template>
<Alert v-if="resError" id='error' type="error" banner closable @on-close="handleClose">
  <h3 class="title">Status Code:
      <span :style="{color: resError.status === 200 ? '#093' : '#f33'}">
        <Icon :type="resError.status === 200 ? 'checkmark-circled' : 'close-circled'"></Icon>
        {{ resError.statusCode }}
      </span>
    </h3>
  <div slot="desc" class="desc">
    <pre>{{ resError.error }}</pre>
  </div>
</Alert>
</template>
<script>
import {
  mapGetters
} from 'vuex'

export default {
  name: 'error',
  computed: {
    ...mapGetters({
      resError: 'getResError'
    })
  },
  methods: {
    handleClose() {
      this.$store.commit('RES_ERROR', '') // 清空响应错误数据
    }
  }
}
</script>
<style lang="scss" scoped>
#error {
    position: absolute;
    z-index: 999;
    top: 0;
    right: 0;
    left: 0;
    border-style: none;
    background-color: rgba(253, 236, 232, 0.8);
    .title {
        margin-bottom: 12px;
    }
    .desc {
        padding: 0 24px;
        color: #f33;
        border: 1px dashed #bbb;
    }
}
</style>
