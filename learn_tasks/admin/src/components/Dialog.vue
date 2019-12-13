<template>
  <div id='dialog'>
    <div @click="dialogFormVisible = true">{{diaInfo.diaName}}</div>
    <el-dialog
      :title="diaInfo.diaTitle"
      :visible.sync="dialogFormVisible"
      :append-to-body="isAppend"
      :center="isAppend"
    >
      <div class="formName" v-if="diaInfo.diaType === 'form'">
        <el-form :model="form">
          <div class="password" v-if="diaInfo.inputType === 'password'">

          <el-form-item  label="请输入当前密码：" :label-width="formLabelWidth">
            <el-input placeholder="请输入当前密码" v-model="form.passing" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  label="请输入新密码：" :label-width="formLabelWidth">
            <el-input placeholder="请输入新密码" v-model="form.pass" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item  label="请重新输入新密码：" :label-width="formLabelWidth">
            <el-input placeholder="请重新输入新密码" v-model="form.rePass" autocomplete="off"></el-input>
          </el-form-item>
          </div>
          <div class="account" v-else>
          <el-form-item  :label="diaInfo.diaLabel" :label-width="formLabelWidth">
            <el-input :placeholder="diaInfo.diaPlaceholder" v-model="form.account" autocomplete="off"></el-input>
          </el-form-item>
          </div>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </div>
      <div class="section" v-else-if="diaInfo.diaType === 'section'">
        <el-form :model="form">
          <el-form-item :label="diaInfo.diaLabel" :label-width="formLabelWidth">
            <el-select v-model="form.region" :placeholder="diaInfo.diaPlaceholder">
              <el-option v-for="(item,index) in provinceList" :key ="item + index" :label="item" :value="item"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </div>
      <div class="uploadName" v-else>
        <el-upload
          class="avatar-uploader"
          ref="upload"
          action="http://127.0.0.1:8080/assets/imgs"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :auto-upload ="false"
          :showFile-list="true"
          list-type= "picture"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="submitUpload">上传</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    diaInfo: {
      diaName: {
        type: String,
        required: true
      },
      diaTitle: {
        type: String,
        required: true
      },
      diaType: {
        type: String,
        required: true,
        default: 'form'
      },
      diaLabel: {
        type: String,
        required: true
      },
      diaPlaceholder: {
        type: String,
        required: true
      },
      inputType: String
    }
  },
  data () {
    return {
      isAppend: true,
      provinceList: [],
      dialogFormVisible: false,
      form: {
        Account: '',
        region: '',
        passing: '',
        pass: '',
        avatar: '',
        rePass: ''
      },
      formLabelWidth: '140px',
      imageUrl: ''
    }
  },
  computed: {
  },
  methods: {
    handleAvatarSuccess (res, file) {
      console.log(res, file)
      this.imageUrl = URL.createObjectURL(file.raw)
      console.log(this.imageUrl)
    },
    beforeAvatarUpload (file) {
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isPNG) {
        this.$message.error('上传头像图片只能是 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isPNG && isLt2M
    },
    submitUpload () {
      this.$refs.upload.submit()
    }
  },
  created () {
    // console.log(localStorage.provinces)
    this.provinceList = JSON.parse(localStorage.provinces)
  }
}
</script>

<style lang='scss' scoped>
.dialog-footer {
  display: flex;
  justify-content: flex-end;
  // float: right;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
.avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>
