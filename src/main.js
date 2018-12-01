import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store/index';
import { initFirebase } from './firebase-config';

Vue.config.productionTip = false;
initFirebase();

let app;

// Delay initializing the app until firebase fetches current user
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app');    
  }
});

