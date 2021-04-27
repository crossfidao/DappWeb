import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Layout',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/v2/Layout.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/v2/Home.vue'),
      },
      {
        path: 'CFIL',
        name: 'CFIL',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/v2/CFIL.vue'),
      },
      {
        path: 'CRFI',
        name: 'CRFI',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/v2/CRFI.vue'),
      },
      {
        path: 'wallet',
        name: 'Wallet',
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/v2/Wallet.vue'),
      },
    ],
  },
  {
    path: '/home',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Home.vue'),
  },
  {
    path: '/sign',
    name: 'Sign',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Sign.vue'),
  },
  {
    path: '/investment',
    name: 'investment',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Investment.vue'),
  },
  {
    path: '/assets',
    name: 'assets',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Assets.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Admin.vue'),
  },
  {
    path: '/apply',
    name: 'apply',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/Apply.vue'),
  },
  {
    path: '/deploy',
    name: 'deploy',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/deploy.vue'),
  },
]

const router = new VueRouter({
  routes,
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
  // chrome
  document.body.scrollTop = 0
  // firefox
  document.documentElement.scrollTop = 0
  // safari
  window.pageYOffset = 0
})
export default router
