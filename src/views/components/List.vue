<template>
<div id="list">
  <div class="head">
    <div class="title">
      <Icon type="md-list" size="16" style="margin-top: -2px;"></Icon> {{$route.name}}
    </div>
    <!-- .title -->
    <div class="extra">
      <slot name="extra"> </slot>
    </div>
    <!-- .extra -->
    <slot name="toolbar"> </slot>
    <!-- toolbar -->
  </div>
  <!-- .head -->
  <slot> </slot>
</div>
</template>
<script>
export default {
  name: 'list',
  data: () => ({

  })
}
</script>
<style lang="postcss" scoped>
.head {
  position: relative;
  border: 1px solid #dcdee2;
  border-bottom-style: none;
  & .title {
    padding: 12px 16px;
  }
  & .extra {
    position: absolute;
    top: 12px;
    right: 16px;
  }
}
</style>
