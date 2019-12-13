import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login'
import Register from '@/views/register'
import Index from '@/views/index'
import UserTable from '@/components/userTable'
import RegionShow from '@/components/regionShow'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    }, {
      path: '/index',
      name: 'Index',
      component: Index,
      children: [
        {
          path: '/usertable',
          name: 'UserTable',
          component: UserTable
        }, {
          path: '/regionshow',
          name: 'RegionShow',
          component: RegionShow
        }
      ]
    }
  ]
})
