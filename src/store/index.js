import Vue from 'vue';
import Vuex from 'vuex';
import ui from './ui';
import auth from './auth';
import clients from './clients';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },

  mutations: {
  },

  actions: {

  },

  modules: {
    ui,
    auth,
    clients,
  }
})
