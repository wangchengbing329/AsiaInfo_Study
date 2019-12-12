<template>
  <div id="dialog">
    <div @click="dialogFormVisible = true">{{diaInfo.diaName}}</div>
    <el-dialog :title="diaInfo.diaTitle" :visible.sync="dialogFormVisible">
      <div class="formName" v-if="isForm">
        <el-form :model="form">
          <el-form-item :label="diaInfo.diaLabel" :label-width="formLabelWidth">
            <el-input :placeholder="diaInfo.diaPlaceholder" v-model="form.name" autocomplete="off"></el-input>
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
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitUpload">上传</el-button>
        </div>
        </el-upload>
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
      }
    }
  },
  data () {
    return {
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px',
      imageUrl: ''
    }
  },
  computed: {
    isForm () {
      if (this.diaInfo.diaType === 'form') {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    submitUpload () {

    }
  }
}
</script>

<style>
</style>
