<template>
  <div>
    <div class="header-wrapper">
      <h1 class="mdc-typography--headline4">Užduotys</h1>
      <div style="display: flex">
        <div v-show="$userRole('admin')" id="employee" class="mdc-select">
          <i class="mdc-select__dropdown-icon"></i>
          <select
            v-model="selectedEmployee"
            class="mdc-select__native-control"
            @change="getEmployeeTasks"
          >
            <option :value="null"></option>
            <option
              v-for="employee in $store.getters.employees"
              :key="employee.userId"
              :value="employee"
            >{{ `${employee.firstName} ${employee.lastName}` }}</option>
          </select>
          <label class="mdc-floating-label">Darbuotojas</label>
          <div class="mdc-line-ripple"></div>
        </div>
        <div id="date-from" class="mdc-text-field mdc-text-field--box">
          <input v-model="dateFrom" type="date" class="mdc-text-field__input" @input="filterTasks">
          <label class="mdc-floating-label" for="email-input">Data nuo</label>
          <div class="mdc-line-ripple"></div>
        </div>
        <div id="date-to" class="mdc-text-field mdc-text-field--box">
          <input v-model="dateTo" type="date" class="mdc-text-field__input" @input="filterTasks">
          <label class="mdc-floating-label" for="email-input">Data iki</label>
          <div class="mdc-line-ripple"></div>
        </div>
      </div>
    </div>
    <TaskList :tasks="$store.getters.tasks"/>
  </div>
</template>

<script>
import TaskList from "../components/TaskList";
import { MDCTextField } from "@material/textfield";
import { MDCSelect } from "@material/select";

export default {
  name: "Tasks",

  components: {
    TaskList
  },

  data() {
    return {
      dateFrom: "",
      dateTo: "",
      timer: null,
      selectedEmployee: null
    };
  },

  created() {
    this.$store.dispatch("getTasks");
    if (this.$userRole("admin")) {
      this.$store.dispatch("getEmployees");
    }
  },

  mounted() {
    new MDCTextField(document.querySelector("#date-from"));
    new MDCTextField(document.querySelector("#date-to"));
    new MDCSelect(document.querySelector("#employee"));
  },

  methods: {
    suspendClient(client) {
      this.$store.dispatch("suspendClient", client);
    },

    filterTasks() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        const timeFrom = new Date(this.dateFrom).getTime();
        const timeTo = new Date(this.dateTo).getTime();
        this.$store.commit("filterTasks", {
          timeFrom,
          timeTo
        });
      }, 500);
    },

    getEmployeeTasks() {
      if (this.selectedEmployee) {
        this.$store.dispatch("getEmployeeTasks", this.selectedEmployee.userId);
      } else {
        this.$store.dispatch("getTasks");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.mdc-text-field,
.mdc-select {
  margin-left: 12px;
}

.mdc-select {
	min-width: 192px;
}
</style>

