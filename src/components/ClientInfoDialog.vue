<template>
  <div id="client-info-dialog" class="mdc-dialog">
    <div class="mdc-dialog__container">
      <div class="mdc-dialog__surface">
        <h2 class="mdc-dialog__title" id="my-dialog-title">Rezervaciją atliko:</h2>
        <div class="mdc-dialog__content" id="my-dialog-content">
          {{ client.firstName }} {{ client.lastName }}
          <br>
          El. paštas: <a :href="`mailto:${client.email}`">{{ client.email }}</a>
        </div>
        <footer class="mdc-dialog__actions">
          <button
            type="button"
            class="mdc-button mdc-dialog__button"
            data-mdc-dialog-action="no"
          >Uždaryti</button>
        </footer>
      </div>
    </div>
    <div class="mdc-dialog__scrim"></div>
  </div>
</template>

<script>
export default {
  name: "ClientInfoDialog",

  props: {
		client: Object,
  },

  data() {
    return {

    }
  },
};
</script>
