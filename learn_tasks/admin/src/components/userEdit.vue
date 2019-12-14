<template>
<div id="userEdit">
  <h1 class="editTitle">编辑角色身份</h1>
  <div class="selection">
    <span class="label">请选择用户身份：</span>
    <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  </div>
  <div class="select-button">
    <el-button type="primary" @click="submit">提交</el-button>
  <el-button @click="back">返回</el-button>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      options: [
        {value: 'U', label: '用户'},
        {value: 'M', label: '管理员'}
      ]
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    },
    submit () {
      if (this.value) {
        let nickname = this.$route.query.account
        console.log(nickname)
        console.log(this.value)
        let accountName = {
          account: nickname,
          role: this.value
        }
        this.$http({
          method: 'post',
          data: accountName,
          url: 'http://localhost:3000/user/userSetRole'
        }).then(res => {
          // console.log(res)
          if (res.data.ret_code === 200) {
            this.$message.success('更改成功')
            this.$router.replace({name: 'UserTable'})
          } else {
            this.$message.error('更新失败')
          }
        })
      } else {
        this.$message.warning('你还没选择用户角色')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.editTitle {
  margin-top: 20px;
  margin-left: 10px;
}
.selection{
  margin-top: 50px;
  margin-left: 20px;
  .label{
    color:gray;
  }
}
.select-button{
  margin-left: 180px;
  margin-top: 40px;
}
</style>
