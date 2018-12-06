import firebase from 'firebase';

export default {
	state: {
		reviews: [],
	},

	getters: {
		reviews(state) {
			return state.reviews.filter(review => review.comment);
		},
	},

	mutations: {
		storeReviews(state, reviews) {
			state.reviews = reviews;
		},
	},

	actions: {
		getReviews({ commit }) {
			firebase
				.firestore()
				.collection('reviews')
				.get()
				.then(res => {
					let review;
					const reviews = [];
					res.forEach(doc => {
						review = doc.data();
						review.id = doc.id;
						reviews.push(review);
					});
					commit('storeReviews', reviews);
				});
		},

		createReview({ commit, dispatch }, payload) {
			return new Promise((resolve) => {
				let reservation = payload.reservation;
				reservation.wasReviewed = true;
				const review = payload.review;
				firebase
					.firestore()
					.collection("reviews")
					.add(review)
					.then(() => {
						dispatch("updateReservation", reservation).then(() => {
							commit("openSnackbar", {
								message: "Jūsų įvertinimas išsaugotas. Ačiū, kad naudojatės mūsų paslaugomis!"
							});
							resolve();
						});
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
