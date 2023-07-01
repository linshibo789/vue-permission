// import { defineStore } from 'pinia';

// export const useRightList = defineStore('rightList', {
//   state: () => {
//     return {
//       rightList: JSON.parse(sessionStorage.getItem('rightList') || '[]'),
//     }
//   },
//   actions: {
//     setRightList(payload) {
//       console.log('setRightList方法执行了');
//       this.rightList = payload;
//       sessionStorage.setItem('rightList', JSON.stringify(payload));
//     },
//   },
//   persist: {
//     enabled: true,
//     strategies: [
//       {
//         key: 'rightList',
//         storage: localStorage,
//       },
//     ],
//   },
// });

import { ref } from 'vue'
import { defineStore } from 'pinia'
//定义store
export const useRightList = defineStore('rightList', () => {
  const rightList = ref(JSON.parse(sessionStorage.getItem('rightList') || '[]'))
  const  setRightList = (payload)=>{
    console.log('setRightList方法执行了');

    rightList.value = payload
    sessionStorage.setItem('rightList', JSON.stringify(payload))
  }
  //必须return , 组件中才可以拿到这些数据和方法
  return {
    rightList,
    setRightList
  }
})
