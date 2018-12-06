import firebase from 'firebase';

export default {
	state: {
		tasks: [],
	},

	getters: {
		tasks(state) {
			return state.tasks.sort((task) => {
				return task.isCompleted ? -1 : 1;
			});
		},
	},

	mutations: {
		storeUpdatedTask(state, payload) {
			state.tasks.splice(payload.index, 1, payload.task);
		},

		storeTasks(state, tasks) {
			state.tasks = tasks;
		},

		storeNewTask(state, task) {
			state.tasks.push(task);
			state.taskDialog.close();
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

		saveNewTask({ commit, dispatch }, payload) {
			return new Promise((resolve) => {
				let task = payload.task;
				const file = payload.file;
				task.reservations = [];
				dispatch('uploadTaskImage', file).then(url => {
					task.imageUrl = url;
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
			});
		},

		updateTask({ commit }, payload) {
			return new Promise((resolve, reject) => {
				let task = payload.task;
				const id = task.id;
				delete task.id;
				firebase
					.firestore()
					.collection('tasks')
					.doc(id)
					.update(task)
					.then(() => {
						task.id = id;
						commit('storeUpdatedTask', {
							task,
							index: payload.index,
						});
						resolve();
					}).catch(() => {
						reject();
					});
			})
		},
	}
};
