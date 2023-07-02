<template>
  <div class="goodscate">
    <p>goodscate</p>
    <el-button  v-permission = "{action:'view' ,effect: 'disabled'}">查看</el-button>
    <el-button  v-permission = "{action:'add',effect: 'disabled'}" type="primary">添加</el-button>
    <el-button  v-permission = "{action:'edit',effect: 'disabled'}" type="warning">编辑</el-button>
    <el-button   v-permission = "{action:'delete',effect: 'disabled'}" type="danger">删除</el-button>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>