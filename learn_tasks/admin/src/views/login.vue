<template>
  <div id="login">
    <div class="login-wrapper">
      <div class="loginForm-wrapper">
        <h1 class="title">后台管理系统</h1>
        <h2 class="loginTitle">用户登陆</h2>
        <el-form :model="ruleForm" name="login" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="loginForm" size="mini">
            <el-form-item label="账号:" prop="checkAccount">
                <el-input type="text" v-model="ruleForm.checkAccount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pass" >
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
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
      console.log(ruleForm)
      this.$http.post({
        // 'url'
      })
      // this.$refs[ruleForm].validate((valid) => {
      //   if (valid) {
      //     alert('submit!')
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
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
