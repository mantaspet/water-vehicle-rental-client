import firebase from 'firebase';
import { EventBus } from '../event-bus';
import router from '../router';

export default {
	state: {
		reservations: [],
	},

	getters: {
		reservations(state) {
			return state.reservations;
		}
	},

	mutations: {
		storeReservations(state, reservations) {
			state.reservations = reservations;
		},

		storeReservation(state, reservation) {
			state.reservations.push(reservation);
		},
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
	}
};
