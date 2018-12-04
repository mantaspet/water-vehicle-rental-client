<template>
  <div id="employee-dialog" class="mdc-dialog">
    <div class="mdc-dialog__container">
      <form @submit.prevent="save">
        <div class="mdc-dialog__surface">
          <h2 class="mdc-dialog__title" id="my-dialog-title">{{ title }}</h2>
          <div class="mdc-dialog__content" id="my-dialog-content">
            <div id="first-name" class="mdc-text-field mdc-text-field--box">
              <input
                v-model="employee.firstName"
                type="text"
                class="mdc-text-field__input"
                id="first-name-input"
                required
              >
              <label :class="['mdc-floating-label', { 'mdc-floating-label--float-above': employee.firstName }]" for="first-name-input">Vardas</label>
              <div class="mdc-line-ripple"></div>
            </div>
            <div id="last-name" class="mdc-text-field mdc-text-field--box">
              <input
                v-model="employee.lastName"
                type="text"
                class="mdc-text-field__input"
                id="last-name-input"
                required
              >
              <label :class="['mdc-floating-label', { 'mdc-floating-label--float-above': employee.lastName }]" for="last-name-input">Pavardė</label>
              <div class="mdc-line-ripple"></div>
            </div>
            <div v-if="index === -1" id="email" class="mdc-text-field mdc-text-field--box">
              <input
                v-model="employee.email"
                type="email"
                class="mdc-text-field__input"
                id="email-input"
                required
              >
              <label :class="['mdc-floating-label', { 'mdc-floating-label--float-above': employee.email }]" for="email-input">El. paštas</label>
              <div class="mdc-line-ripple"></div>
            </div>
            <div id="time-card-no" class="mdc-text-field mdc-text-field--box">
              <input
                v-model="employee.timeCardNo"
                type="text"
                class="mdc-text-field__input"
                id="time-card-no-input"
                required
              >
              <label :class="['mdc-floating-label', { 'mdc-floating-label--float-above': employee.timeCardNo }]" for="time-card-no-input">Tabelio nr.</label>
              <div class="mdc-line-ripple"></div>
            </div>
            <div id="nin" class="mdc-text-field mdc-text-field--box">
              <input
                v-model="employee.nin"
                type="text"
                class="mdc-text-field__input"
                id="nin-input"
                required
              >
              <label :class="['mdc-floating-label', { 'mdc-floating-label--float-above': employee.nin }]" for="nin-input">Asmens kodas</label>
              <div class="mdc-line-ripple"></div>
            </div>
						<div v-if="index === -1" id="password" class="mdc-text-field mdc-text-field--box">
              <input
                v-model="employee.password"
                type="password"
                class="mdc-text-field__input"
                id="password-input"
                required
              >
              <label :class="['mdc-floating-label', { 'mdc-floating-label--float-above': employee.password }]" for="password-input">Slaptažodis</label>
              <div class="mdc-line-ripple"></div>
            </div>
						<div v-if="index === -1" id="repeat-password" class="mdc-text-field mdc-text-field--box">
              <input
                v-model="employee.repeatPassword"
                type="password"
                class="mdc-text-field__input"
                id="repeat-password-input"
                required
              >
              <label :class="['mdc-floating-label', { 'mdc-floating-label--float-above': employee.repeatPassword }]" for="repeat-password-input">Pakartokite slaptažodį</label>
              <div class="mdc-line-ripple"></div>
            </div>
          </div>
          <footer class="mdc-dialog__actions">
            <button
              type="button"
              class="mdc-button mdc-dialog__button"
              data-mdc-dialog-action="no"
            >Atšaukti</button>
            <button type="submit" class="mdc-button mdc-dialog__button">Išsaugoti</button>
          </footer>
        </div>
      </form>
    </div>
    <div class="mdc-dialog__scrim"></div>
  </div>
</template>

<script>
import { MDCTextField } from "@material/textfield";
import { MDCSelect } from "@material/select";

export default {
  name: "EmployeeFormDialog",

  props: {
    employee: Object,
    index: Number
  },

  data() {
    return {
			repeatPassword: '',
		};
  },

  computed: {
    title() {
      return this.index === -1
        ? "Naujas darbuotojas"
        : "Darbuotojo redagavimas";
    }
  },

  mounted() {
    new MDCTextField(document.querySelector("#first-name"));
    new MDCTextField(document.querySelector("#last-name"));
    new MDCTextField(document.querySelector("#email"));
    new MDCTextField(document.querySelector("#time-card-no"));
    new MDCTextField(document.querySelector("#nin"));
    new MDCTextField(document.querySelector("#password"));
    new MDCTextField(document.querySelector("#repeat-password"));
  },

  methods: {
    save() {
			this.employee.role = 'employee';
			this.employee.isActive = true;
      if (this.index > -1) {
        this.$store.dispatch("updateEmployee", this.employee).then(() => {
          this.$store.commit("openSnackbar", {
            message: "Darbuotojas atnaujintas"
          });
        });
      } else {
				if (this.employee.password === this.employee.repeatPassword) {
					const employee = JSON.parse(JSON.stringify(this.employee));
					delete employee.repeatPassword;
					this.$store.dispatch("createUser", employee);
				} else {
					this.$store.commit('openSnackbar', {
						message: 'Slaptažodžiai nesutampa',
					});
				}
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mdc-text-field,
.mdc-select {
  margin: 8px auto;
  width: 100%;
}
</style>
