import { MDCDrawer } from '@material/drawer';
import { MDCSnackbar } from '@material/snackbar';
import { MDCDialog } from '@material/dialog';

export default {
	state: {
		drawer: null,
		snackbar: null,
		progress: false,
		confirmDialog: null,
		confirmDialogContent: {
			title: '',
			body: '',
		}
	},

	getters: {
		confirmDialogContent(state) {
			return state.confirmDialogContent;
		}
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

		showProgress(state) {
			state.progress = true;
		},

		hideProgress(state) {
			state.progress = false;
		},

		initConfirmDialog(state) {
			state.confirmDialog = new MDCDialog(document.querySelector("#confirm-dialog"));
		},
		
		openConfirmDialog(state, payload) {
			state.confirmDialogContent.title = payload.title;
			state.confirmDialogContent.body = payload.body;
			state.confirmDialog.open();
		},
	},

	actions: {

	}
};
