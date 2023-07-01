<template>
  <div class="login">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>登陆页</span>
          <el-button class="button" text></el-button>
        </div>
      </template>
      <el-form size="large" ref="loginForm" :model="loginRuleForm" :rules="loginRules" status-icon>
        <el-form-item prop="username">
          <el-input type="text" v-model="loginRuleForm.username" placeholder="账号" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" v-model="loginRuleForm.password" placeholder="密码" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" size="large" @click="submit">登陆
          </el-button>
          <!-- <el-link @click="router.push('/reg')" type="info">去注册</el-link> -->
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { login ,getRoles} from "../api/index";
import {useRole} from '../stores/role.js'
import {useUsername} from '../stores/username.js'
import {useRightList} from '../stores/rightList'
import { storeToRefs } from 'pinia';
import { initDynamicRoutes } from '../router/index'
import { useRoute, useRouter } from 'vue-router';
import $router from '../router/index.js'


let loginForm = ref({});
let loginRuleForm = ref({
  username: "admin",
  password: "123456",
});
let loginRules = ref({
  username: [
    { required: true, message: "请输入账号", trigger: "blur" },
    
  ],
  password: [{ required: true, message: "请输入密码", trigger: "blur" },
  ],
});
let submit = () => {
  loginForm.value.validate(async (valid) => {
    if (!valid) return;
    console.log("发送login请求了");
    console.log('login',login);
    
    let {data:res}= await login(loginRuleForm.value);
    console.log("res++++++++++++++++++++++++++++++++++++++++",res);

    const roleStore = useRole()
    console.log('roleStore++++++++++++++++++++=',roleStore);
    // let {setRole} = storeToRefs(RoleStore);
    // roleStore.setRole()
    // console.log(" roleStore+++++++++++++++=++++++++++++++++++++++++++=", roleStore);
    
    roleStore.setRole(res.role)
    const usernameStore = useUsername()
    // let {setUsername} = storeToRefs(usernameStore);
    console.log('usernameStore',usernameStore);
    // console.log('usernameStore++++++++++++++++++++++++=',usernameStore);
    
    usernameStore.setUsername(res.username)
    sessionStorage.setItem('token', res.token);
    let {data:resu} =  await getRoles(res.role)
    console.log('resu',resu);
    const rightListStore =  useRightList()
    // let {setRightList} = storeToRefs(rightListStore);
    console.log('rightListStore+++++++++++++++++++=',rightListStore);
    rightListStore.setRightList(resu)
    ElMessage({
      showClose: true,
      message: '登陆成功',
      type: "success",
    });
    // 根据用户所具备的权限 动态添加路由规则
    initDynamicRoutes()
    let $route = useRoute();
    // let $router = useRouter(); 
    console.log('router+++++++++++++++=',$router);
    
    $router.push('/')
    
          
    // if (res.code === 200) {
    //   // tokenStore.updateToken(res.token)
    //   localStorage.setItem('token',res.token)
    //   userinfoStore.updateUserInfo(res.userinfo)
    //    //!!!!!!!!!!!!!!!!!!!!! 以下两步必须写在登陆成功并且保存token及userinfo之后,跳转首页之前 !!!!!!!!!!!!!!!!!!!!! 
    //     //过滤出当前用户有权限访问的业务路由
    //     console.log(store.userInfo.role.permissions);
        
    //   let  accessRoutes =  filterRoutes(routes,store.userInfo.role.permissions)
    //   // console.log(accessRoutes);
      
    //   //将过滤出来的路由 动态添加到router中
    //   accessRoutes.forEach((route)=>{
    //       router.addRoute(route) //循环一次, 添加一条路由

    //   })
    //    //$router.addRoutes(accessRoutes); //Vue2中可以一次性添加所有路由.
    //   ElMessage({
    //     showClose: true,
    //     message: res.msg,
    //     type: "success",
    //   });
    //   router.push('/index/business')
    // } else {
    //   ElMessage({ showClose: true, message: res.msg, type: "error", });

    // }
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