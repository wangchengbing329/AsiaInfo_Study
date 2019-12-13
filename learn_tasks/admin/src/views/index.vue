<template>
  <div id='index'>
    <header class='userInfo-wrapper'>
      <span class='title'>管理员后台管理系统</span>
      <div class='userInfo'>
        <div class='avatar'>
          <el-avatar size='medium' src></el-avatar>
        </div>
        <div class='userId'>{{userId}}</div>
        <div class='exit' @click='backToLogin'>
          <i class='el-icon-switch-button'></i> 退出
        </div>
        <el-dropdown trigger='click' class='drop'>
          <div class='drop_title'>
            <i class='el-icon-edit'></i>修改信息
          </div>
          <el-dropdown-menu slot='dropdown'>
            <el-dropdown-item v-for='item in diaDetail' :key='item.diaTitle'>
              <mydialog :diaInfo='item'></mydialog>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </header>
    <aside class='nav-wrapper'>
      <el-col :span='6'>
        <el-menu
          default-active='2'
          class='el-menu-vertical-demo'
          @open='handleOpen'
          @close='handleClose'
          background-color='#545c64'
          text-color='#fff'
          active-text-color='#ffd04b'
        >
          <el-submenu index='1'>
            <template slot='title'>
              <i class='el-icon-location'></i>
              <span>用户管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index='1-1'> <router-link to="/usertable" >用户表</router-link>  </el-menu-item>

            </el-menu-item-group>
          </el-submenu>
          <el-menu-item index='2'>
            <i class='el-icon-menu'></i>
            <span slot='title'><router-link to="/regionshow" >用户分布</router-link> </span>
          </el-menu-item>
        </el-menu>
      </el-col>

    </aside>
    <section class='navDetail-wrapper'>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import { MessageBox } from 'element-ui'
import mydialog from '../components/Dialog'
export default {
  components: {
    mydialog
  },
  data () {
    return {
      diaDetail: [
        {
          diaName: '修改昵称',
          diaTitle: '修改昵称',
          diaPlaceholder: '请输入新昵称',
          diaType: 'form',
          diaLabel: '新昵称:'
        },
        {
          diaName: '更改头像',
          diaTitle: '更改头像',
          diaPlaceholder: '',
          diaType: 'upload',
          diaLabel: ''
        },
        {
          diaName: '修改地址',
          diaTitle: '修改地址',
          diaPlaceholder: '请选择区域',
          diaType: 'section',
          diaLabel: '请选择省份:'
        },
        {
          diaName: '修改密码',
          diaTitle: '修改密码',
          inputType: 'password',
          diaType: 'form'
        }
      ],
      userId: '',
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
            this.$router.push({ name: 'Login' })
          } else {
            return 0
          }
        }
      })
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang='scss' scoped>
#index {
  height: 700px;
  position: relative;
  width: 100%;
  .userInfo-wrapper {
    // position: absolute;
    background-color: #545c64;
    height: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #ffffff;
    .title {
      font-size: 24px;
      margin-left: 100px;
    }
    .userInfo {
      width: 30%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-right: 150px;
      .userId {
        margin-right: 90px;
      }
      .exit {
        font-size: 15px;
      }
      .drop {
        color: #fff;
      }

      & :hover {
        color: gray;
      }
    }
  }
  .nav-wrapper {
    margin-top: 20px;
    .el-menu-vertical-demo{
      min-height: 500px;
    }
  }
  .navDetail-wrapper{
    width: 70%;
    margin-left: 26%;
    min-height: 500px;
    border-radius: 4px;
    border:1px solid #f0f0f4;
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
a {
  color:#ffffff;
}
.router-link-active{
  color:gray;
}

</style>
