import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import store from '@/store'

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
      {
        path: '/admin',
        name: 'admin',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
          import(/* webpackChunkName: "about" */ '../views/v2/Admin.vue'),
      },
    ],
  },
  {
    path: '/staking',
    name: 'Staking',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/v2/Staking.vue'),
  },
  {
    path: '/staking1',
    name: 'Staking1',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/v2/Staking1.vue'),
  },
  {
    path: '/reward',
    name: 'Reward',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/v2/Reward.vue'),
  },
  {
    path: '/swap',
    name: 'Swap',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/v2/Swap.vue'),
  },
  {
    path: '/admin',
    name: 'admin',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/v2/Admin.vue'),
  },
  {
    path: '/deploy',
    name: 'deploy',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/deploy.vue'),
  },
]

const router = new VueRouter({
  routes,
})

router.beforeEach((to, from, next) => {
  // ...
  console.log(from)
  if (from.name == null) {
    store.commit('setHome', true)
  } else {
    store.commit('setHome', false)
  }
  next()
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
