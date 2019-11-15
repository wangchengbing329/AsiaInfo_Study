<template>
 <div>
<Header></Header>
<div>
    <router-view/>

</div>
  </div>
</template>

<script>
import Header from '@/components/header'
export default {
components:{Header},
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
