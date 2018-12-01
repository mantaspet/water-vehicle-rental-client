<template>
  <div class="home">

  </div>
</template>

<script>
export default {
  name: "Vehicles",

  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    }
  }
};
</script>
