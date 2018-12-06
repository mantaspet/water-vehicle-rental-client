<template>
  <div>
    <h1 class="mdc-typography--headline4">Transporto priemonės</h1>
    <button class="mdc-fab mdc-fab--extended" @click="createVehicle">
      <span class="material-icons mdc-fab__icon">add</span>
      <span class="mdc-fab__label">Sukurti naują</span>
    </button>
    <ul class="mdc-image-list mdc-image-list--masonry vehicle-list">
      <li v-for="(vehicle, index) in $store.getters.vehicles" :key="vehicle.id" @click="viewVehicle(vehicle)" class="mdc-image-list__item mdc-card">
        <img class="mdc-image-list__image" :src="vehicle.imageUrl">
        <div class="mdc-image-list__supporting">
          <span class="mdc-typography--subtitle1">
            {{ vehicle.brand }} {{ vehicle.model }} ({{ vehicle.year }})
          </span>
        </div>
        <div class="mdc-card__actions">
          <!-- <div class="mdc-card__action-buttons">
            <button class="mdc-button mdc-card__action mdc-card__action--button">Redaguoti</button>
            <button class="mdc-button mdc-card__action mdc-card__action--button">Trinti</button>
          </div> -->
          <div class="mdc-card__action-icons">
            <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Redaguoti" @click.stop="editVehicle(vehicle, index)">edit</button>
            <button class="material-icons mdc-icon-button mdc-card__action mdc-card__action--icon" title="Trinti" @click.stop="deleteVehicle(vehicle, index)">delete</button>
          </div>
        </div>
      </li>
    </ul>
    <VehicleFormDialog
      :vehicle="$store.state.vehicles.selectedVehicle"
      :index="$store.state.vehicles.selectedVehicleIndex"
    />
  </div>
</template>

<script>
import { MDCRipple } from "@material/ripple";
import VehicleFormDialog from "../components/VehicleFormDialog";

export default {
  name: "Vehicles",

  components: {
    VehicleFormDialog,
  },

  data() {
    return {
      headers: ["Nuotrauka", "Markė", "Modelis", "Metai", "Veiksmai"]
    };
  },

  created() {
    this.$store.dispatch('getVehicles');
  },

  mounted() {
    const fabRipple = new MDCRipple(document.querySelector(".mdc-fab"));
    this.$store.commit("initVehicleDialog");
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
    },

    viewVehicle(vehicle) {
      this.$store.commit('setSelectedVehicle', vehicle);
      this.$router.push({ name: 'vehicle', params: { id: vehicle.id } });
    },
  }
};
</script>

<style lang="scss" scoped>
.mdc-image-list {
  padding: 1px;
}
</style>
