<template>
  <div id="app" class="mdc-typography--body1">
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
            src="./assets/logo-inverted.png"
            height="80"
            style="cursor: pointer"
            @click="$router.push({ name: 'home' })"
          >
        </div>
        <nav class="mdc-list">
          <router-link
            v-if="!item.allowedRoles || (item.allowedRoles && item.allowedRoles.includes($store.getters.currentUser.role))"
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
          <a v-if="$store.getters.currentUser.userId" class="mdc-list-item" @click="logout">
            <i class="material-icons mdc-list-item__graphic" aria-hidden="true">exit_to_app</i>
            <span class="mdc-list-item__text">Atsijungti</span>
          </a>
          <template v-else>
            <router-link
              :class="['mdc-list-item', { 'mdc-list-item--activated': $route.fullPath === '/login' }]"
              to="/login"
            >
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">person</i>
              <span class="mdc-list-item__text">Prisijungti</span>
            </router-link>
            <router-link
              :class="['mdc-list-item', { 'mdc-list-item--activated': $route.fullPath === '/signup' }]"
              to="/signup"
            >
              <i class="material-icons mdc-list-item__graphic" aria-hidden="true">person_add</i>
              <span class="mdc-list-item__text">Registruotis</span>
            </router-link>
          </template>
        </nav>
      </div>
    </aside>
    <div class="mdc-drawer-app-content">
      <button class="mdc-icon-button material-icons ma-1" @click="toggleDrawer">menu</button>
      <router-view style="padding: 16px"/>
    </div>
    <div class="mdc-snackbar" aria-live="assertive" aria-atomic="true" aria-hidden="true">
      <div class="mdc-snackbar__text"></div>
      <div class="mdc-snackbar__action-wrapper">
        <button type="button" class="mdc-snackbar__action-button"></button>
      </div>
    </div>

    <div
      id="confirm-dialog"
      class="mdc-dialog"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="my-dialog-title"
      aria-describedby="my-dialog-content"
    >
      <div class="mdc-dialog__container">
        <div class="mdc-dialog__surface">
          <h2
            v-if="$store.getters.confirmDialogContent.title"
            class="mdc-dialog__title"
            id="my-dialog-title"
          >{{ $store.getters.confirmDialogContent.title }}</h2>
          <div
            v-if="$store.getters.confirmDialogContent.body"
            class="mdc-dialog__content"
            id="my-dialog-content"
          >{{ $store.getters.confirmDialogContent.body }}</div>
          <footer class="mdc-dialog__actions">
            <button
              type="button"
              class="mdc-button mdc-dialog__button"
              data-mdc-dialog-action="no"
              @click="$eventBus.$emit('confirmDialogClosed', false)"
            >Ne</button>
            <button
              type="button"
              class="mdc-button mdc-dialog__button"
              data-mdc-dialog-action="yes"
              @click="$eventBus.$emit('confirmDialogClosed', true)"
            >Taip</button>
          </footer>
        </div>
      </div>
      <div class="mdc-dialog__scrim"></div>
    </div>
  </div>
</template>

<script>
import { MDCRipple } from "@material/ripple";

export default {
  name: "App",

  data() {
    return {
      navigationItems: [
        { text: "Transporto priemonės", route: "/", icon: "home" },
        {
          text: "Rezervacijos",
          route: "/reservations",
          icon: "event",
          allowedRoles: ["client", "employee", "admin"]
        },
        {
          text: "Klientai",
          route: "/clients",
          icon: "person",
          allowedRoles: ["admin"]
        },
        {
          text: "Darbuotojai",
          route: "/employees",
          icon: "build",
          allowedRoles: ["admin"]
        },
        {
          text: "Užduotys",
          route: "/tasks",
          icon: "assignment",
          allowedRoles: ["employee", "admin"]
        },
        { text: "Atsiliepimai", route: "/reviews", icon: "comment" },
        { text: "Apie įmonę", route: "/about", icon: "description" }
      ]
    };
  },

  mounted() {
    this.$store.commit("initDrawer");
    this.$store.commit("initSnackbar");
    this.$store.commit("initConfirmDialog");
    const iconButtonRipple = new MDCRipple(
      document.querySelector(".mdc-icon-button")
    );
    iconButtonRipple.unbounded = true;
  },

  methods: {
    toggleDrawer() {
      this.$store.commit("toggleDrawer");
    },

    logout() {
      this.$store.dispatch("logout");
    }
  }
};
</script>


