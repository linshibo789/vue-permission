<template>
  <div class="login">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>登陆页</span>
          <el-button class="button" text></el-button>
        </div>
      </template>
      <el-form
        size="large"
        ref="loginForm"
        :model="loginRuleForm"
        :rules="loginRules"
        status-icon
      >
        <el-form-item prop="username">
          <el-input
            type="text"
            v-model="loginRuleForm.username"
            placeholder="账号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            type="password"
            v-model="loginRuleForm.password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            style="width: 100%"
            size="large"
            @click="submit"
            >登陆
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login, getRoles } from '../api/index';
import { useRole } from '../stores/role.js';
import { useUsername } from '../stores/username.js';
import { useRightList } from '../stores/rightList';
import { initDynamicRoutes } from '../router/index';
import { useRoute, useRouter } from 'vue-router';
import $router from '../router/index.js';
let router = useRouter();
let loginForm = ref({});
let loginRuleForm = ref({
  username: 'admin',
  password: '123456',
});
let loginRules = ref({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
});
let submit = () => {
  loginForm.value.validate(async (valid) => {
    if (!valid) return;
    let { data: res } = await login(loginRuleForm.value);
    console.log('res++++++++++++++++++++++++++++++++++++++++', res);
    if (res.status !== 200) return ElMessage({showClose: true,message: '登陆失败！',type: 'error',});
    useRole().setRole(res.data.role);
    useUsername().setUsername(res.data.username);
    localStorage.setItem('token', res.data.token);
    let { data: resu } = await getRoles(res.data.role);
    if (resu.status !== 200) return
    console.log('resu++++++++++++++=', resu);
    useRightList().setRightList(resu.data);
    ElMessage({showClose: true,message: '登陆成功！',type: 'success',});
    // 根据用户所具备的权限 动态添加路由规则
    initDynamicRoutes()
   
    console.log('router++++++++++++++++++++=',router);
    
    router.push('/')
  });
};
</script>

<style scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.el-card {
  width: 400px;
  min-height: 300px;
}
</style>
