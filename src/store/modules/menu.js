import {getMenus} from '@/services/app'
import router from '@/router'

const state = {
  loading: false, // 加载状态
  menu: JSON.parse(localStorage.getItem('menu')) || [],
  menuActive: localStorage.getItem('menuActive') || '/',
  menuOpened: localStorage.getItem('menuOpened') || ''
}

const getters = {
  getLoading: state => state.loading,
  getMenu: state => state.menu,
  getMenuActive: state => state.menuActive,
  getMenuOpened: state => state.menuOpened
}

const mutations = {
  // 更新加载状态
  LOADING: (state, data) => {
    state.loading = data
  },
  // 获取菜单
  MENU: (state, data) => {
    state.loading = false
    state.menu = data
    localStorage.setItem('menu', JSON.stringify(data))
  },
  // 激活菜单
  MENU_SELECT: (state, data) => {
    const open = `/${data.split('/')[1]}`
    router.push(data) // 路由跳转
    state.menuActive = data // 激活菜单
    state.menuOpened = open // 展开菜单
    localStorage.setItem('menuActive', data)
    localStorage.setItem('menuOpened', open)
  },
  // 重置菜单
  MENU_RESET: (state) => {
    state.menu = []
    state.menuActive = '/'
    state.menuOpened = ''
    localStorage.clear()
  }
}

const actions = {
  // 获取菜单
  handleMenu: ({commit}) => {
    getMenus().then(res => {
      commit('MENU', res.data)
      router.push('/') // 路由跳转首页
    })
  }
  // 激活菜单
  // handleMenuSelect: ({
  //   commit
  // }, name) => {
  //   commit('MENU_SELECT', name)
  // }
}

export default {state, getters, mutations, actions}
