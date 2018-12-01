import firebase from 'firebase';
import { EventBus } from '../event-bus';
import router from '../router';
import { MDCDialog } from '@material/dialog';

export default {
	state: {
		vehicles: [],
		vehicle: {},
		vehicleIndex: -1,
		vehicleDialog: null,
	},

	getters: {
		vehicles(state) {
			return state.vehicles;
		}
	},

	mutations: {
		initVehicleDialog(state) {
			state.vehicleDialog = new MDCDialog(document.querySelector("#vehicle-dialog"));
		},

		createVehicle(state) {
			state.vehicle = {};
			state.vehicleIndex = -1;
			state.vehicleDialog.open();
		},

		storeVehicle(state, vehicle) {
			state.vehicles.push(vehicle);
			state.vehicleDialog.close();
		}
	},

	actions: {
		saveNewVehicle({ commit }, vehicle) {
			firebase
				.firestore()
				.collection('vehicles')
				.add(vehicle)
				.then(() => {
					commit('storeVehicle', vehicle);
					commit('openSnackbar', {
						message: 'Transporto priemonė sukurta',
					});
				});
		}
	}
};
