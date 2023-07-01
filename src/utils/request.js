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
        req.headers.Authorization = sessionStorage.getItem('token');
        const action = actionMapping[req.method];
        console.log('router',router);
        const currentRight = router.currentRoute.meta;
        if (currentRight && currentRight.indexOf(action) === -1) {
            alert('没有权限');
            return Promise.reject(new Error('没有权限'));
        }
    }
    return req;
});
request.interceptors.response.use((res) => {
    console.log('res+++++++',res);
    
    if (res.data.status === 401) {
        router.push('/login')
        sessionStorage.clear()
        window.location.reload()
      }
      return res
    return res;
});
export default request