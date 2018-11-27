import Vue from 'vue';
import Vuex from 'vuex';
import { MDCDrawer } from '@material/drawer';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: null,
  },
  mutations: {
    initDrawer(state, type) {
      if (type === 'modal') {
        state.drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer--modal"));
      } else {
        state.drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer--dismissible"));
      }
    },

    toggleDrawer(state) {
      if (state.drawer) {
        state.drawer.open = !state.drawer.open;
      }
    },

    openDrawer(state) {
      if (state.drawer) {
        state.drawer.open = true;
      }
    },

    hideDrawer(state) {
      if (state.drawer) {
        state.drawer.open = false;
      }
    },
  },
  actions: {

  }
})
