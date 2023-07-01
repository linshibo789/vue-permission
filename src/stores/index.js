import { createPinia ,defineStore } from 'pinia'

import { createPersist } from 'pinia-plugin-persist';
const pinia = createPinia()

// 创建持久化插件实例
const persist = createPersist({
    // 配置持久化存储的方式，默认使用localStorage
    // 可选的方式还有：sessionStorage、cookie
    storage: localStorage,
    // 配置要持久化存储的模块
    // 可以是字符串形式的模块名，或是store实例
    // 如果要配置多个模块，可以传入一个数组
    modules: ['rightList', 'role','username'],
    // 配置要忽略的属性，这些属性不会被持久化存储
    // 可以是字符串形式的属性名，或是一个函数
    // ignore: ['ignoreProperty1', 'ignoreProperty2'],
  });
  pinia.use(persist);
export default pinia
// import { createStore } from 'vuex'
// export default createStore({
//     state: {
//         role: sessionStorage.getItem('role'),
//         rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'),
//         username: sessionStorage.getItem('username'),
//     },
//     getters: {},
//     mutations: {
//         setRole(state, data) {
//             state.role = data
//             sessionStorage.setItem('role', data)
//         },
//         setRightList(state, data) {
//             state.rightList = data
//             sessionStorage.setItem('rightList', JSON.stringify(data))
//         },
//         setUsername(state, data) {
//             state.username = data
//             sessionStorage.setItem('username', data)
//         },
//     },
//     actions: {},
//     modules: {}
// })

