<template>
  <div id="app">


     <tar-bar >
<tab-bar-item path='/weather'>
      <img slot="tabBar-icon" src="./assets/imgs/pages/Weather.png"  />

      <img slot="tabBar-activeIcon"  src="./assets/imgs/pages/Weather_active.png"   />
      <div slot="tabBar-text"> 天气</div>


</tab-bar-item>
<tab-bar-item path = '/mine'>
<img slot="tabBar-icon" src="./assets/imgs/pages/Mine.png"  />

      <img slot="tabBar-activeIcon"  src="./assets/imgs/pages/Mine_active.png"   />
      <div slot="tabBar-text"> 我的</div></tab-bar-item>

     </tar-bar>
    <router-view/>
  </div>
</template>

<script>
import tarBar from './components/Components/Tarbar'
import tabBarItem from './components/Components/TabItem'
export default {
  components:{tarBar,
  tabBarItem},
  name: 'App',
  data () {
    return {

    }
  },
  computed:{

  }
  }


</script>

<style>
html,body{
  margin: 0;
  padding: 0;
}

</style>
