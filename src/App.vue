<template>
  <v-app id="inspire">
    <NavigationDrawer v-if="$store.getters.currentUser"/>
    <ConfirmDialog
      :isOpen="$store.getters.confirmDialog.isOpen"
      :title="$store.getters.confirmDialog.title"
      :body="$store.getters.confirmDialog.body"
      :cancelText="$store.getters.confirmDialog.cancelText"
      :confirmText="$store.getters.confirmDialog.confirmText"/>
    <Snackbar
      :message="$store.getters.snackbar.message"
      :link="$store.getters.snackbar.link"
      :action="$store.getters.snackbar.action"
      :timeout="$store.getters.snackbar.timeout"/>
    <v-content>
      <v-container class="pa-3 mx-0" fill-height fluid>
        <v-slide-y-transition mode="out-in">
          <router-view :key="$route.fullPath"/>
        </v-slide-y-transition>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import NavigationDrawer from './components/NavigationDrawer';
import ConfirmDialog from './components/ConfirmDialog';
import Snackbar from './components/Snackbar';

export default {
  name: "App",

  components: {
    NavigationDrawer,
    ConfirmDialog,
    Snackbar,
  },
};
</script>


<style lang="scss">
body {
  font-family: "Roboto", sans-serif;
}

.alert-text {
  font-weight: bold;
  color: red;
}
</style>
