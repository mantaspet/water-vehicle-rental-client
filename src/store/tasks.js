import firebase from 'firebase';

export default {
	state: {
		timeFrom: null,
		timeTo: null,
		tasks: [],
	},

	getters: {
		tasks(state) {
			let tasks;
			if (state.timeFrom && state.timeTo) {
				tasks = state.tasks.filter(task => task.time >= state.timeFrom && task.time <= state.timeTo);
			} else if (state.timeFrom) {
				tasks = state.tasks.filter(task => task.time >= state.timeFrom);
			} else if (state.timeTo) {
				tasks = state.tasks.filter(task => task.time <= state.timeTo);
			} else {
				tasks = state.tasks;
			}
			return tasks.sort((task, nextTask) => {
				if (task.isCompleted && !nextTask.isCompleted) {
					return 1;
				} else if (!task.isCompleted && nextTask.isCompleted) {
					return -1;
				} else if (task.time > nextTask.time) {
					return 1;
				} else {
					return -1;
				}
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

		filterTasks(state, payload) {
			state.timeFrom = payload.timeFrom;
			state.timeTo = payload.timeTo;
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

		getEmployeeTasks({ commit }, userId) {
			firebase
				.firestore()
				.collection('tasks')
				.where('closedBy', '==', userId)
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
