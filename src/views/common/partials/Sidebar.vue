<template>
<div id="sidebar">
  <Menu :active-name="menuActive" :open-names="[menuOpened]" accordion @on-select="handleMenuSelect">
    <template v-for="(item, index) in menu">
    <!-- 一级菜单 -->
    <MenuItem v-if="!item.children" :name="item.path" :key="index">{{ item.name }}</MenuItem>
    <!-- 二级菜单 -->
    <Submenu v-else :name="item.path" :key="index">
    <template slot="title">{{ item.name }}</template>
    <MenuItem :name="child.path" v-for="(child, index) in item.children" :key="index"> {{ child.name }} </MenuItem>
    </Submenu>
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
  name: 'sidebar',
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
#sidebar {
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
