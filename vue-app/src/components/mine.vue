<template>
  <!-- 个人页面 -->
  <div class="mine">
    <!-- 头像框部分 -->
    <div class="avatarBox">
      <div class="avatar" v-if="isLogin">
        <div class="avatarWrapper">

        <img src="../assets/imgs/page-mine/girlAvatar.png" alt="">
        </div>
            <div class="nickname-wrapper">墨友
              <div>欢迎使用freeWeather!</div>
            </div>
      </div>

      <div class="avatar" v-else>
        <div class="avatarWrapper">

        <img src="../assets/imgs/page-mine/defaultAvatar.png" alt="">
        </div>
        <div class="login" @click="login">点击登陆</div>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isLogin:false
    }
  },
  methods:{
    login () {
      this.isLogin = true
    }
  }
          

}
</script>

<style>
.mine{
  position: relative;

}
.avatarBox{
  background-color: #65b2ff;
  height: 12rem;
  display: flex;
  align-items: center;
  color:white;
}
.avatar{
  /* width: 4rem; */
  height: 4rem;
  /* margin-bottom: 2rem; */
  margin-left: 2rem;
  /* display: flex; */
  display: flex;
  justify-content: space-between;
  align-items: center;


}
.avatarWrapper{
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
}
.login{
  /* color: white; */
  margin-bottom: 2rem;
  margin-left: 2rem;
  /* align-self: flex-start; */
  font-size: 1.5rem;
  width: 10rem;
}
.nickname-wrapper{
  font-size:1.2rem;
  margin-left: 0.5rem;
}
</style>
