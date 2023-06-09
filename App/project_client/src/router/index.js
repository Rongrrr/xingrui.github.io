import Vue from 'vue'
import VueRouter from 'vue-router'
import Index  from '../views/index'
import Register from '../views/Register'
import NotFound from '../views/404'
import Login from '../views/Login'
import Home from '../views/Home'
import InfoShow from '../views/infoShow'
import GoodsList from '../views/GoodsList'
import UserInfo from '../views/UserInfo'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/index',
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      { path: '', component: Home },
      { path: '/home',name: 'home',component: Home},
      { path: '/infoshow', name: 'infoshow', component: InfoShow },
      { path: '/goodslist', name: 'goodslist', component: GoodsList },
      { path: '/userinfo', name: 'userinfo', component: UserInfo }
      
    ]
  },
  {
    path: '/register',
    name: 'register',
    component: Register
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '*',
    name: '404',
    component: NotFound
  },
]

const router = new VueRouter
  ({
    // mode: 'history',
    base:process.env.BASE_URL,
    routes
  })

  //路由守卫
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin ? next() : next('/login')
  }
  })


export default router

