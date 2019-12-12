<template>
  <div id="register">
    <div class="register-wrapper">
      <div class="registerForm-wrapper">
        <h1 class="title">后台管理系统</h1>
        <h2 class="registerTitle">用户注册</h2>
        <el-form :model="ruleForm" name="register" status-icon :rules="rules" ref="ruleForm" label-width="150px" class="registerForm" size="mini">
            <el-form-item label="请输入账号：" prop="checkAccount">
                <el-input type="text" v-model="ruleForm.checkAccount" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码：" prop="pass">
                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请再次输入密码：" prop="checkPass">
                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请输入手机号：" prop="checkTel">
                <el-input type="text" v-model="ruleForm.checkTel" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请选择所在省份：" prop="region">
                <el-select v-model="region" placeholder="请选择所在区域">
                    <el-option v-for="(item,index) in provinceList" :key="item + index" :label="item" :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="back">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import {MessageBox} from 'element-ui'
export default {
  name: 'register',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validateAccount = (rule, value, callback) => {
      // console.log(value)
      if (value === '') {
        callback(new Error('请输入账号'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      // console.log(value)
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('两次输入的密码不一致'))
      } else {
        callback()
      }
    }
    const validateTel = (rule, value, callback) => {
      const telReg = /^1(3|4|5|7|8)\d{9}$/
      if (value === '') {
        callback(new Error('请输入手机号'))
      } else if (!telReg.test(value)) {
        callback(new Error('请输入正确格式的手机号'))
      } else {
        callback()
      }
    }
    return {
      provinceList: [],
      region: '',
      ruleForm: {
        pass: '',
        checkAccount: '',
        checkPass: '',
        checkTel: ''
      },
      rules: {
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ],
        checkAccount: [
          { validator: validateAccount, trigger: 'blur' }
        ],
        checkPass: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        checkTel: [
          { validator: validateTel, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (ruleForm) {
      // console.log(this.region)
      let userInfo = {
        role: 'U',
        tel: this.ruleForm.checkTel,
        account: this.ruleForm.checkAccount,
        pass: this.ruleForm.checkPass,
        address: this.region
      }
      if (this.ruleForm.pass === '' || this.ruleForm.checkAccount === '' || this.ruleForm.checkTel === '' || this.ruleForm.checkPass === '') {
        MessageBox({
          type: 'warning',
          message: '你还有未完成项'
        })
      } else {
        this.$http({
          url: 'http://localhost:3000/user/register',
          method: 'post',
          data: userInfo
        }).then(res => {
          // console.log(res)
          if (res.data.ret_code === 200) {
            MessageBox({
              message: '注册成功',
              type: 'success',
              showClose: true,
              showConfirmButton: true,
              callback: (confirm, instanse) => {
                this.$router.replace({name: 'Login'})
              }
            })
          } else if (res.data.ret_code === 403) {
            MessageBox({
              message: '该用户已经存在！',
              type: 'warning',
              showClose: true,
              showConfirmButton: true
            })
          } else {
            MessageBox({
              message: '服务器出现故障，请稍后再试',
              type: 'error',
              showConfirmButton: true,
              showClose: true
            })
          }
        })
      }
    },
    back () {
      this.$router.go(-1)
    }
  },
  created () {
    this.$http({
      method: 'get',
      url: 'http://localhost:3000/province/getInfo'
    }).then(res => {
      // console.log(res)
      this.provinceList = res.data.list
    })
  }

}
</script>

<style lang="scss" scoped>
#register{
  position: relative;
  background: url('../assets/imgs/background11.png') no-repeat right bottom ;
  background-size: 50% 80%;
  min-height: 700px;
  width: 100%;
  .register-wrapper{
    width: 600px;
    .registerForm-wrapper{
      position: absolute;
      width: 400px;
      border:1px solid #f0f0f4;
      border-radius: 10px;
      margin-top: 200px;
      margin-left: 60px;
      .title{
      text-align: center;
      }
      .registerTitle{
      text-align: center;
      margin-top: 10px;
      }
      .registerForm{
        width: 300px;
        margin-top: 10px;
      }
    }
  }

}
</style>
