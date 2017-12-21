// 路由配置
export default[
  {
    path: '/login',
    name: 'Login',
    component: resolve => {
      require(['@/views/Login'], resolve)
    }
  }, {
    path: '/',
    redirect: '/',
    name: 'Layout',
    component: resolve => {
      require(['@/views/common/layouts/Layout'], resolve)
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        component: resolve => {
          require(['@/views/Dashboard'], resolve)
        }
      }, {
        path: '/hello/hello-world',
        name: 'HelloWorld',
        component: resolve => {
          require(['@/components/HelloWorld'], resolve)
        }
      }, {
        path: '/manage/users',
        name: 'Users',
        component: resolve => {
          require(['@/views/manage/Users'], resolve)
        }
      }
    ]
  }, {
    path: '*',
    name: '404',
    component: resolve => {
      require(['@/views/common/pages/NotFound'], resolve)
    }
  }
]
