<template>
  <div>
    <h1 class="mdc-typography--headline4">Klientai</h1>
    <DataTable :items="$store.getters.clients">
      <template slot="headers">
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </template>
      <template slot="items">
        <tr v-for="client in $store.getters.clients" :key="client.email">
          <td>{{ client.firstName }} {{ client.lastName }} <span v-if="!client.isActive" class="alert-text">(užblokuotas)</span></td>
          <td>{{ client.email }}</td>
          <td>{{ client.accountNo }}</td>
          <td>{{ client.dob }}</td>
          <td>
            <button
              v-if="client.isActive"
              class="material-icons mdc-icon-button"
              title="Blokuoti"
              @click="suspendClient(client)"
            >block</button>
          </td>
        </tr>
      </template>
    </DataTable>
  </div>
</template>

<script>
import DataTable from "../components/DataTable";

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
    suspendClient(client) {
      this.$store.dispatch('suspendClient', client);
    }
  }
};
</script>

