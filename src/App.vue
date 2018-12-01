<template>
  <div id="app">
    <div
      v-if="$store.state.ui.progress"
      role="progressbar"
      class="mdc-linear-progress mdc-linear-progress--indeterminate"
    >
      <div class="mdc-linear-progress__buffering-dots"></div>
      <div class="mdc-linear-progress__buffer"></div>
      <div class="mdc-linear-progress__bar mdc-linear-progress__primary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
      </div>
      <div class="mdc-linear-progress__bar mdc-linear-progress__secondary-bar">
        <span class="mdc-linear-progress__bar-inner"></span>
      </div>
    </div>
    <aside class="mdc-drawer mdc-drawer--dismissible">
      <div class="mdc-drawer__content">
        <div style="text-align: center; margin: 16px">
          <img
            alt="site-logo"
            src="./assets/logo.png"
            height="100"
            style="cursor: pointer"
            @click="$router.push({ name: 'home' })"
          >
        </div>
        <nav v-if="!hideDrawer" class="mdc-list">
          <router-link
            v-for="item in navigationItems"
            :key="item.route"
            :class="['mdc-list-item', { 'mdc-list-item--activated': $route.fullPath === item.route }]"
            :to="item.route"
            aria-selected="true"
          >
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">{{ item.icon }}</i>
            <span class="mdc-list-item__text">{{ item.text }}</span>
          </router-link>
          <hr class="mdc-list-divider">
          <a class="mdc-list-item" @click="logout">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">exit_to_app</i>
            <span class="mdc-list-item__text">Atsijungti</span>
          </a>
        </nav>
      </div>
    </aside>
    <div class="mdc-drawer-app-content">
      <button
        v-show="!hideDrawer"
        class="mdc-icon-button material-icons ma-1"
        @click="toggleDrawer"
      >menu</button>
      <router-view style="padding: 16px"/>
    </div>
    <div class="mdc-snackbar" aria-live="assertive" aria-atomic="true" aria-hidden="true">
      <div class="mdc-snackbar__text"></div>
      <div class="mdc-snackbar__action-wrapper">
        <button type="button" class="mdc-snackbar__action-button"></button>
      </div>
    </div>
  </div>
</template>

<script>
import { MDCRipple } from "@material/ripple";

export default {
  name: "App",

  data() {
    return {
      hideDrawerIn: ["login", "signup"],
      navigationItems: [
        { text: "Transporto priemonės", route: "/", icon: "home" },
        { text: "Naudotojai", route: "/users", icon: "person" },
        { text: "Apie įmonę", route: "/about", icon: "description" }
      ]
    };
  },

  computed: {
    hideDrawer() {
      return this.hideDrawerIn.includes(this.$route.name);
    }
  },

  watch: {
    $route(to, from) {
      if (this.hideDrawerIn.includes(to.name)) {
        this.$store.commit("hideDrawer");
      } else {
        this.$store.commit("openDrawer");
      }
    }
  },

  mounted() {
    this.$store.commit("initDrawer");
    this.$store.commit("initSnackbar");
    const iconButtonRipple = new MDCRipple(
      document.querySelector(".mdc-icon-button")
    );
    iconButtonRipple.unbounded = true;
    if (!this.hideDrawerIn.includes(this.$route.name)) {
      this.$store.commit("openDrawer");
    }
  },

  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },

    logout() {
      this.$store.commit("logout");
    }
  }
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
@import "@material/snackbar/mdc-snackbar";
@import "@material/linear-progress/mdc-linear-progress";

body {
  height: 100vh;
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding-top: 0.1px; // Prevent header h1 margin from pushing body down
}

.site-logo {
  padding-top: 16px;
  text-align: center;
  margin: 16px;
}

.mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
}

.mdc-linear-progress {
  position: absolute;
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
