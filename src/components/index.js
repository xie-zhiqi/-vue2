// 自定义组件
import ComForm from './com-form'
import ComTablePage from './com-table-page'

const components = {
  ComForm,
  ComTablePage
}

export default(Vue) => {
  Object.keys(components).forEach(key => {
    Vue.component(key, components[key])
  })
}
