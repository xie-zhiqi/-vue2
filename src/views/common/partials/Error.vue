<template>
<Alert v-if="resError" id='error' type="error" banner closable @on-close="handleClose">
  <h3 class="title">Status Code:
      <span :style="{color: resError.status === 200 ? '#093' : '#f33'}">
        <Icon :type="resError.status === 200 ? 'checkmark-circled' : 'close-circled'"></Icon>
        {{ resError.statusCode }}
      </span>
    </h3>
  <div slot="desc" :class="['desc', resError.status === 200 ? '' : 'error']">
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
    min-height: 100%;
    margin-bottom: 0;
    border-style: none;
    background-color: rgba(253, 236, 232, 0.8);
    .title {
        margin-bottom: 12px;
    }
    .desc {
        padding: 0 24px;
        border: 1px dashed #093;
        &.error {
            color: #f33;
            border-color: #f33;
        }
    }
}
</style>
