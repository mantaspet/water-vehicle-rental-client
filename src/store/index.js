import Vue from 'vue';
import Vuex from 'vuex';
import ui from './ui';
import auth from './auth';
import tasks from './tasks';
import clients from './clients';
import vehicles from './vehicles';
import employees from './employees';
import reservations from './reservations';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    ui,
    auth,
    tasks,
    clients,
    vehicles,
    employees,
    reservations,
  }
})
