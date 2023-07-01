// import { defineStore } from 'pinia'
// export const useRole = defineStore("role", {
//   state: ()=>{
//     return {
//       role: sessionStorage.getItem('role'),
//     }
//   },
//   action:{
//     setRole(data) {
//         console.log('setRole方法执行了');
//         this.role = data
//         sessionStorage.setItem('role', data)
//     },
//   },
//   persist: {
//     enabled: true,
//     strategies: [
//       {
//         key: 'role',
//         storage: localStorage,
//       },
//     ],
//   },
// })

import { ref } from 'vue'
import { defineStore } from 'pinia'
//定义store
export const useRole = defineStore('role', () => {
  const role = ref(sessionStorage.getItem('role') || '')
  const  setRole = (payload)=>{ 
    console.log('setRole方法执行了');
    
    role.value = payload
    sessionStorage.setItem('role', payload)
  }
  //必须return , 组件中才可以拿到这些数据和方法
  return {
    role,
    setRole
  }
})