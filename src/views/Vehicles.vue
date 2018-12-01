<template>
  <div>
    <h2>Transporto priemonių sąrašas</h2>
    <button class="mdc-fab mdc-fab--extended" @click="createVehicle">
      <span class="material-icons mdc-fab__icon">add</span>
      <span class="mdc-fab__label">Sukurti naują</span>
    </button>
    <VehicleFormDialog
      :vehicle="$store.state.vehicles.vehicle"
      :index="$store.state.vehicles.vehicleIndex"
    />
  </div>
</template>

<script>
import { MDCRipple } from "@material/ripple";
import VehicleFormDialog from "../components/VehicleFormDialog";

export default {
  name: "Vehicles",

  components: {
    VehicleFormDialog
  },

  mounted() {
    const fabRipple = new MDCRipple(document.querySelector(".mdc-fab"));
    this.$store.commit("initVehicleDialog");
  },

  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },

    createVehicle() {
      this.$store.commit("createVehicle");
    }
  }
};
</script>
