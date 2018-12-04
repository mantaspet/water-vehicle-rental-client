import firebase from 'firebase';
import { EventBus } from '../event-bus';
import router from '../router';

export default {
	state: {
		clients: [],
	},

	getters: {
		clients(state) {
			return state.clients;
		}
	},

	mutations: {
		storeClients(state, clients) {
			state.clients = clients;
		},

		updateClient(state, updatedClient) {
			const index = state.clients.findIndex(client => client.userId === updatedClient.userId);
			state.clients.splice(index, 1, updatedClient);
		}
	},

	actions: {
		getClients({ commit }) {
			firebase
        .firestore()
				.collection('users')
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

		getClient({}, id) {
			return new Promise((resolve) => {
				firebase
        .firestore()
				.collection('users')
				.doc(id)
        .get()
        .then(res => {
					resolve(res.data());
        });
			});
		},

		createClient({ commit }, client) {
			firebase
        .firestore()
        .collection("users")
        .doc(client.userId)
        .set(client)
        .then(() => {
          commit("storeCurrentUser", client);
					commit("hideProgress");
					commit("openSnackbar", {
						message: "Registracija sėkminga"
					});
					router.replace({ name: "home" });
        })
        .catch(err => {
          commit("hideProgress");
          commit("openSnackbar", {
            message: err.message
          });
          firebase.auth().currentUser.delete();
        });
		},

		suspendClient({ commit }, client) {
			commit('openConfirmDialog', {
        title: '',
        body: 'Blokuoti klientą?'
      });
      EventBus.$on('confirmDialogClosed', (confirmed) => {
        if (confirmed) {
					client.isActive = false;
					firebase
						.firestore()
						.collection('users')
						.doc(client.userId)
						.set(client)
						.then(() => {
							commit('updateClient', client);
							commit('openSnackbar', {
								message: 'Klientas užblokuotas',
							});
						});
        }
        EventBus.$off('confirmDialogClosed');
      });
		}
	}
};
