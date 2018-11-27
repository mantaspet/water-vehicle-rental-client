<template>
  <div id="app">
    <aside class="mdc-drawer mdc-drawer--dismissible">
      <div class="mdc-drawer__content">
        <nav v-if="!hideDrawer" class="mdc-list">
          <router-link class="mdc-list-item mdc-list-item--activated" to="/" aria-selected="true">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">home</i>
            <span class="mdc-list-item__text">Home</span>
          </router-link>
          <router-link class="mdc-list-item" to="/users">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">person</i>
            <span class="mdc-list-item__text">Naudotojai</span>
          </router-link>
          <hr class="mdc-list-divider">
          <router-link class="mdc-list-item" to="/login">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">exit_to_app</i>
            <span class="mdc-list-item__text">Atsijungti</span>
          </router-link>
        </nav>
      </div>
    </aside>
    <div class="mdc-drawer-app-content">
      <button
        v-show="!hideDrawer"
        class="mdc-icon-button material-icons ma-1"
        @click="toggleDrawer"
      >menu</button>
      <router-view/>
    </div>
  </div>
</template>

<script>
import { MDCRipple } from "@material/ripple";

export default {
  name: "App",

  data() {
    return {
      hideDrawerIn: ['login', 'signup'],  
    }
  },

  computed: {
    hideDrawer() {
      return this.hideDrawerIn.includes(this.$route.name);
    }
  },

  watch: {
    $route(to, from) {
      if (this.hideDrawerIn.includes(to.name)) {
        this.$store.commit('hideDrawer');
      } else {
        this.$store.commit('openDrawer');
      }
    }
  },

  mounted() {
    const iconButtonRipple = new MDCRipple(
      document.querySelector(".mdc-icon-button")
    );
    iconButtonRipple.unbounded = true;
    this.$store.commit('initDrawer');
    if (!this.hideDrawerIn.includes(this.$route.name)) {
      this.$store.commit('openDrawer');
    }
  },

  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    }
  },
};
</script>


<style lang="scss">
// $mdc-theme-primary: #fedbd0;
// $mdc-theme-on-primary: #442c2e;
// $mdc-theme-secondary: #feeae6;
// $mdc-theme-on-secondary: #442c2e;
// $mdc-theme-surface: #fffbfa;
// $mdc-theme-on-surface: #442c2e;
// $mdc-theme-background: #ffffff;
// $mdc-theme-on-background: #442c2e;

@import "@material/button/mdc-button";
@import "@material/icon-button/mdc-icon-button";
@import "@material/drawer/mdc-drawer";
@import "@material/list/mdc-list";
@import "@material/textfield/mdc-text-field";
@import "@material/typography/mdc-typography";
@import "@material/elevation/mdc-elevation";

body {
  height: 100vh;
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding-top: 0.1px; // Prevent header h1 margin from pushing body down
}

.mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
}

.main-content {
  overflow: auto;
  height: 100%;
}

.app-bar {
  position: absolute;
}

.pa-1 {
  padding: 4px !important;
}

.ma-1 {
  margin: 4px !important;
}
</style>
