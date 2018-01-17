<template>
<Alert v-if="resError" id='error' type="error" banner closable>
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
  }
}
</script>
<style lang="scss" scoped>
#error {
    z-index: 9;
    margin: 6px 0;
    border-style: solid none;
    .title {
        margin-bottom: 12px;
    }
    .desc {
        padding: 0 24px;
        color: #f33;
        border: 1px dashed #ccc;
    }
}
</style>
