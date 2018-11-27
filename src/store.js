import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';
import router from './router';
import { MDCDrawer } from '@material/drawer';
import { MDCSnackbar, MDCSnackbarFoundation } from '@material/snackbar';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    drawer: null,
    snackbar: null,
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

    initSnackbar(state) {
      state.snackbar = new MDCSnackbar(document.querySelector('.mdc-snackbar'));
    },

    openSnackbar(state, payload) {
      const dataObj = {
        message: payload.message,
        actionText: payload.actionText ? payload.actionText : '',
        actionHandler: payload.actionHandler ? payload.actionHandler : null
      };
      
      state.snackbar.show(dataObj);
    },

    logout() {
      firebase.auth().signOut().then(() => {
        router.replace({ name: 'login' });
      });
    },
  },
  actions: {

  }
})
