<template>
  <div>
    <h1 class="mdc-typography--headline4">{{ title }}</h1>
    <DataTable :items="$store.getters.reservations">
      <template slot="headers">
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </template>
      <template slot="items">
        <tr v-for="reservation in $store.getters.reservations" :key="reservation.id">
          <td>{{ reservation.vehicle }}</td>
          <td>{{ reservation.route }}</td>
          <td>{{ $getFormattedDate(reservation.time) }}</td>
          <td>
            <button
              class="material-icons mdc-icon-button"
              title="Peržiūrėti kliento info"
              @click.stop="viewReservationCreator(reservation)"
            >person</button>
          </td>
        </tr>
      </template>
    </DataTable>
    <ClientInfoDialog :client="createdBy"/>
  </div>
</template>

<script>
import DataTable from "../components/DataTable";
import ClientInfoDialog from "../components/ClientInfoDialog";
import { MDCDialog } from "@material/dialog";

export default {
  name: "Reservations",

  components: {
    DataTable,
    ClientInfoDialog
  },

  data() {
    return {
      clientDialog: null,
      createdBy: {},
      headers: ["Transporto priemonė", "Maršrutas", "Data", "Klientas"]
    };
  },

  computed: {
    title() {
      return this.$store.getters.currentUser.role === "admin"
        ? "Rezervacijų sąrašas"
        : "Jūsų rezervacijos";
    }
  },

  created() {
    if (this.$store.getters.currentUser.role === "admin") {
      this.$store.dispatch("getAllReservations");
    } else {
      this.$store.dispatch("getMyReservations");
    }
  },

  mounted() {
    this.clientDialog = new MDCDialog(
      document.querySelector("#client-info-dialog")
    );
  },

  methods: {
    viewReservationCreator(reservation) {
      this.$store.dispatch("getClient", reservation.userId).then(client => {
        this.createdBy = client;
        this.clientDialog.open();
      });
    }
  }
};
</script>
