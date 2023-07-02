<template>
  <div class="index">
    <div class="common-layout">
      <el-container>
        <el-aside  width="200px">
          <div class="title">
            <div class="left">
              <el-icon color="orange" size="30"> <Platform /> </el-icon>&nbsp;
              <span>后台管理系统</span>
            </div>
            <div class="right">
              <el-icon color="#ccc"> <MoreFilled /> </el-icon>&nbsp;
              <el-icon color="orange">
                <CirclePlusFilled />
              </el-icon>
            </div>
          </div>
          <el-menu
            background-color="#333744"
            text-color="#fff"
            active-text-color="#409EFF"
            unique-opened
            :collapse-transition="false"
            router
            :default-active="activePath"
            @open="handleOpen"
            @close="handleClose"
          >
            <el-sub-menu  v-for="item in menulist" :index="item.id + ''" :key="item.id">
              <template #title>
                <span> {{item.authName}}</span>
              </template>
                <el-menu-item 
                 v-for="subItem in item.children"
                 :key="subItem.index"  
                 :index="'/' + subItem.path"
                 @click="saveNavState('/' + subItem.path)"
                 >
                  <template #title>
                      <span>{{subItem.authName}}</span>
                  </template>
                </el-menu-item>
            </el-sub-menu>
      </el-menu>
        </el-aside>
        <el-container>
          <el-header>
            <div class="left">
              <span>{{ route.meta.title }}</span
              >&emsp;
              <el-icon size="30" color="orange"> <StarFilled /> </el-icon>&emsp;
              <el-icon size="25" color="#ccc"> <Tools /> </el-icon>&emsp;
              <el-icon size="25" color="#ccc">
                <MoreFilled />
              </el-icon>
            </div>
            <div class="right">
              <el-menu mode="horizontal" :ellipsis="false">
                <el-menu-item index="0">
                  <el-icon><User /></el-icon>欢迎&nbsp;{{username ? username:'xxx'}}
                </el-menu-item>
                <el-menu-item @click="logout" index="1">
                  <el-icon><SwitchButton /></el-icon>退出
                </el-menu-item>
              </el-menu>
            </div>
          </el-header>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { ref} from 'vue'
  import { storeToRefs } from 'pinia'
let route = useRoute();
let router = useRouter();
import {useRightList} from '@/stores/rightList';
import {useUsername} from '@/stores/username';
const { username } = storeToRefs(useUsername())
// 被激活的链接地址
const activePath = ref('') 
 // 保存链接的激活状态
 const  saveNavState = (activePath1) => {
    window.localStorage.setItem('activePath', activePath1)
    activePath.value = activePath1
 }

 activePath.value = window.localStorage.getItem('activePath');
// 左侧菜单数据
const menulist = ref([]); 
// 初始化menulist菜单栏的数据
// this.menulist = this.rightList
//有子选项的赋值给menulist 
console.log('useRightList().rightList++++++++++++=',useRightList().rightList);

for (var i = 0, j = 0; i < useRightList().rightList.length; i++) {
  // console.log(this.rightList[i].children.length)
  if (useRightList().rightList[i].children.length !== 0) {
    menulist.value[j] = useRightList().rightList[i];
    j = j + 1;
  } 
}
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
// 用户退出
 const logout = () => {
      localStorage.clear() 
      // 删除pinia中的数据 让当前页面刷新  
      router.push('/login');
      window.location.reload();
}
</script>

<style scoped lang="scss">
.index {
  height: 100%;

  .common-layout {
    height: 100%;

    .el-container {
      width: 100%;
      height: 100%;

      .el-aside {
        width: 260px;
        // padding: 0 30px;
        border-right: 1px solid #ccc;

        .title {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 25px;
          line-height: 70px;

          .left {
            display: flex;
            align-items: center;

            span {
              font-weight: 700;
            }
          }
        }

        .el-menu {
          border-right: 0;

          .el-menu-item.is-active {
            background-color: #fcebdc;
          }
        }
      }

      .el-container {
        height: 100%;

        .el-header {
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #ccc;

          .left {
            display: flex;
            align-items: center;
          }

          .right {
            display: flex;
            align-items: center;
            .el-menu {
              border: 0;
            }
          }
        }
        .el-main {
          padding: 0;
        }
        .el-main::-webkit-scrollbar {
          display: none;
        }
      }
    }
  }
}
</style>
