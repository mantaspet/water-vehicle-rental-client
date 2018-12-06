import firebase from 'firebase';
import { EventBus } from '../event-bus';
import router from '../router';
import { stat } from 'fs';

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

		getMyReservations({ commit, getters }) {
			const currentUserId = getters.currentUser.userId;
			firebase
        .firestore()
				.collection('reservations')
				.where('userId', '==', currentUserId)
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

		createReservation({ commit }, reservation) {
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
						resolve();
        	}).catch((err) => {
						commit("openSnackbar", {
							message: err.message,
						});
						reject();
					});
			});
		},
 
		createEmployeeTask({ commit }, reservation) {
			
		},
	}
};
