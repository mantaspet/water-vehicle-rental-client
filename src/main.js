import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store/index';
import { initFirebase } from './firebase-config';
import { EventBus } from './event-bus';

Vue.config.productionTip = false;
Vue.prototype.$eventBus = EventBus;
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
    if (user) {
      store.dispatch('getCurrentUser', user.uid);
    }
  }
});

