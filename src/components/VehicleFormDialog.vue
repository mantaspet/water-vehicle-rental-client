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
            <label class="mdc-floating-label" for="brand-input">Markė</label>
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
            <label class="mdc-floating-label" for="model-input">Modelis</label>
            <div class="mdc-line-ripple"></div>
          </div>
          <div id="year" class="mdc-text-field mdc-text-field--box">
            <input
              v-model="vehicle.year"
              type="number"
              class="mdc-text-field__input"
              id="year-input"
							minlength="4"
							maxlength="4"
              required
            >
            <label class="mdc-floating-label" for="year-input">Metai</label>
            <div class="mdc-line-ripple"></div>
          </div>
          <div id="imageUrl" class="mdc-text-field mdc-text-field--box">
            <input
              v-model="vehicle.imageUrl"
              type="text"
              class="mdc-text-field__input"
              id="image-url-input"
              required
            >
            <label class="mdc-floating-label" for="image-url-input">Nuoroda į nuotrauką</label>
            <div class="mdc-line-ripple"></div>
          </div>
        </div>
        <footer class="mdc-dialog__actions">
          <button
            type="button"
            class="mdc-button mdc-dialog__button"
            data-mdc-dialog-action="no"
          >Atšaukti</button>
          <button
            type="submit"
            class="mdc-button mdc-dialog__button"
          >Išsaugoti</button>
        </footer>
      </div>
			</form>
    </div>
    <div class="mdc-dialog__scrim"></div>
  </div>
</template>

<script>
import { MDCTextField } from "@material/textfield";

export default {
  name: "VehicleFormDialog",

  props: {
    vehicle: Object,
    index: Number
  },

  computed: {
    title() {
      return this.index === -1
        ? "Nauja transporto priemonė"
        : "Transporto priemonės redagavimas";
    }
	},
	
	mounted() {
    new MDCTextField(document.querySelector("#brand"));
    new MDCTextField(document.querySelector("#model"));
    new MDCTextField(document.querySelector("#year"));
    new MDCTextField(document.querySelector("#imageUrl"));
	},

  methods: {
    save() {
			this.$store.dispatch('saveNewVehicle', this.vehicle);
		}
  }
};
</script>

<style lang="scss" scoped>
.mdc-text-field {
	margin: 8px auto;
	width: 100%;
}
</style>
