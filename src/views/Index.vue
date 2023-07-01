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
            :collapse="isCollapse"
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
import { computed, reactive, ref,toRefs } from 'vue'
  import { storeToRefs } from 'pinia'
let route = useRoute();
let router = useRouter();
// console.log('route',route);
// console.log('router',router);
import {useRightList} from '@/stores/rightList';
const RightListStore = useRightList()
// const { rightList } = storeToRefs(RightListStore)
import {useUsername} from '@/stores/username';
const UsernameStore = useUsername()
const { username } = storeToRefs(UsernameStore)
console.log("username",username);

const isCollapse =ref(false)
 // 点击按钮，切换菜单的折叠与展开
// const toggleCollapse  = () => {
//       isCollapse.value = !isCollapse.value
// }

// 被激活的链接地址
const activePath1 = ref('') 
 // 保存链接的激活状态
 const  saveNavState = (activePath) => {
    window.sessionStorage.setItem('activePath', activePath)
    activePath1.value = activePath
 }

// 左侧菜单数据
const menulist = ref([]); 
// 初始化menulist菜单栏的数据
// this.menulist = this.rightList
// 将有子选项的和没子选项的筛选一下 有子选项的赋值给menulist 
for (var i = 0, j = 0; i < RightListStore.rightList.length; i++) {
  // console.log(this.rightList[i].children.length)
  if (RightListStore.rightList[i].children.length !== 0) {
    menulist.value[j] = RightListStore.rightList[i];
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
      sessionStorage.clear();    
      // 删除vuex中的数据 让当前页面刷新  
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
