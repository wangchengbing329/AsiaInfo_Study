import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Login from '@/views/login'
import Register from '@/views/register'
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
    }
  ]
})
