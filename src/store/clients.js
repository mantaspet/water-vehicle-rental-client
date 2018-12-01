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

		createClient({ commit }, client) {
			firebase
        .firestore()
        .collection("users")
        .doc(client.userId)
        .set(client)
        .then(() => {
          commit("storeCurrentUser", client);
					commit("hideProgress");
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

		suspendClient({ commit }) {
			commit('openConfirmDialog', {
        title: '',
        body: 'Blokuoti klientą?'
      });
      EventBus.$on('confirmDialogClosed', (confirmed) => {
        console.log(confirmed);
        if (confirmed) {
          //firebase.auth().
        }
        EventBus.$off('confirmDialogClosed');
      });
		}
	}
};
