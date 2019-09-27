import Vue from 'vue'
import Router from 'vue-router'
import Weather from '@/components/weather'
import Mine from '@/components/mine'
import Select from '@/components/childrenPages/select/select'
import SelectCity from '@/components/childrenPages/selectCity/selectCity'
Vue.use(Router)

 const router = new Router({
mode:'history',
  routes: [

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
    }

  ]
})

// router.beforeEach((to,from,next)=>{
//   console.log(to.name)
//   // next({path:'/selectcity'})
//   return
// })



export default router
