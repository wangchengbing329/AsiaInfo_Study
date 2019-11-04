import Vue from 'vue'
import Router from 'vue-router'
import Weather from '@/components/weather'
import Mine from '@/components/mine'
import Select from '@/components/childrenPages/select/select'
import SelectCity from '@/components/childrenPages/selectCity/selectCity'
import Register from '@/components/childrenPages/register/register'
Vue.use(Router)

 const router = new Router({
  mode:'history',
  routes: [
    {
      path:'/',
      redirect:'/weather'
    },
    {
      path: '/weather',
      name: 'Weather',
      component: Weather,

      // children:[
      //   {
      //     path:'select',
      //     component:Select
      //   }
      // ]


    },
    {
      path:'/weather/select',
      name:'Select',
      component:Select,
      // children:[{

      // }]
    },
    {
      path: '/mine',
      name: 'Mine',
      component: Mine
    },{
      path:'/weather/selectcity',
      name:'SelectCity',
      component:SelectCity
    },{
      path:'/mine/register',
      name:'Register',
      component:Register
    }

  ]
})

router.beforeEach((to,from,next)=>{
  // console.log(to.name)
  // console.log(localStorage.thatCity)
  if(typeof(localStorage.thatCity) === 'undefined' && to.name !=='SelectCity'){
    // to.name = SelectCity
    next({ name:'SelectCity'})
    // return to.name
  }
  next()

})



export default router
