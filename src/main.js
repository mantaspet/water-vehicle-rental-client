import Vue from 'vue';
import firebase from 'firebase';
import App from './App.vue';
import router from './router';
import store from './store/index';
import { initFirebase } from './firebase-config';
import { EventBus } from './event-bus';

Vue.config.productionTip = false;
Vue.prototype.$eventBus = EventBus;
Vue.prototype.$getFormattedDate = function(time) {
  const weekdayNames = [
    "Sekmadienis",
    "Pirmadienis", 
    "Antradienis",
    "Trečiadienis",
    "Ketvirtadienis",
    "Penktadienis",
    "Šeštadienis",
  ];
  const date = new Date(time);
  const timezoneOffset = date.getTimezoneOffset();
  const selectedDate = date.toISOString().slice(0, 10);
  const selectedWeekday = weekdayNames[date.getDay()];
  const selectedTime = new Date(date.getTime() - timezoneOffset * 60000)
    .toISOString()
    .slice(11, 16);
  return `${selectedDate} (${selectedWeekday}) ${selectedTime}`;
}
initFirebase();

let app;

// Delay initializing the app until firebase fetches current user
firebase.auth().onAuthStateChanged((user) => {
  if (!app) {
    if (user) {
      store.dispatch('getCurrentUser', user.uid).then(() => {
        app = new Vue({
          router,
          store,
          render: h => h(App)
        }).$mount('#app');
      });
    } else {
      app = new Vue({
        router,
        store,
        render: h => h(App)
      }).$mount('#app');
    }
  }
});

