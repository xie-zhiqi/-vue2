<template>
<div id="sys-layout">
  <SysError></SysError>
  <!-- SysError -->
  <SysHeader></SysHeader>
  <!-- SysHeader -->
  <SysSidebar></SysSidebar>
  <!-- SysSidebar -->
  <div id="content">
    <!-- <Breadcrumb class="layout-breadcrumb">
      <BreadcrumbItem v-for="(item, index) in $route.matched" :key="index" :to="item.path">
        {{ item.name }}
      </BreadcrumbItem>
    </Breadcrumb> -->
    <!-- .layout-breadcrumb -->
    <div class="layout-content">
      <router-view></router-view>
    </div>
    <!-- .layout-content -->
  </div>
  <!-- #content -->
  <!-- <SysFooter></SysFooter> -->
  <!-- SysFooter -->
</div>
</template>
<script>
// import SysFooter from '../partials/Footer'
import SysError from '../partials/Error'
import SysHeader from '../partials/Header'
import SysSidebar from '../partials/Sidebar'

export default {
  name: 'SysLayout',
  components: {
    // SysFooter,
    SysError,
    SysHeader,
    SysSidebar
  }
}
</script>
<style lang="scss" scoped>
#content {
    overflow: auto;
    height: calc(100vh - 60px);
    margin-left: 240px;
    background-color: #f8f8f8;
    .layout-breadcrumb,
    .layout-content {
        margin: 16px;
    }
    .layout-content {
        background-color: #fff;
        padding: 16px;
    }
}
</style>
