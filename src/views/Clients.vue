<template>
  <div>
    <h2>Klientų sąrašas</h2>

    <DataTable>
      <template slot="headers">
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </template>
      <template slot="items">
        <tr v-for="client in clients" :key="client.email">
          <td>{{ client.name }}</td>
          <td>{{ client.email }}</td>
          <td>{{ client.userId }}</td>
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
      clients: [],
      headers: ["Vardas", "El. paštas", "Naudotojo ID"]
    };
  },

  created() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      firebase
        .firestore()
        .collection("clients")
        .get()
        .then(res => {
          res.forEach(doc => {
            this.clients.push(doc.data());
          });
          console.log(JSON.parse(JSON.stringify(this.clients)));
        });
    }
  }
};
</script>

