import firebase from 'firebase';

export default {
	state: {
		tasks: [],
	},

	getters: {
		tasks(state) {
			return state.tasks.sort((task, nextTask) => {
				return task.isCompleted - nextTask.isCompleted;
			});
		},
	},

	mutations: {
		storeUpdatedTask(state, updatedTask) {
			const index = state.tasks.findIndex(task => task.id === updatedTask.id);
			state.tasks.splice(index, 1, updatedTask);
		},

		storeTasks(state, tasks) {
			state.tasks = tasks;
		},

		storeNewTask(state, task) {
			state.tasks.push(task);
		},
	},

	actions: {
		getTasks({ commit }) {
			firebase
				.firestore()
				.collection('tasks')
				.get()
				.then(res => {
					let task;
					const tasks = [];
					res.forEach(doc => {
						task = doc.data();
						task.id = doc.id;
						tasks.push(task);
					});
					commit('storeTasks', tasks);
				});
		},

		saveNewTask({ commit }, reservation) {
			return new Promise((resolve) => {
				let task = {
					time: reservation.time,
					vehicle: reservation.vehicle,
					isCompleted: false,
				};
				firebase
					.firestore()
					.collection('tasks')
					.add(task)
					.then((res) => {
						task.id = res.id;
						commit('storeNewTask', task);
						resolve(task);
					});
			});
		},

		updateTask({ commit, getters }, task) {
			return new Promise((resolve, reject) => {
				const id = task.id;
				delete task.id;
				if (task.isCompleted) {
					task.closedBy = getters.currentUser.userId;
				} else {
					delete task.closedBy;
				}
				firebase
					.firestore()
					.collection('tasks')
					.doc(id)
					.update(task)
					.then(() => {
						task.id = id;
						commit('storeUpdatedTask', task);
						resolve();
					}).catch(() => {
						reject();
					});
			})
		},
	}
};
