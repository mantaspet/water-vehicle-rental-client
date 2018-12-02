<template>
  <v-snackbar
    v-model="$store.state.ui.snackbar.isOpen"
    :timeout="timeout"
    auto-height
    bottom
  >
    {{ message }}
    <v-btn
			v-if="action"
      color="primary"
      flat
      @click.stop.prevent="onSnackbarActionClick">
      {{ action }}
    </v-btn>
  </v-snackbar>
</template>

<script>
export default {
  name: 'Snackbar',

  props: {
    message: String,
    link: String,
    action: String,
    timeout: {
      type: Number,
      default: 4000,
    },
  },

  methods: {
    onSnackbarActionClick() {
      if (this.link) {
        this.$router.push(this.link);
      }
      this.$store.commit('closeSnackbar');
    },
  },
};
</script>
