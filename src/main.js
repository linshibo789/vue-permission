
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import App from './App.vue'
import router from './router'
import '../mock/index'
import './utils/permission'
const app = createApp(App)

app.directive('permission', {
  mounted (el, binding) {
    console.log("el++++++++++++++++++++",el)
    console.log("binding+++++++++++++++++++=",binding)
    const action = binding.value.action
    const effect = binding.value.effect
    console.log('action',action);
    console.log('effect',effect);
    
    console.log('router+++++++++++++++++++++++++++++++++++',router);
    
    // 判断 当前的路由所对应的组件中 如何判断用户是否具备action的权限
    console.log("router.currentRoute.value.meta", router.currentRoute.value.meta)
     const currentRouteArr =  Object.values(router.currentRoute.value.meta)
    if (currentRouteArr.indexOf(action) === -1) { // 等于-1说明没找到 不具备权限
      if (effect === 'disabled') {
        el.disabled = true
        el.classList.add('is-disabled')
      } else {
        el.parentNode.removeChild(el)
      }
    }
  }
})
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(createPinia())
app.use(router)

app.mount('#app')
