import { defineStore } from 'pinia'
export const useUsername = defineStore("username", {
  state: ()=>{
    return {
      username: ''
    }
  },
  actions:{
    setUsername(payload) {
      console.log('setUsername方法执行了');
        this.username = payload
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'username',
        storage: localStorage,
      },
    ],
  },
})

// export default useUsername
// import { ref } from 'vue'
// import { defineStore } from 'pinia'
// //定义store
// export const useUsername = defineStore('username', () => {
//   const username = ref(sessionStorage.getItem('username'))
//   const  setUsername = (payload)=>{ 
//     console.log('setUsername方法执行了');
    
//     username.value = payload
//     sessionStorage.setItem('username', payload)
//   }
//   //必须return , 组件中才可以拿到这些数据和方法
//   return {
//     username,
//     setUsername
//   }
// })