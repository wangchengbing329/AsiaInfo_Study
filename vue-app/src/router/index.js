import Vue from 'vue'
import Router from 'vue-router'
import Weather from '@/components/weather'
import Mine from '@/components/mine'
import Select from '@/components/childrenPages/select/select'
import AddCity from '@/components/childrenPages/addCity/addCity'
Vue.use(Router)

export default new Router({
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
      path:'/weather/select/addcity',
      name:'AddCity',
      component:AddCity
    }

  ]
})
