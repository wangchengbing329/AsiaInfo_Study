<template>
  <div id="login">
    <h2 class="title">欢迎来到FreeWeather!</h2>

    <div class="inputInfo">


    <div class="inputBox">
      <div class="label">请输入帐号:</div><input type="text" v-model="nickname">
    </div>
    <div class="inputBox">
      <div class="label">请输入密码:</div><input type="password" v-model="password" name="" id="">
    </div>
    </div>
  <div class="login " @click="login">登陆</div>
    <div class="back" @click="back">返回</div>
  </div>

</template>

<script>
export default {
data () {
  return {
    nickname:'',
    password:''
  }
},
methods:{
  login(){
    if(!this.password && !this.nickname){
      alert('请输入信息！')
    }

   this.$http({
     method:'post',
     url:'http://localhost:3000/register/login',
     data:{
       nickname:this.nickname,
       password:this.password
     }
   }).then(res=>{
     console.log(res)
     if(res.data.code === 200 && res.data.isLogin === 1){
      //  this.isLogin = true
      this.$router.replace({
        name:'Mine',
        params:{
          login:res.data.isLogin
        }
      })
      localStorage.Login = true
      localStorage.nickname = res.data.nickname
     }else {
       alert('请检查帐号密码无误后重新输入')
     }
   }).catch(err=>{
     console.log(err )
   })
  },
  back(){
    this.$router.go(-1)
  }
}
}
</script>

<style scoped>
#login  {
  background: rgba(255,255,255,.3) url('https://images.pexels.com/photos/373394/pexels-photo-373394.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500') no-repeat ;
position: absolute;
z-index: -1;
  height: 100%;
  width: 100%;

  /* opacity: 0.3; */
}
.title{
  color: white;
  text-align: center;
  margin-top: 7rem;
}
.inputInfo{
  margin-top: 6rem;
  color:#52524e;
  text-align: center;

}
.inputBox{
  /* margin-top: 1.5rem; */
  height: 4rem;
}
.inputBox input{
  border: none;
  background: rgba(255,255,255,.3);
  outline: none;
  margin-left: 1rem;
  height: 1.7rem;
  border-radius: 6px;
}
.label{
  display: inline-block;
  width: 8rem;
  text-align: right;
  height: 1.7rem;
  font-size: 1.1rem
}
.login{
  text-align: center;
  width: 4rem;
  height: 2.5rem;
  border-radius: 10px;
  line-height: 2.5rem;
  background-color: #00aaa0;
  color: white;
  float: right;
  margin:1rem 2rem 0 0;
  font-size: 1rem;
}
.back{
  text-align: center;
  width: 4rem;
  height: 2.5rem;
  border-radius: 10px;
  line-height: 2.5rem;
  background-color: #00aaa0;
  color: white;
  float: right;
  margin:1rem 2rem 0 0;
}
</style>
