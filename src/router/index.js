import { createRouter, createWebHistory } from 'vue-router'

//private
import dashboardView from '../views/dashboardView.vue'
import profileView from '../views/profileView.vue'
import dashboard from '../layouts/dashboard.vue'
import listAssetView from '../views/listAssetView.vue'
import addAssetView from '../views/addAssetView.vue'

//public
import landingpage from '../views/landingpage.vue'
import publicLayouts from '../layouts/publicLayouts.vue'
import loginAuth from '../views/public/loginAuth.vue'
import registerAuth from '../views/public/registerAuth.vue'

//error
import notfound from '../views/error/notfound.vue'

// import { auth } from '../config/firebase'

// const requiredAuth = (to, from, next) => {
//   const userAuth = auth.currentUser
//   if (!userAuth) {
//     alert('Login or Register')
//     next({
//       name: 'Login'
//     })
//   } else {
//     next()
//   }
// }

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    //private
    {
      path: '/dashboard',
      component: dashboard,
      children: [
        {
          path: './',
          redirect: { name: 'Home' }
        },
        {
          path: '/dashboard',
          name: 'Home',
          component: dashboardView
        },
        {
          path: '/profile',
          name: 'Profile',
          component: profileView
        },
        {
          path: '/list-of-assets',
          name: 'ListAsset',
          component: listAssetView
        },
        {
          path: '/add-an-asset',
          name: 'AddAsset',
          component: addAssetView
        }
      ]
    },
    //public
    {
      path: '/',
      component: publicLayouts,
      children: [
        {
          path: '/',
          name: 'LandingPage',
          component: landingpage
        },
        {
          path: '/login',
          name: 'Login',
          component: loginAuth
        },
        {
          path: '/register',
          name: 'Register',
          component: registerAuth
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: notfound
    }
  ]
})

export default router
