import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Vehicles from './views/Vehicles.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';
import store from './store/index';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '*',
      redirect: '/login',
    },
    {
      path: '/',
      name: 'home',
      component: Vehicles,
    },
    {
      path: '/vehicle/:id',
      name: 'vehicle',
      component: () => import(/* webpackChunkName: "vehicle" */ './views/Vehicle.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/clients',
      name: 'clients',
      component: () => import(/* webpackChunkName: "clients" */ './views/Clients.vue'),
      meta: {
        requiresAuth: true,
        allowedRoles: ['admin'],
      },
    },
    {
      path: '/reservations',
      name: 'reservations',
      component: () => import(/* webpackChunkName: "reservations" */ './views/Reservations.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/employees',
      name: 'employees',
      component: () => import(/* webpackChunkName: "employees" */ './views/Employees.vue'),
      meta: {
        requiresAuth: true,
        allowedRoles: ['admin']
      },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import(/* webpackChunkName: "tasks" */ './views/Tasks.vue'),
      meta: {
        requiresAuth: true,
        allowedRoles: ['admin', 'employee'],
      },
    },
    {
      path: '/reviews',
      name: 'reviews',
      component: () => import(/* webpackChunkName: "reviews" */ './views/Reviews.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    }
  ],
});

router.beforeEach((to, from, next) => {
  const firebaseUser = firebase.auth().currentUser;

  if (!to.meta.requiresAuth) {
    next();
  } else if (to.meta.requiresAuth && !firebaseUser) {
    next('login');
  } else if (!to.meta.allowedRoles) {
    next();
  } else {
    const currentUser = store.getters.currentUser;
    if (!currentUser) {
      store.dispatch('getCurrentUser').then((user) => {
        if (to.meta.allowedRoles.includes(user.role)) {
          next();
        } else {
          next(false);
        }
      });
    } else if (to.meta.allowedRoles.includes(currentUser.role)) {
      next();
    } else {
      next(false);
    }
    next();
  }
});

export default router;