import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from '../router';
import ui from './ui';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },

  mutations: {
    logout() {
      firebase.auth().signOut().then(() => {
        router.replace({ name: 'login' });
      });
    },
  },

  actions: {

  },

  modules: {
    ui,
  }
})
