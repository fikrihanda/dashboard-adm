import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from '@/js/router/routes'
import store from '@/js/store'

Vue.use(VueRouter)

const Router = new VueRouter({
  routes
})

Router.beforeEach(async function (to, from, next) {
  await store.dispatch('Users/session')
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.getters['Users/auth']) return next({path: '/login'})
  }
  if (to.matched.some(record => !record.meta.requiresAuth)) {
    if (store.getters['Users/auth']) return next({path: '/'})
  }
  next()
})

export default Router
