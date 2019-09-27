<template>



  <div id="Weather">
    <!-- 顶部选择城市部分 点击加号切换至选择城市界面 -->
    <div class="select-box">
      <img src="../assets/imgs/page-weather/add.png" alt class="select" @click="goToSelect" />
      <div class="selected-city">{{city}}市</div>
    </div>


  </div>

</template>

<script>
export default {
  data() {
    return {
      city: "南京"
    };
  },
  methods: {
    goToSelect() {
      return this.$router.push("/weather/select");
    }
  },
  created () {
      console.log(localStorage.getItem('hasCity'))

  }
};
</script>

<style scoped>
#Weather {
  width: 100%;

  height: 750px;
  z-index: -1;
  background: url("https://images.pexels.com/photos/2873992/pexels-photo-2873992.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
    no-repeat;
}
.select-box{

  display: flex;
  /* justify-content: center; */
  align-items: center;
}
.select{
  width: 1.5rem;
  height: 1.5rem;
 margin:  0.4rem 0.4rem ;
 /* vertical-align: -0.6rem; */
}
.selected-city{
  font-size:1.3rem;
  color:white;
  letter-spacing: 0.2rem;
}
</style>
