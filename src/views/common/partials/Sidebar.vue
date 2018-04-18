<template>
<div id="sys-sidebar">
  <Menu accordion :active-name="menuActive" :open-names="[menuOpened]" @on-select="handleMenuSelect">
    <template v-for="item in menu">
    <MenuItem v-if="!item.children" :key="item.path" :name="item.path">{{ item.name }}</MenuItem>
    <!-- 一级菜单 -->
    <Submenu v-else :key="item.path" :name="item.path">
    <template slot="title">{{ item.name }}</template>
    <MenuItem v-for="child in item.children" :key="child.path" :name="child.path"> {{ child.name }} </MenuItem>
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
      this.$store.commit('MENU_SELECT', name) // 选择菜单
    }
  }
}
</script>
<style lang="postcss" scoped>
#sys-sidebar {
    float: left;
    overflow: auto;
    width: 240px;
    height: calc(100vh - 60px);
    background-color: #efefef;
    & .ivu-menu-vertical {
        background-color: #efefef;
        &::after {
            display: none;
        }
        & .ivu-menu-item-active {
            background-color: #f3f3f3;
        }
    }
}
</style>
