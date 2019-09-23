<template>
    <div class="tabBar-item" path="/" @click="iconChange">
    <div v-if="!isActive" class="tabBar-icon"><slot name="tabBar-icon"></slot></div>
      <div v-else class="tabBar-activeIcon">
      <slot name="tabBar-activeIcon"></slot>
      </div>
      <div :class="{active:isActive}" class="tabBar-text"><slot name="tabBar-text"></slot></div>
    </div>
</template>

<script>
export default {
  props:{
   path:String
  },
data () {
  return {
    // isActive:true
  }
},
methods:{
  iconChange( ) {
 return this.$router.replace(this.path)
  }
},
computed:{
  isActive () {
    return this.$route.path.indexOf(this.path) !== -1
  }
}

}
</script>

<style>
.tabBar-item {

  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  align-items: center;

}
.tabBar-item img {
  height: 1.5rem;
  width: 1.5rem;
}
.tabBar-text{
  color:#909090;
}
.active{
  color:#43a3ea;
}
</style>
