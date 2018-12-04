<template>
  <div>
    <div class="header-wrapper">
      <h1 class="mdc-typography--headline4">{{ title }}</h1>
      <div>
        <div id="date-from" class="mdc-text-field mdc-text-field--box">
          <input v-model="dateFrom" type="date" class="mdc-text-field__input" @input="filterReservations">
          <label class="mdc-floating-label" for="email-input">Data nuo</label>
          <div class="mdc-line-ripple"></div>
        </div>
        <div id="date-to" class="mdc-text-field mdc-text-field--box">
          <input v-model="dateTo" type="date" class="mdc-text-field__input" @input="filterReservations">
          <label class="mdc-floating-label" for="email-input">Data iki</label>
          <div class="mdc-line-ripple"></div>
        </div>
      </div>
    </div>
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
import { MDCTextField } from "@material/textfield";

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
      dateFrom: "",
			dateTo: "",
			timer: null,
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
		new MDCTextField(document.querySelector("#date-from"));
		new MDCTextField(document.querySelector("#date-to"));
  },

  methods: {
    viewReservationCreator(reservation) {
      this.$store.dispatch("getClient", reservation.userId).then(client => {
        this.createdBy = client;
        this.clientDialog.open();
      });
		},
		
		filterReservations() {
			clearTimeout(this.timer);
			this.timer = setTimeout(() => {
				const timeFrom = new Date(this.dateFrom).getTime();
				const timeTo = new Date(this.dateTo).getTime();
				this.$store.commit('filterReservations', {
					timeFrom,
					timeTo,
				});
			}, 500);
		},
  }
};
</script>

<style lang="scss" scoped>
.header-wrapper {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.mdc-text-field {
	margin-left: 12px;
}
</style>
