import firebase from 'firebase';
import router from '../router';

export default {
	state: {
		timeFrom: null,
		timeTo: null,
		reservations: [],
	},

	getters: {
		reservations(state) {
			let reservations;
			if (state.timeFrom && state.timeTo) {
				reservations = state.reservations.filter(reservation => reservation.time >= state.timeFrom && reservation.time <= state.timeTo);
			} else if (state.timeFrom) {
				reservations = state.reservations.filter(reservation => reservation.time >= state.timeFrom);
			} else if (state.timeTo) {
				reservations = state.reservations.filter(reservation => reservation.time <= state.timeTo);
			} else {
				reservations = state.reservations;
			}
			return reservations;
		}
	},

	mutations: {
		storeReservations(state, reservations) {
			state.reservations = reservations;
		},

		storeReservation(state, reservation) {
			state.reservations.push(reservation);
		},

		storeUpdateReservation(state, updatedReservation) {
			const index = state.reservations.findIndex(reservation => reservation.id === updatedReservation.id);
			state.reservations.splice(index, 1, updatedReservation);
		},

		filterReservations(state, payload) {
			state.timeFrom = payload.timeFrom;
			state.timeTo = payload.timeTo;
		}
	},

	actions: {
		getAllReservations({ commit }) {
			firebase
        .firestore()
				.collection('reservations')
        .get()
        .then(res => {
					let reservation;
					const reservations = [];
          res.forEach(doc => {
						reservation = doc.data();
						reservation.id = doc.id;
            reservations.push(reservation);
					});
					commit('storeReservations', reservations);
        });
		},

		getClientReservations({ commit }, userId) {
			firebase
        .firestore()
				.collection('reservations')
				.where('userId', '==', userId)
        .get()
        .then(res => {
					let reservation;
					const reservations = [];
          res.forEach(doc => {
            reservation = doc.data();
						reservation.id = doc.id;
            reservations.push(reservation);
					});
					commit('storeReservations', reservations);
        });
		},

		createReservation({ commit, dispatch }, reservation) {
			return new Promise((resolve, reject) => {
				firebase
					.firestore()
					.collection("reservations")
					.add(reservation)
					.then((res) => {
						reservation.id = res.id;
						commit("storeReservation", reservation);
						commit("openSnackbar", {
							message: "Rezervacija sukurta"
						});
						router.push({ name: 'reservations' });
						dispatch('saveNewTask', reservation);
						resolve();
        	}).catch((err) => {
						commit("openSnackbar", {
							message: err.message,
						});
						reject();
					});
			});
		},

		updateReservation({ commit }, reservation) {
			return new Promise((resolve, reject) => {
				const id = reservation.id;
				delete reservation.id;
				console.log(reservation);
				firebase
					.firestore()
					.collection("reservations")
					.doc(id)
					.update(reservation)
					.then(() => {
						reservation.id = id;
						commit("storeUpdateReservation", reservation);
						resolve();
        	}).catch((err) => {
						commit("openSnackbar", {
							message: err.message,
						});
						reject();
					});
			});
		},
	}
};
