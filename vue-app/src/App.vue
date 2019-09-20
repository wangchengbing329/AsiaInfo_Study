<template>
  <div id="app">

     <p class="navigate">
       <router-link to="/" >影院热映</router-link>
       <router-link to="/willPlay" >即将上映</router-link>
     </p>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      isActive:true,
      active:false
    }
  },
  computed:{
    classChange(){
      this.isActive = true
      this.active = false
    },
    classTab(){
     this.isActive = false
      this.active = true
    }
  }
  }


</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 auto;
  width: 200px;
  /* margin-top: 60px; */
}
.navigate{
  width: 200px ;
  height: 25px;
  /* display: inline-block; */
}
p a{
  text-decoration: none;
  color:#907f7f;

}
.router-link-active{
  /* text-decoration: none; */
  font-size:18px;
  color:#907f7f;

}
.router-link-exact-active.router-link-active{
/* text-decoration: none; */
  font-size:18px;
  color:#191919;
  text-decoration: none;
  display: inline-block;
  border-bottom: 1px solid #191919;

}
/* :class="{hotActive:isActive} " @click="classChange" */
/* :class="{willActive:active}" @click="classTab" */
/* .hotActive{
  color: #191919;
  text-decoration: none;
}
.willActive{
  color:#191919;
  text-decoration: none;
} */
</style>
