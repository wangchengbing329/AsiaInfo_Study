<template>
  <!-- 个人页面 -->
  <div class="mine">
    <!-- 头像框部分 -->
    <div class="avatarBox">
      <div class="avatar" v-if="isLogin">
        <div class="avatarWrapper" >

        <img src="../assets/imgs/page-mine/girlAvatar.png" alt="">
        </div>
            <div class="nickname-wrapper">{{nickname}}
              <div>欢迎使用freeWeather!</div>
            </div>
      </div>

      <div class="avatar" v-else>
        <div class="avatarWrapper">

        <img src="../assets/imgs/page-mine/defaultAvatar.png" alt="">
        </div>
        <div class="login" @click="login">点击登陆</div>
        <div class="register" @click="register">注册</div>
      </div>

  </div>

  <div class="optionsWrapper">
    <div class="options" v-for="(item,key) in options" :key="key">
      <img :src="showIcon(item.name)" alt="">
      <span class="optionName">{{item.title}}</span>
    </div>
  </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      nickname:'墨友',
      isLogin:false,
      isGO:false,
      options:[
        {title:'会员中心',name:'vip'},
        {title:'卡通助手',name:'zhushou-'},
        {title:'皮肤商铺',name:'shop'},
        {title:'钱包',name:'wallet'},
        {title:'设置',name:'setting'}


      ]
    }
  },
  methods:{
    login () {
      // this.isLogin = true
      this.$router.push('/mine/login')
    },
    showIcon(item){
      return require(`@/assets/imgs/mine/${item}.png`)
    },
    register () {
      // console.log(1)
     return this.$router.push('/mine/register')
    }
  },
  created(){
   if(localStorage.Login){
     this.isLogin = localStorage.Login
    this.nickname = localStorage.nickname
   }
  }

}
</script>

<style scoped>
.mine{
  position: absolute;
  background-color:#f5f5f5;
  height: 100%;
  width: 100%;
  z-index: -1;

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
  /* margin-bottom: 2rem; */
  margin-left: 2rem;
  /* align-self: flex-start; */
  font-size: 1.5rem;
  width: 8rem;
  /* height: 1.5rem; */
}
.register{
  text-align: center;
  font-size: 1.5rem;
}
.nickname-wrapper{
  font-size:1.2rem;
  margin-left: 0.5rem;
}
.optionsWrapper{
  position: absolute;
  background-color: #fff;
  border-radius: 10px;
  width: 95%;
  left: 0;
  right: 0;
  /* bottom: 0; */
  top: 10rem;
  margin: 0 auto;
}
.optionsWrapper:nth-child(1){
  margin-top: 3rem;
}
.options{
  display: flex;
  height: 3rem;
  align-items: center;
  border-bottom: 1px solid #f5f5f5;
}

.options img{
  height: 1.5rem;
  width: 1.5rem;
  margin-left: 1rem;
}
.optionName{
  margin-left: 2rem;
}
</style>
