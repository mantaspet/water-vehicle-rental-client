<template>
  <v-navigation-drawer
    v-model="$store.state.ui.drawer"
    :style="{ 'z-index': $vuetify.breakpoint.lgAndUp ? 4 : '' }"
    fixed
    dark
    app>
    <div class="text-xs-center my-3">
      <img
        src="../assets/logo.png"
        alt="logo"
        class="clickable"
        height="30"
        @click="$router.push({ path: '/'})">
    </div>
    <v-list
      dense>
      <template v-for="(item, i) in items">
        <v-layout
          v-if="item.heading"
          :key="i"
          row
          align-center>
          <v-flex xs6>
            <v-subheader v-if="item.heading">
              {{ item.heading }}
            </v-subheader>
          </v-flex>
        </v-layout>
        <v-divider
          v-else-if="item.divider"
          :key="i"
          class="my-2"
          dark/>
        <v-list-tile
          v-else-if="!item.adminOnly || $isAdmin()"
          :key="i"
          :disabled="!item.routeName"
          :to="item.routeName">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      <v-list-tile @click="$store.dispatch('logout')">
        <v-list-tile-action>
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            Atsijungti
          </v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      items: [
				{ text: "Transporto priemonės", routeName: "/", icon: "home" },
        { text: "Klientai", routeName: "/clients", icon: "person" },
        { text: "Apie įmonę", routeName: "/about", icon: "description" },
        { divider: true },
      ],
    };
  },
};
</script>
