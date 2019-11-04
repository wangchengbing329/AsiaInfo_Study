<template>
  <div id="register">
      <h1 class="title">&nbsp;Hello&nbsp;&nbsp;新朋友！</h1>
    <div class="inputInfo">
    <div class="inputBox" >

    <div class="label">请输入昵称:</div><input type="text"  v-model="nickname">
    </div>

    <div class="inputBox" >

    <div class="label">请输入密码:</div><input type="password"  v-model.lazy="password">
    </div>

<div class="inputBox" >

    <div class="label">请再输入密码:</div><input type="password"  v-model.lazy="Repassword">
    </div>
<div class="inputBox" >

    <div class="label">请输入手机号码:</div><input type="text"  v-model="phoneNumber">
    </div>

<div class="inputBox" >

    <div class="label">请输入邮箱:</div><input type="text"  v-model="email">
    </div>
    </div>
    <div class="submit" @click="submit">提交</div>
  </div>
</template>

<script>
export default {
 data() {
   return {
     nickname:'',
     password:'',
     Repassword:'',
     phoneNumber:'',
     email:'',

   }
 },
 watch:{
   password(nValue,oldValue){
     if(nValue === '' ){
       alert('请输入密码')
     }
   },
    Repassword (nValue,Ovalue) {
      if(nValue!== this.password){
        alert('两次密码不一致，请重新输入')
      }
    }
 },
 methods:{
   sumbit () {
     this.$http({
       url:'http://localhost:3000/addCity',
       method:'post',
       data:{
         nickname:this.nickname,
         password:this.password,
         Repassword:this.Repassword,
         phoneNumber:this.phoneNumber,
         email:this.email
       }


     }).then(res=>{

     }).catch(err=>{
       console.log(err)
     })
   }
 }
}
</script>

<style scoped>
#register{
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
  margin-top: 6rem;
}
.inputInfo{
  margin-top: 5rem;
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
.submit{
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
