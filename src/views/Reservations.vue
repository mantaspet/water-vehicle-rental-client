<template>
	<div>
		<h1 class="mdc-typography--headline4">
			{{ title }}
		</h1>
		<DataTable>
      <template slot="headers">
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </template>
      <template slot="items">
        <tr v-for="reservation in $store.getters.reservations" :key="reservation.id">
          <td>{{ reservation.vehicle }}</td>
          <td>{{ reservation.route }}</td>
          <td>{{ $getFormattedDate(reservation.time) }}</td>
        </tr>
      </template>
    </DataTable>
	</div>
</template>

<script>
import DataTable from "../components/DataTable";

export default {
	name: 'Reservations',

	components: {
		DataTable,
	},

  data() {
    return {
      headers: ["Transporto priemonė", "Maršrutas", "Data"]
    };
  },

	computed: {
		title() {
			return this.$store.getters.currentUser.role === 'admin' ? 'Rezervacijų sąrašas' : 'Jūsų rezervacijos';
		},
	},

	created() {
		if (this.$store.getters.currentUser.role === 'admin') {
			this.$store.dispatch('getAllReservations');
		} else {
			this.$store.dispatch('getMyReservations');
		}
	},
}
</script>

<style>

</style>
