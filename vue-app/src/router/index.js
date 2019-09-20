import Vue from 'vue'
import Router from 'vue-router'
import HotPlaying from '@/components/hotPlaying'
import WillPlay from '@/components/WillPlay'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HotPlaying',
      component: HotPlaying
    },
    {
      path: '/willPlay',
      name: 'WillPlay',
      component: WillPlay
    }
  ]
})
