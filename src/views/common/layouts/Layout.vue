<template>
<div id="sys-layout">
  <SysHeader></SysHeader>
  <!-- SysHeader -->
  <SysSidebar></SysSidebar>
  <!-- SysSidebar -->
  <div id="content">
    <div class="layout-content">
      <router-view></router-view>
    </div>
    <!-- .layout-content -->
  </div>
  <!-- #content -->
  <!-- <SysFooter></SysFooter> -->
  <!-- SysFooter -->
  <SysError></SysError>
  <!-- SysError -->
</div>
</template>
<script>
import SysHeader from '../partials/Header'
import SysSidebar from '../partials/Sidebar'
// import SysFooter from '../partials/Footer'
import SysError from '../partials/Error'
export default {
  name: 'SysLayout',
  components: {
    SysHeader,
    SysSidebar,
    // SysFooter,
    SysError
  }
}
</script>
<style lang="postcss" scoped>
#content {
    overflow: auto;
    height: calc(100vh - 60px);
    margin-left: 240px;
    background-color: #fff;
    & .layout-content {
        padding: 16px;
    }
}
</style>
