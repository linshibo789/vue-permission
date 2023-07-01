import { createRouter, createWebHistory,createWebHashHistory } from 'vue-router'
import {useRightList} from '../stores/rightList';
import { storeToRefs } from 'pinia';
// 动态路由
const userRule = { path: '/users', component:()=> import('../views/user/User.vue') };
const roleRule = { path: '/roles', component: ()=>import('../views/role/Roles.vue') };
const goodRule = { path: '/goods', component:()=> import('../views/goods/GoodsList.vue') };
const categoryRule = { path: '/categories', component:()=> import('../views/goods/GoodsCate.vue') };
const ruleMapping = {
  'users': userRule,
  'roles': roleRule,
  'goods': goodRule,
  'categories': categoryRule
};
// 固定路由
const routes =  [
  {
    path: "/",
    redirect: "/index",
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/index",
    name: "index",
    redirect: '/welcome',
    component: () => import("../views/Index.vue"),
    children: [
      {
        path: "/welcome",
        name: "welcome",
        component: () => import("../views/Welcome.vue"),
      },
    ]
  },
    
       // { path: '/users', component: Users },
      // { path: '/roles', component: Roles },
      // { path: '/goods', component: GoodsList },
      // { path: '/categories', component: GoodsCate }
    //   {
    //     path: "/index/:error(.*)",
    //      meta: { title:'404 NotFound' },
    //     component: () => import("../views/NotFound.vue"),
    //   },
    // ],
  // {
  //   path: "/:error(.*)",
  //   meta: { title:'404 NotFound;' },
  //   component: () => import("../views/NotFound.vue"),
  // },
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
  
})
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next();
  } else {
    const token = sessionStorage.getItem('token');
    if (!token) {
      next('/login');
    } else {
      next();
    }
  }
});
export function initDynamicRoutes() {
  const currentRoutes = router.options.routes;
  const RightListStore = useRightList()
// console.log('RightListStore',RightListStore);

  // const { rightList } = storeToRefs(RightListStore)
  RightListStore.rightList.forEach(item => { 
    console.log('item.children+++++++++++++++++++++++++++++++',item.children);
    // 子路由的话就进入二级权限遍历
    item.children.forEach(item => {
      console.log('二级权限遍历item++++++++++++='.item);
      
      // item 二级权限
      // console.log(item, 'item-2')
      const temp = ruleMapping[item.path]
      console.log('temp',temp);
      
      // 路由规则中添加元数据meta
      console.log('item.rights++++++++++++++++++++++++++=',item.rights);
      
      temp.meta = item.rights
      currentRoutes[2].children.push(temp)
      // router.addRoute(temp)
    })
  })
  
  // router.addRoutes(currentRoutes)
  console.log("currentRoutes+++++++++++++++++++++",currentRoutes)
  currentRoutes.forEach((item)=>{
    router.addRoute(item)
  })
  
  // console.log();
  
};
export default router
