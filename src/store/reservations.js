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
				.where('role', '==', 'client')
        .get()
        .then(res => {
					const clients = [];
          res.forEach(doc => {
            clients.push(doc.data());
					});
					commit('storeClients', clients);
        });
		},

		getMyReservations({ commit }) {
			firebase
        .firestore()
				.collection('reservations')
				.where('role', '==', 'client')
        .get()
        .then(res => {
					const clients = [];
          res.forEach(doc => {
            clients.push(doc.data());
					});
					commit('storeClients', clients);
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
