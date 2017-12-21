// 自定义组件
import ComForm from './com-form'
// 工具函数
import Utils from '../utils'

const components = {
  ComForm
}

export default(Vue) => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })

  Object.defineProperty(Vue.prototype, '$Utils', {value: Utils})
}
