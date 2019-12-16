<template>
    <!-- :data="tableData.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))" -->
<div id="userTable"> <el-table
    :data ="tableData.slice(($store.state.currentPage - 1) * pageSize, $store.state.currentPage *pageSize)"
    style="width: 100%">
    <el-table-column
      label="序号"
      prop="index"
      :formatter="indexChange">
    </el-table-column>
    <el-table-column
      label="昵称"
      prop="account">
    </el-table-column>
    <el-table-column
      label="地址"
      prop="address">
    </el-table-column>
    <el-table-column
      label="用户角色"
      prop="role"
      align="center"
      :formatter ="roleChange">
    </el-table-column><el-table-column
      label="电话"
      prop="tel"
      align="center">
    </el-table-column>
    <el-table-column
      align="right">
      <template slot="header" slot-scope="scope">
        <el-input
          v-model.lazy="search"
          size="mini"
          placeholder="输入关键字搜索"
          @change="searchTable"/>
      </template>
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination
  background
  layout="prev, pager, next,total,jumper"
  :total="tableData.length"
  :page-size="pageSize"
  :hide-on-single-page ="true"
  :current-page ="currentPage"
  @current-change="handleCurrentChange">
</el-pagination>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [],
      search: '',
      currentPage: this.$store.state.currentPage,
      pageSize: 7
    }
  },
  methods: {
    handleEdit (index, row) {
      // console.log(index, row)
      this.$router.push({name: 'UserEdit',
        query: {
          account: row.account
        }
      })
    },
    handleDelete (index, row) {
      let deleteInfo = {
        account: row.account
      }
      this.$http({
        method: 'post',
        data: deleteInfo,
        url: 'http://localhost:3000/user/userdelete'
      }).then(res => {
        console.log(res)
        if (res.data.ret_code === 200) {
          this.$message.success('删除成功')
          this._initData()
        } else if (res.data.ret_code === 404) {
          this.$message.error('删除失败')
        } else {
          this.$message.warning('服务器故障')
        }
      })
      console.log(index, row)
    },
    roleChange (row, column, index) {
      if (row.role === 'M') {
        return '管理员'
      } else {
        return '用户'
      }
    },
    indexChange (row, cloumn, index) {
      return parseInt(index) + 1
    },
    handleCurrentChange (val) {
      this.$store.commit('changeCurrent', val)
      // this.currentPage = val
    },
    _initData () {
      this.$http.get('http://localhost:3000/user/userinfo').then(res => {
        let data = null
        const datalist = res.data.data
        this.tableData = []
        for (let index in datalist) {
          data = {
            index,
            account: datalist[index].account,
            address: datalist[index].address,
            tel: datalist[index].tel,
            role: datalist[index].role
          }

          this.tableData.push(data)
        }
      })
    },
    searchTable () {
      this.$http({
        method: 'post',
        data: {
          search: this.search
        },
        url: 'http://localhost:3000/user/tabel'
      }).then(res => {
        console.log(res)
        let data = null
        const datalist = res.data.list
        this.tableData = []
        for (let index in datalist) {
          data = {
            index,
            account: datalist[index].account,
            address: datalist[index].address,
            tel: datalist[index].tel,
            role: datalist[index].role
          }
          this.tableData.push(data)
        }
      })
    }
  },
  created () {
    this._initData()
  },
  update () {
  }
}
</script>

<style>

</style>
