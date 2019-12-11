<template>
  <div id="login">
    <div class="login-wrapper">
      <div class="loginForm-wrapper">
        <h1 class="title">后台管理系统</h1>
        <h2 class="loginTitle">用户登陆</h2>
        <el-form :model="ruleForm" name="login" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="loginForm" size="mini">
            <el-form-item label="账号:" prop="checkAccount">
                <el-input type="text" placeholder="请输入你的账号/手机号" v-model="ruleForm.checkAccount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pass" >
                <el-input type="password" placeholder="请输入你的密码" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">登陆</el-button>
            <el-button @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {Loading, Message} from 'element-ui'
export default {
  name: 'Login',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validateAccount = (rule, value, callback) => {
      // console.log(value)
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        pass: '',
        checkAccount: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkAccount: [
          { validator: validateAccount, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (ruleForm) {
      let loginInfo
      if (this.ruleForm.checkAccount.length === 11) {
        loginInfo = {
          tel: this.ruleForm.checkAccount,
          pass: this.ruleForm.pass
        }
      } else {
        loginInfo = {
          account: this.ruleForm.checkAccount,
          pass: this.ruleForm.pass
        }
      }
      this.$http({
        method: 'post',
        data: loginInfo,
        url: 'http://localhost:3000/user/login'
      }).then(res => {
        console.log(res)
        if (res.data.ret_code === 200) {
          sessionStorage.role = res.data.role
          let loading = Loading.service({
            fullscreen: true,
            text: '登陆中...'
          })
          setTimeout(() => {
            loading.close()
            this.$router.replace({name: 'Index'})
          }, 3000)
          // clearTimeout(toIdnex)
        } else if (res.data.ret_code === 404) {
          Message({
            type: 'warning',
            message: '未找到该用户的信息！',
            duration: 1500
          })
        } else {
          Message({
            type: 'error',
            message: '服务器故障，请稍后再试！',
            duration: 1500
          })
        }
      })
    },
    register () {
      this.$router.push({name: 'Register'})
    }
  }

}
</script>

<style lang="scss" scoped>
#login{
  position: relative;
  background: url('../assets/imgs/background11.png') no-repeat right bottom ;
  background-size: 50% 80%;
  min-height: 700px;
  width: 100%;
  .login-wrapper{
    width: 600px;
    .loginForm-wrapper{
      width: 400px;
      // height: 500px;
      border: 1px solid #f0f0f4;
      border-radius: 10px;
      position: absolute;
      margin-top: 200px;
      margin-left: 60px;
      .title{
      text-align: center;
      }
      .loginTitle{
      text-align: center;
      margin-top: 10px;
      }
      .loginForm{
        width: 300px;
        margin-top: 10px;
      }
    }

  }

}
</style>
