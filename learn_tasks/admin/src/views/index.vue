<template>
  <div id="index">
    <header class="userInfo-wrapper">
      <span class="title">管理员后台管理系统</span>
      <div class="userInfo">
        <div class="avatar"><el-avatar @click="changeAvatar" size="medium" src=""></el-avatar></div>
        <div class="userId">{{userId}}</div>
        <div class="exit" @click="backToLogin"><i class="el-icon-switch-button"></i> 退出</div>
        <el-dropdown trigger="click" class="drop">
            <div class="drop_title"><i class="el-icon-edit"></i>修改信息</div>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item icon="el-icon-plus"><mydialog diaInfo=diaDetail></mydialog></el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus-outline">更换头像</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-plus">修改密码</el-dropdown-item>
                <el-dropdown-item icon="el-icon-check">修改地址</el-dropdown-item>
                <el-dropdown-item icon="el-icon-circle-check">修改身份</el-dropdown-item>
                </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <aside class="nav-wrapper"></aside>
    <section class="navDetail-wrapper">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import {MessageBox} from 'element-ui'
import mydialog from '../components/Dialog'
export default {
  components: {
    mydialog
  },
  data () {
    return {
      diaDetail: {
        diaName: '修改昵称',
        diaTitle: '修改昵称',
        diaPlaceholder: '请输入新昵称',
        diaTypes: 'form',
        diaLabel: '请输入新的昵称'

      },
      userId: '',
      dialogFormVisible: false,
      information: {
        account: '',
        avatar: '',
        pass: '',
        province: '',
        role: ''
      }
    }
  },
  created () {
    this.userId = sessionStorage.userId
  },
  methods: {
    backToLogin () {
      MessageBox({
        type: 'info',
        title: '退出',
        message: '你确定要退出吗？',
        showClose: true,
        showConfirmButton: true,
        showCancelButton: true,
        callback: (action, instance) => {
          // console.log(action)
          if (action === 'confirm') {
            this.$router.push({name: 'Login'})
          } else {
            return 0
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#index {
  height: 700px;
  position: relative;
  width: 100%;
  .userInfo-wrapper{
    // position: absolute;
    background-color: #545c64;
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
    .title{
      font-size: 24px;
      margin-left: 100px;
    }
    .userInfo{
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 150px;
      .userId{
        margin-right: 90px;
      }
      .exit{
        font-size: 15px;
      }
      .drop{
        color:#fff;
      }

      & :hover{
        color: gray;
      }

    }
  }
}
.el-dropdown-link {
    cursor: pointer;
    color: #ffff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .demonstration {
    display: block;
    color: #fff;
    font-size: 14px;
    margin-bottom: 20px;
  }

</style>
