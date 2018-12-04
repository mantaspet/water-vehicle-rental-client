import firebase from 'firebase';
import { EventBus } from '../event-bus';
import router from '../router';
import { MDCDialog } from '@material/dialog';

export default {
	state: {
		employees: [],
		selectedEmployee: {},
		selectedEmployeeIndex: -1,
		employeeDialog: null,
	},

	getters: {
		employees(state) {
			return state.employees;
		},

		employee(state) {
			return state.selectedEmployee;
		},
	},

	mutations: {
		initEmployeeDialog(state) {
			state.employeeDialog = new MDCDialog(document.querySelector("#employee-dialog"));
		},

		storeUpdatedEmployee(state, employee) {
			if (state.selectedEmployeeIndex >= 0) {
				state.employees.splice(state.selectedEmployeeIndex, 1, employee);
			}
			if (state.employeeDialog) {
				state.employeeDialog.close();
			}
		},

		storeEmployees(state, employees) {
			state.employees = employees;
		},

		createEmployee(state) {
			state.selectedEmployee = {};
			state.selectedEmployeeIndex = -1;
			state.employeeDialog.open();
		},

		editEmployee(state, payload) {
			state.selectedEmployee = JSON.parse(JSON.stringify(payload.employee));
			state.selectedEmployeeIndex = payload.index;
			state.employeeDialog.open();
		},

		storeNewEmployee(state, employee) {
			state.employees.push(employee);
			state.employeeDialog.close();
		},

		setSelectedEmployee(state, employee) {
			state.selectedEmployee = employee;
		},

		setEmployeeIndex(state, index) {
			state.employees.selectedEmployeeIndex = index;
		},

		removeEmployee(state, index) {
			state.employees.splice(index, 1);
		},
	},

	actions: {
		getEmployees({ commit }) {
			firebase
				.firestore()
				.collection('users')
				.where('role', '==', 'employee')
				.get()
				.then(res => {
					let employee;
					const employees = [];
					res.forEach(doc => {
						employee = doc.data();
						employee.id = doc.id;
						employees.push(employee);
					});
					commit('storeEmployees', employees);
				});
		},

		getEmployee({}, id) {
			return new Promise((resolve, reject) => {
				firebase
				.firestore()
				.collection('users')
				.doc(id)
				.get()
				.then(doc => {
					let employee = doc.data();
					employee.id = id;
					resolve(employee);
				}).catch(() => reject());
			});
		},

		createEmployee({ commit }, employee) {
			firebase
				.firestore()
				.collection('users')
				.doc(employee.userId)
        .set(employee)
				.then((res) => {
					commit('storeNewEmployee', employee);
					commit('openSnackbar', {
						message: 'Darbuotojas sukurtas',
					});
				});
		},

		updateEmployee({ commit }, employee) {
			return new Promise((resolve) => {
				const id = employee.id;
				delete employee.id;
				firebase
					.firestore()
					.collection('users')
					.doc(id)
					.update(employee)
					.then(() => {
						employee.id = id;
						resolve();
						commit('storeUpdatedEmployee', employee);
					});
			})
		},

		suspendEmployee({ commit }, payload) {
			commit('openConfirmDialog', {
        title: '',
        body: 'Blokuoti darbuotoją?'
      });
      EventBus.$on('confirmDialogClosed', (confirmed) => {
        if (confirmed) {
					payload.employee.isActive = false;
					firebase
						.firestore()
						.collection('users')
						.doc(payload.employee.userId)
						.set(payload.employee)
						.then(() => {
							commit('setEmployeeIndex', payload.index);
							commit('storeUpdatedEmployee', payload.employee);
							commit('openSnackbar', {
								message: 'Darbuotojas užblokuotas',
							});
						});
        }
        EventBus.$off('confirmDialogClosed');
      });
		},
	}
};
