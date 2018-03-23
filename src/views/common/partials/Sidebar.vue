<template>
<div id="sys-sidebar">
  <Menu accordion :active-name="menuActive" :open-names="[menuOpened]" @on-select="handleMenuSelect">
    <template v-for="(item, index) in menu">
    <MenuItem v-if="!item.children" :key="index" :name="item.path">{{ item.name }}</MenuItem>
    <!-- 一级菜单 -->
    <Submenu v-else :key="index" :name="item.path">
    <template slot="title">{{ item.name }}</template>
    <MenuItem v-for="(child, index) in item.children" :key="index" :name="child.path"> {{ child.name }} </MenuItem>
    </Submenu>
    <!-- 二级菜单 -->
    </template>
  </Menu>
</div>
</template>
<script>
import {
  // mapActions,
  mapGetters
} from 'vuex'

export default {
  name: 'SysSidebar',
  computed: {
    ...mapGetters({
      menu: 'getMenu',
      menuActive: 'getMenuActive',
      menuOpened: 'getMenuOpened'
    })
  },
  methods: {
    // ...mapActions(['handleMenuSelect'])
    handleMenuSelect(name) {
      this.$store.commit('MENU_SELECT', name)
    }
  }
}
</script>
<style lang="scss" scoped>
#sys-sidebar {
    float: left;
    overflow: auto;
    width: 240px;
    height: calc(100vh - 60px);
    background-color: #efeff1;
    .ivu-menu-vertical {
        background-color: #efeff1;
        &::after {
            display: none;
        }
    }
}
</style>
