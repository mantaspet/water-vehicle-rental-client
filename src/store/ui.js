export default {
	state: {
		drawer: true,
		snackbar: null,
		progress: false,
		confirmDialog: {
			title: '',
			body: '',
			cancelText: '',
			confirmText: '',
			isOpen: false,
		},
		snackbar: {
      isOpen: false,
    },
	},

	getters: {
		confirmDialog(state) {
			return state.confirmDialog;
		},

		snackbar(state) {
      return state.snackbar;
    },
	},

	mutations: {
		toggleDrawer(state) {
			state.drawer = !state.drawer;
		},

		openSnackbar(state, payload) {
      state.snackbar = {
        isOpen: true,
        message: payload.message,
        action: payload.action,
        link: payload.link,
        timeout: payload.timeout,
      };
    },

    closeSnackbar(state) {
      state.snackbar.isOpen = false;
    },

		showProgress(state) {
			state.progress = true;
		},

		hideProgress(state) {
			state.progress = false;
		},
		
		openConfirmDialog(state, payload) {
      state.confirmDialog = {
        isOpen: true,
        cancelText: payload.cancelText ? payload.cancelText : 'Ne',
        confirmText: payload.confirmText ? payload.confirmText : 'Taip',
        body: payload.body,
        title: payload.title ? payload.title : '',
      };
		},
		
		closeConfirmDialog(state) {
      state.confirmDialog.isOpen = false;
    },
	},

	actions: {

	}
};
