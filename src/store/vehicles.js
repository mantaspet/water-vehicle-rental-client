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

		storeUpdatedVehicle(state, vehicle) {
			state.vehicles.splice(state.vehicleIndex, 1, vehicle);
			state.vehicleDialog.close();
		},

		storeVehicles(state, vehicles) {
			state.vehicles = vehicles;
		},

		createVehicle(state) {
			state.vehicle = {};
			state.vehicleIndex = -1;
			state.vehicleDialog.open();
		},

		editVehicle(state, payload) {
			state.vehicle = JSON.parse(JSON.stringify(payload.vehicle));
			state.vehicleIndex = payload.index;
			state.vehicleDialog.open();
		},

		storeNewVehicle(state, vehicle) {
			state.vehicles.push(vehicle);
			state.vehicleDialog.close();
		},

		removeVehicle(state, index) {
			state.vehicles.splice(index, 1);
		},
	},

	actions: {
		getVehicles({ commit }) {
			firebase
				.firestore()
				.collection('vehicles')
				.get()
				.then(res => {
					let vehicle;
					const vehicles = [];
					res.forEach(doc => {
						vehicle = doc.data();
						vehicle.id = doc.id;
						vehicles.push(vehicle);
					});
					commit('storeVehicles', vehicles);
				});
		},

		saveNewVehicle({ commit }, vehicle) {
			firebase
				.firestore()
				.collection('vehicles')
				.add(vehicle)
				.then((res) => {
					vehicle.id = res.id;
					commit('storeNewVehicle', vehicle);
					commit('openSnackbar', {
						message: 'Transporto priemonė sukurta',
					});
				});
		},

		updateVehicle({ commit }, vehicle) {
			const id = vehicle.id;
			delete vehicle.id;
			firebase
				.firestore()
				.collection('vehicles')
				.doc(id)
				.update(vehicle)
				.then(() => {
					vehicle.id = id;
					commit('storeUpdatedVehicle', vehicle);
					commit('openSnackbar', {
						message: 'Transporto priemonė atnaujinta',
					});
				});
		},

		deleteVehicle({ commit }, payload) {
			commit('openConfirmDialog', {
        title: '',
        body: 'Ištrinti transporto priemonę?'
      });
      EventBus.$on('confirmDialogClosed', (confirmed) => {
        if (confirmed) {
					firebase
						.firestore()
						.collection('vehicles')
						.doc(payload.vehicle.id)
						.delete()
						.then(() => {
							commit('removeVehicle', payload.index);
							commit('openSnackbar', {
								message: 'Transporto priemonė ištrinta',
							});
						});
        }
        EventBus.$off('confirmDialogClosed');
      });
		}
	}
};
