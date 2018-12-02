<template>
  <div>
    <h2>Transporto priemonių sąrašas</h2>
    <button class="mdc-fab mdc-fab--extended" @click="createVehicle">
      <span class="material-icons mdc-fab__icon">add</span>
      <span class="mdc-fab__label">Sukurti naują</span>
    </button>
    <DataTable clickable-rows>
      <template slot="headers">
        <th v-for="header in headers" :key="header">{{ header }}</th>
      </template>
      <template slot="items">
        <tr v-for="(vehicle, index) in $store.getters.vehicles" :key="vehicle.id">
          <td>{{ vehicle.brand }}</td>
          <td>{{ vehicle.model }}</td>
          <td>{{ vehicle.year }}</td>
          <td>
            <button
              class="material-icons mdc-icon-button"
              title="Redaguoti"
              @click="editVehicle(vehicle, index)"
            >edit</button>
            <button
              class="material-icons mdc-icon-button"
              title="Trinti"
              @click="deleteVehicle(vehicle, index)"
            >delete</button>
          </td>
        </tr>
      </template>
    </DataTable>
    <VehicleFormDialog
      :vehicle="$store.state.vehicles.vehicle"
      :index="$store.state.vehicles.vehicleIndex"
    />
  </div>
</template>

<script>
import DataTable from "../components/DataTable";
import VehicleFormDialog from "../components/VehicleFormDialog";

export default {
  name: "Vehicles",

  components: {
    DataTable,
    VehicleFormDialog,
  },

  data() {
    return {
      headers: ["Markė", "Modelis", "Metai", "Veiksmai"]
    };
  },

  created() {
    this.$store.dispatch('getVehicles');
  },

  methods: {
    createVehicle() {
      this.$store.commit("createVehicle");
    },

    editVehicle(vehicle, index) {
      this.$store.commit("editVehicle", {
        vehicle,
        index,
      });
    },

    deleteVehicle(vehicle, index) {
      this.$store.dispatch('deleteVehicle', {
        vehicle,
        index,
      })
    }
  }
};
</script>
