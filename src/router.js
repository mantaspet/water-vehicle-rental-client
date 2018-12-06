import Vue from 'vue';
import Router from 'vue-router';
import firebase from 'firebase';
import Vehicles from './views/Vehicles.vue';
import Login from './views/Login.vue';
import SignUp from './views/SignUp.vue';

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
      },
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: () => import(/* webpackChunkName: "tasks" */ './views/Tasks.vue'),
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
    }
  ],
});

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    next('login')
  } else {
    next();  
  }
});

export default router;