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
					commit("openSnackbar", {
						message: "Registracija sėkminga"
					});
					client.userId = res.user.uid;
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

		getCurrentUser({ commit }, userId) {
			firebase
				.firestore()
				.collection('users')
				.doc(userId)
				.get()
				.then(doc => {
					if (doc.exists) {
						commit('storeCurrentUser', doc.data());
						commit("hideProgress");
						router.replace({ name: "home" });
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
