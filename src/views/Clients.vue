<template>
  <div>
    <h2>Klientų sąrašas</h2>
    <DataTable>
      <template slot="headers">
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </template>
      <template slot="items">
        <tr v-for="client in $store.getters.clients" :key="client.email">
          <td>{{ client.firstName }} {{ client.lastName }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.accountNo }}</td>
          <td>{{ client.dob }}</td>
          <td>
            <button
              class="material-icons mdc-icon-button"
              title="Blokuoti"
              @click="suspendClient"
            >block</button>
          </td>
        </tr>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "../components/DataTable";
import firebase from "firebase";

export default {
  name: "Clients",

  components: {
    DataTable
  },

  data() {
    return {
      headers: ["Vardas pavardė", "El. paštas", "Sąskaitos nr.", "Gimimo data", "Veiksmai"]
    };
  },

  created() {
    this.$store.dispatch('getClients');
  },
  
  methods: {
    suspendClient() {
      this.$store.dispatch('suspendClient');
    }
  }
};
</script>

