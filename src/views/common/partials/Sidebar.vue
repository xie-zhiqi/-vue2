<template>
<div id="sidebar">
  <Menu :active-name="menuActive" :open-names="[menuOpened]" accordion @on-select="handleMenuSelect">
    <template v-for="(item, key) in menu">
    <!-- 二级菜单 -->
    <Submenu :name="item.path" :key="key" v-if="item.children">
    <template slot="title">{{ item.name }}</template>
    <MenuItem :name="child.path" v-for="(child, childKey) in item.children" :key="childKey"> {{ child.name }} </MenuItem>
    </Submenu>
    <!-- 一级菜单 -->
    <MenuItem :name="item.path" :key="key" v-else>{{ item.name }}</MenuItem>
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
  mounted() {
    // const menu = JSON.parse(localStorage.getItem('menu'))
    // if (!menu) {
    // 获取菜单信息
    this.$store.dispatch('handleMenu')
    // }
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
    background-color: #fff;
    .ivu-menu-vertical.ivu-menu-light:after {
        display: none;
    }
}
</style>
