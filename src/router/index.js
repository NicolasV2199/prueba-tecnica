import { createRouter, createWebHashHistory } from 'vue-router'
import LoginViewComposable from '@/modules/Auth/views/LoginViewComposable.vue'
import categoriesRouter from "../modules/categories/router";

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginViewComposable
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "register" */ '@/modules/Auth/views/RegisterViewComposable.vue')
  }, 
  {
    path: '/categories',
    name: 'categories',
    ...categoriesRouter,
    meta: {requiresAuth: true}
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(route => route.meta.requiresAuth)){
    if(!localStorage.getItem('token')){
      next({name: 'login'})
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
