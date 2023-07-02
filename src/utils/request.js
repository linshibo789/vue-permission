import axios from 'axios'
import router from '@/router';
// 配置请求的跟路径, 目前用mock模拟数据, 所以暂时把这一项注释起来
// axios.defaults.baseURL = 'http://127.0.0.1:8888' 注释掉之后调的接口将是Mock数据
const actionMapping = {
    'get': 'view',
    'post': 'add',
    'put':'edit',
    'delete': 'delete'
};
const request = axios.create({
  
})
request.interceptors.request.use((req) => {
    if (req.url !== 'login') {
        req.headers.Authorization = localStorage.getItem('token');
        const action = actionMapping[req.method];
        const currentRight = router.currentRoute.meta;
        if (currentRight && currentRight.indexOf(action) === -1) {
            ElMessage({
                showClose: true,
                message: '您没有权限！',
                type: "error",
              });
            return Promise.reject(new Error('您没有权限！'));
        }
    }
    return req;
});
request.interceptors.response.use((res) => {
    if (res.data.status === 401) {
        ElMessage({
            showClose: true,
            message: '身份信息失效！',
            type: "error",
          });
        router.push('/login')
        localStorage.clear()
        window.location.reload()
    }
    return res
    
});
export default request