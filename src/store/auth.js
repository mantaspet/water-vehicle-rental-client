import firebase from 'firebase';
import router from '../router';

export default {
	state: {
		authApp: null,
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
		// initalizing another firebase instance, because signing up the user instantly switches current user to it
		createUser({ state, commit, dispatch }, employee) {
			if (!state.authApp) {
				const config = {
					apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
					authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
					databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
					projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
					storageBucket: process.env.VUE_APP_FIREBASE_STORAGE_BUCKET,
					messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID,
				};
				state.authApp = firebase.initializeApp(config, "authApp");
			}

			state.authApp
				.auth()
				.createUserWithEmailAndPassword(employee.email, employee.password)
				.then(res => {
					employee.userId = res.user.uid;
					delete employee.password;
					dispatch('createEmployee', employee);
					state.authApp.auth().signOut();
				})
				.catch(err => {
					commit("openSnackbar", {
						message: err.message
					});
				});
		},

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
          dispatch('getCurrentUser', res.user.uid).then(() => {
						router.replace({ name: 'home' });
					});
        })
        .catch(err => {
          commit("hideProgress");
          commit("openSnackbar", {
            message: err.message
          });
        });
		},

		logout({ commit }) {
			commit('storeCurrentUser', {});
      firebase.auth().signOut().then(() => {
        router.replace({ name: 'login' });
      });
    },

		getCurrentUser({ commit, dispatch }, userId) {
			return new Promise((resolve, reject) => {
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
							resolve();
						} else {
							commit('openSnackbar', {
								message: 'Paskyra užblokuota',
							});
							commit("hideProgress");
							dispatch('logout');
							router.replace({ name: "login" });
							reject();
						}
					} else {
						commit('openSnackbar', {
							message: 'Naudotojas neegzistuoja',
						});
						commit("hideProgress");
						reject();
					}
				});
			});
		}
	}
};
