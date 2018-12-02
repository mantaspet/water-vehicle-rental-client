import firebase from 'firebase';
import router from '../router';

export default {
	state: {
		currentUser: {},
	},

	getters: {
		currentUser(state) {
			return state.currentUser;
		}
	},

	mutations: {
		storeCurrentUser(state, user) {
			state.currentUser = user;
		}
	},

	actions: {
		signUp({ commit, dispatch }, client) {
			commit("showProgress");
			firebase
				.auth()
				.createUserWithEmailAndPassword(client.email, client.password)
				.then(res => {
					client.userId = res.user.uid;
					delete client.password;
					dispatch('createClient', client);
				})
				.catch(err => {
					commit("openSnackbar", {
						message: err.message
					});
				});
		},

		login({ commit, dispatch }, userData) {
			commit("showProgress");
      firebase
        .auth()
        .signInWithEmailAndPassword(userData.email, userData.password)
        .then(res => {
          dispatch('getCurrentUser', res.user.uid);
        })
        .catch(err => {
          commit("hideProgress");
          commit("openSnackbar", {
            message: err.message
          });
        });
		},

		logout() {
      firebase.auth().signOut().then(() => {
        router.replace({ name: 'login' });
      });
    },

		getCurrentUser({ commit, dispatch }, userId) {
			firebase
				.firestore()
				.collection('users')
				.doc(userId)
				.get()
				.then(doc => {
					if (doc.exists) {
						if (doc.data().isActive) {
							commit('storeCurrentUser', doc.data());
							commit("hideProgress");
							router.replace({ name: "home" });
						} else {
							commit('openSnackbar', {
								message: 'Paskyra užblokuota',
							});
							commit("hideProgress");
							dispatch('logout');
							router.replace({ name: "login" });
						}
					} else {
						commit('openSnackbar', {
							message: 'Naudotojas neegzistuoja',
						});
						commit("hideProgress");
					}
				});
		}
	}
};