<style lang="scss">
$mdc-theme-primary: #ff1744;
// $mdc-theme-on-primary: #442C2E;
$mdc-theme-secondary: #ff1744;
// $mdc-drawer-surface-fill-color: #EF5350;
// $mdc-drawer-divider-color: white;
// $mdc-theme-on-secondary: #442C2E;
// $mdc-theme-surface: #F44336;
// $mdc-theme-on-surface: #ffd54f;
$mdc-theme-background: #ffffff;
$mdc-theme-on-background: #000000;
// $mdc-theme-icon: #F44336;

@import "@material/button/mdc-button";
@import "@material/icon-button/mdc-icon-button";
@import "@material/drawer/mdc-drawer";
@import "@material/list/mdc-list";
@import "@material/textfield/mdc-text-field";
@import "@material/typography/mdc-typography";
@import "@material/elevation/mdc-elevation";
@import "@material/snackbar/mdc-snackbar";
@import "@material/linear-progress/mdc-linear-progress";
@import "@material/card/mdc-card";
@import "@material/dialog/mdc-dialog";
@import "@material/fab/mdc-fab";
@import "@material/grid-list/mdc-grid-list";
@import "@material/select/mdc-select";
@import "@material/form-field/mdc-form-field";
@import "@material/checkbox/mdc-checkbox";
@import "@material/menu-surface/mdc-menu-surface";
@import "@material/menu/mdc-menu";
@import "@material/image-list/mdc-image-list";

body {
  height: 100vh;
  font-family: "Roboto", sans-serif;
  margin: 0;
  padding-top: 0.1px; // Prevent header h1 margin from pushing body down
}

.vehicle-list {
  @include mdc-image-list-masonry-columns(4);

  overflow: auto;
}

.router-link-exact-active {
  background: rgba(33, 33, 33, 0.25) !important;
}

.mdc-icon-button {
  @include mdc-icon-button-ink-color($mdc-theme-primary);
}

.mdc-card__action {
  color: $mdc-theme-primary !important;
}

.mdc-drawer {
  // @include mdc-drawer-surface-fill-color($mdc-theme-primary);
  @include mdc-drawer-item-text-ink-color($mdc-theme-on-background);
  @include mdc-drawer-item-icon-ink-color($mdc-theme-on-background);
  @include mdc-drawer-item-activated-icon-ink-color($mdc-theme-on-background);
  @include mdc-drawer-divider-color($mdc-theme-background);
  @include mdc-drawer-fill-color-accessible($mdc-theme-primary);
}

.mdc-drawer-app-content {
  @include mdc-elevation(4);
}

.mdc-image-list__supporting {
  justify-content: center;
}

.mdc-image-list__item,
.mdc-list-item {
  cursor: pointer;
}

.mdc-image-list__label {
  @include mdc-typography(subtitle2);
}

#app {
  height: 100%;
}

.site-logo {
  padding-top: 16px;
  text-align: center;
  margin: 16px;
}

.header-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.alert-text {
  font-weight: bold;
  color: red;
}

.mdc-drawer-app-content {
  flex: auto;
  overflow: auto;
  height: 100%;
}

.mdc-linear-progress {
  position: absolute;
}

.mdc-typography--headline4 {
  font-size: 2rem;
}

.mdc-fab {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
}

.main-content {
  overflow: auto;
  height: 100%;
}

.app-bar {
  position: absolute;
}

.pa-0 {
  padding: 0px !important;
}

.pa-1 {
  padding: 4px !important;
}

.pa-2 {
  padding: 8px !important;
}

.pa-3 {
  padding: 12px !important;
}

.ma-0 {
  margin: 0px !important;
}

.ma-1 {
  margin: 4px !important;
}

.ma-2 {
  margin: 8px !important;
}

.ma-3 {
  margin: 12px !important;
}
</style>
