<template>
  <div id="vehicle-dialog" class="mdc-dialog">
    <div class="mdc-dialog__container">
      <form @submit.prevent="save">
        <div class="mdc-dialog__surface">
          <h2 class="mdc-dialog__title" id="my-dialog-title">{{ title }}</h2>
          <div class="mdc-dialog__content" id="my-dialog-content">
            <div id="brand" class="mdc-text-field mdc-text-field--box">
              <input
                v-model="vehicle.brand"
                type="text"
                class="mdc-text-field__input"
                id="brand-input"
                required
              >
              <label
                :class="['mdc-floating-label', { 'mdc-floating-label--float-above': vehicle.brand }]"
                for="brand-input"
              >Markė</label>
              <div class="mdc-line-ripple"></div>
            </div>
            <div id="model" class="mdc-text-field mdc-text-field--box">
              <input
                v-model="vehicle.model"
                type="text"
                class="mdc-text-field__input"
                id="model-input"
                required
              >
              <label
                :class="['mdc-floating-label', { 'mdc-floating-label--float-above': vehicle.model }]"
                class="mdc-floating-label"
                for="model-input"
              >Modelis</label>
              <div class="mdc-line-ripple"></div>
            </div>
            <div id="year" class="mdc-text-field mdc-text-field--box">
              <input
                v-model="vehicle.year"
                type="number"
                class="mdc-text-field__input"
                id="year-input"
                required
              >
              <label
                :class="['mdc-floating-label', { 'mdc-floating-label--float-above': vehicle.year }]"
                class="mdc-floating-label"
                for="year-input"
              >Metai</label>
              <div class="mdc-line-ripple"></div>
            </div>
            <!-- <div id="status" class="mdc-select">
              <i class="mdc-select__dropdown-icon"></i>
              <select v-model="vehicle.status" class="mdc-select__native-control" required>
                <option
                  v-for="status in availableStatuses"
                  :key="status"
                  :value="status"
                >{{ status }}</option>
              </select>
              <label
                :class="['mdc-floating-label', { 'mdc-floating-label--float-above': vehicle.status }]"
                class="mdc-floating-label"
              >Būsena</label>
              <div class="mdc-line-ripple"></div>
            </div> -->
            <div class="file-input">
              <h3 class="mdc-typography--subtitle1" style="margin-bottom: 0">{{ fileInputSubtitle }}</h3>
              <input
                type="file"
                accept=".jpg, .jpeg, .png, .bmp, .gif"
                :required="index === -1"
                @change="fileSelected"
              >
            </div>
          </div>
          <footer class="mdc-dialog__actions">
            <button
              type="button"
              class="mdc-button mdc-dialog__button"
              data-mdc-dialog-action="no"
            >Atšaukti</button>
            <button type="submit" class="mdc-button mdc-dialog__button">Išsaugoti</button>
          </footer>
        </div>
      </form>
    </div>
    <div class="mdc-dialog__scrim"></div>
  </div>
</template>

<script>
import { MDCTextField } from "@material/textfield";
// import { MDCSelect } from "@material/select";

export default {
  name: "VehicleFormDialog",

  props: {
    vehicle: Object,
    index: Number
  },

  data() {
    return {
      // availableStatuses: ["Paruošta naudojimui", "Lauka apžiūros"],
      selectedFile: null
    };
  },

  computed: {
    title() {
      return this.index === -1
        ? "Nauja transporto priemonė"
        : "Transporto priemonės redagavimas";
    },

    fileInputSubtitle() {
      return this.index === -1
        ? "Nuotraukos įkėlimas"
        : "Pakeisti įkeltą nuotrauką";
    }
  },

  mounted() {
    new MDCTextField(document.querySelector("#brand"));
    new MDCTextField(document.querySelector("#model"));
    new MDCTextField(document.querySelector("#year"));
    // new MDCSelect(document.querySelector("#status"));
  },

  methods: {
    save() {
      if (this.index > -1) {
        this.$store.dispatch("prepareForUpdate", {
          vehicle: this.vehicle,
          file: this.selectedFile,
        }).then(() => {
          this.$store.commit("openSnackbar", {
            message: "Transporto priemonė atnaujinta"
          });
        });
      } else {
        this.$store.dispatch("saveNewVehicle", {
          vehicle: this.vehicle,
          file: this.selectedFile,
        });
      }
    },

    fileSelected(event) {
      this.selectedFile = event.target.files[0];
    }
  }
};
</script>

<style lang="scss" scoped>
.file-input,
.mdc-text-field,
.mdc-select {
  margin: 8px auto;
  width: 100%;
}
</style>
