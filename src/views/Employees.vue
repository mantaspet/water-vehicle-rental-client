<template>
  <div>
    <h1 class="mdc-typography--headline4">Darbuotojų sąrašas</h1>
    <button class="mdc-fab mdc-fab--extended" @click="createEmployee">
      <span class="material-icons mdc-fab__icon">add</span>
      <span class="mdc-fab__label">Sukurti naują</span>
    </button>
    <DataTable :items="$store.getters.employees">
      <template slot="headers">
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </template>
      <template slot="items">
        <tr v-for="(employee, index) in $store.getters.employees" :key="employee.id">
          <td>
            {{ employee.firstName }} {{ employee.lastName }}
            <span v-if="!employee.isActive" class="alert-text">(užblokuotas)</span>
          </td>
          <td>{{ employee.email }}</td>
          <td>{{ employee.timeCardNo }}</td>
          <td>{{ employee.nin }}</td>
          <td>
            <button
              v-if="employee.isActive"
              class="material-icons mdc-icon-button"
              title="Redaguoti"
              @click.stop="editEmployee(employee, index)"
            >edit</button>
            <button
              v-if="employee.isActive"
              class="material-icons mdc-icon-button"
              title="Blokuoti"
              @click.stop="suspendEmployee(employee, index)"
            >block</button>
          </td>
        </tr>
      </template>
    </DataTable>
    <EmployeeFormDialog
      :employee="$store.state.employees.selectedEmployee"
      :index="$store.state.employees.selectedEmployeeIndex"
    />
  </div>
</template>

<script>
import DataTable from "../components/DataTable";
import { MDCRipple } from "@material/ripple";
import EmployeeFormDialog from "../components/EmployeeFormDialog";

export default {
  name: "Employees",

  components: {
    DataTable,
    EmployeeFormDialog
  },

  data() {
    return {
      headers: [
        "Vardas pavardė",
        "El. paštas",
        "Tabelio nr.",
        "Asmens kodas",
        "Veiksmai"
      ]
    };
  },

  created() {
    this.$store.dispatch("getEmployees");
  },

  mounted() {
    const fabRipple = new MDCRipple(document.querySelector(".mdc-fab"));
    this.$store.commit("initEmployeeDialog");
  },

  methods: {
    createEmployee() {
      this.$store.commit("createEmployee");
    },

    editEmployee(employee, index) {
      this.$store.commit("editEmployee", {
        employee,
        index
      });
    },

    suspendEmployee(employee, index) {
      this.$store.dispatch("suspendEmployee", {
        employee,
        index
      });
    }
  }
};
</script>
