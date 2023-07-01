// 使用Mock
import Mock from 'mockjs'
Mock.setup({
  timeout: '500-1000',
});

// 用户信息
const users = [
  {
    id: 1,
    username: 'linshibo',
    password: '123456',
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM',
    role: 'linshibo',
    rights: [],
  },
  {
    id: 2,
    username: 'admin',
    password: '123456',
    token: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOjUwMCwicmlkIjowLCJpYXQiOjE1MTI1NDQyOTksImV4cCI6MTUxMjYzMDY5OX0.eGrsrvwHm-tPsO9r_pxHIQ5i5L1kX9RX444uwnRGaIM',
    role: 'admin',
    rights: [],
  },
];
// 权限信息 将权限信息从用户信息中抽离出来 不同身份对应不同的路由信息
// 这样方便了后期的维护 否则以后每加一个页面就需要在每个用户信息中做更改 十分的不方便 如果用户多了更是增添了不必要的麻烦
// 将用户直接分为不同身份 然后对不同身份做处理 这样比较合理
const roles = {
  linshibo: [
    {
      id: 10,
      authName: '用户管理',
      children: [
        {
          id: 11,
          authName: '用户列表',
          path: 'users',
          rights: ['view'],
        },
      ],
    },
    {
      id: 101,
      authName: '商品管理',
      children: [
        {
          id: 104,
          authName: '商品列表',
          path: 'goods',
          rights: ['view', 'add'],
        },
        {
          id: 121,
          authName: '商品分类',
          path: 'categories',
          rights: ['view'],
        },
      ],
    },
  ],
  admin: [
    {
      id: 10,
      authName: '用户管理',
      children: [
        {
          id: 11,
          authName: '用户列表',
          path: 'users',
          rights: ['view', 'edit', 'add', 'delete'],
        },
      ],
    },
    {
      id: 103,
      authName: '角色管理',
      children: [
        {
          id: 111,
          authName: '角色列表',
          path: 'roles',
          rights: ['view', 'edit', 'add', 'delete'],
        },
      ],
    },
    {
      id: 101,
      authName: '商品管理',
      children: [
        {
          id: 104,
          authName: '商品列表',
          path: 'goods',
          rights: [ "view",
          "edit",
          "add",
          "delete"],
        },
        {
          id: 121,
          authName: '商品分类',
          path: 'categories',
          rights: [ "view",
          "edit",
          "add",
          "delete"],
        },
      ],
    },
  ],
};
// 用户登录
Mock.mock('/login', 'post', option => {
  console.log('JSON.parse(option.body)',JSON.parse(option.body));
  
  const { username, password } = JSON.parse(option.body)
  const user = users.find(item => {
    return item.username === username && item.password === password
  })
  return user
})

// 用户权限信息
Mock.mock('/roles', 'post', option => {
  return roles[option.body]
})


