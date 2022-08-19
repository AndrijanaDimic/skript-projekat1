import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import GlavnaStrana from '../views/GlavnaStrana'
import SlikarskiPribor from '../views/SlikarskiPribor'
import Product from '../views/Product'
import ShopCard from '../views/ShopCard'
Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/product/:name',
    name: 'Product',
    props: true,
    component: Product
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/shop/:id',
    name: 'GlavnaStrana',
    props: true,
    component: GlavnaStrana
  },
  {
    path: '/slikarskiPribor/:id/:name',
    name: 'SlikarskiPribor',
    component: SlikarskiPribor,
    props: true
  },
  {
    path: '/store',
    name: 'ShopCard',
    component: ShopCard
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
