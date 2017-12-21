import {getMenus} from '@/services/app'
import router from '@/router'

const state = {
  menu: JSON.parse(localStorage.getItem('menu')) || [],
  menuActive: localStorage.getItem('menuActive') || '/',
  menuOpened: localStorage.getItem('menuOpened') || ''
}

const getters = {
  getMenu: state => state.menu,
  getMenuActive: state => state.menuActive,
  getMenuOpened: state => state.menuOpened
}

const mutations = {
  // 激活菜单
  MENU_SELECT: (state, data) => {
    const open = `/${data.split('/')[1]}`
    router.push(data) // 路由指向
    state.menuActive = data // 激活菜单
    state.menuOpened = open // 展开菜单
    localStorage.setItem('menuActive', data)
    localStorage.setItem('menuOpened', open)
  },
  // 获取菜单
  MENU: (state, data) => {
    state.menu = data
    localStorage.setItem('menu', JSON.stringify(data))
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
  // 激活菜单
  // handleMenuSelect: ({
  //   commit
  // }, name) => {
  //   commit('MENU_SELECT', name)
  // },
  // 获取菜单
  handleMenu: ({commit}) => {
    getMenus().then(res => {
      commit('MENU', res.data)
    })
  }
}

export default {state, getters, mutations, actions}
