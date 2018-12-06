import firebase from 'firebase';
import { EventBus } from '../event-bus';
import router from '../router';
import { MDCDialog } from '@material/dialog';

export default {
	state: {
		vehicles: [],
		selectedVehicle: {},
		selectedVehicleIndex: -1,
		vehicleDialog: null,
	},

	getters: {
		vehicles(state) {
			return state.vehicles;
		},

		vehicle(state) {
			return state.selectedVehicle;
		},
	},

	mutations: {
		initVehicleDialog(state) {
			state.vehicleDialog = new MDCDialog(document.querySelector("#vehicle-dialog"));
		},

		storeUpdatedVehicle(state, vehicle) {
			if (state.selectedVehicleIndex >= 0) {
				state.vehicles.splice(state.selectedVehicleIndex, 1, vehicle);
			}
			if (state.vehicleDialog) {
				state.vehicleDialog.close();
			}
		},

		storeVehicles(state, vehicles) {
			state.vehicles = vehicles;
		},

		createVehicle(state) {
			state.selectedVehicle = {
				status: 'Paruošta naudojimui'
			};
			state.selectedVehicleIndex = -1;
			state.vehicleDialog.open();
		},

		editVehicle(state, payload) {
			state.selectedVehicle = JSON.parse(JSON.stringify(payload.vehicle));
			state.selectedVehicleIndex = payload.index;
			state.vehicleDialog.open();
		},

		storeNewVehicle(state, vehicle) {
			state.vehicles.push(vehicle);
			state.vehicleDialog.close();
		},

		setSelectedVehicle(state, vehicle) {
			state.selectedVehicle = vehicle;
		},

		removeVehicle(state, index) {
			state.vehicles.splice(index, 1);
		},
	},

	actions: {
		uploadVehicleImage({}, file) {
			return new Promise((resolve,) => {
				const metadata = {
					contentType: file.type
				};

				const uploadTask = firebase
					.storage()
					.ref()
					.child('vehicles/' + file.name)
					.put(file, metadata);			

				// Listen for state changes, errors, and completion of the upload.
				uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,	function(snapshot) {
					// Track progress here
				}, function(error) {
					// React to errors. A full list of error codes is available at
					// https://firebase.google.com/docs/storage/web/handle-errors
				}, function() {
					// Upload completed successfully, now we can get the download URL
					uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
						resolve(downloadURL);
					});
				});
			});
		},

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

		getVehicle({}, id) {
			return new Promise((resolve, reject) => {
				firebase
				.firestore()
				.collection('vehicles')
				.doc(id)
				.get()
				.then(doc => {
					let vehicle = doc.data();
					vehicle.id = id;
					resolve(vehicle);
				}).catch(() => reject());
			});
		},

		saveNewVehicle({ commit, dispatch }, payload) {
			return new Promise((resolve) => {
				let vehicle = payload.vehicle;
				const file = payload.file;
				vehicle.reservations = [];
				dispatch('uploadVehicleImage', file).then(url => {
					vehicle.imageUrl = url;
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
							resolve(vehicle);
						});
				});
			});
		},

		prepareForUpdate({ dispatch }, payload) {
			return new Promise((resolve) => {
				let vehicle = payload.vehicle;
				if (payload.file) {
					const file = payload.file;
					dispatch('uploadVehicleImage', file).then(url => {
						vehicle.imageUrl = url;
						dispatch('updateVehicle', vehicle).then(() => {
							resolve();
						});
					});
				} else {
					dispatch('updateVehicle', vehicle).then(() => {
						resolve();
					});
				}
			});
		},

		updateVehicle({ commit }, vehicle) {
			return new Promise((resolve) => {
				const id = vehicle.id;
				delete vehicle.id;
				firebase
					.firestore()
					.collection('vehicles')
					.doc(id)
					.update(vehicle)
					.then(() => {
						vehicle.id = id;
						resolve();
						commit('storeUpdatedVehicle', vehicle);
					});
			})
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
