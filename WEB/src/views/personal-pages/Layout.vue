<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right flat height="50">
      <v-btn @click="leftDrawer = !leftDrawer" icon>
        <v-icon> mdi-menu </v-icon>
      </v-btn>
      <v-divider class="ml-2" inset vertical></v-divider>
      <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
    </v-app-bar>

    <v-navigation-drawer v-model="leftDrawer" app width="300">
      <leftMenu />
      <template v-slot:append>
        <v-list-item link>
          <v-list-item-icon class="pl-2"> <v-icon size="lg">mdi-alert</v-icon> </v-list-item-icon>
          <v-list-item-title class="font-weight-bold"> ÇIKIŞ </v-list-item-title>
        </v-list-item>
      </template>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="rightDrawer" app clipped right>
      <rightMenu />
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import leftMenu from "./components/Left-Menu.vue";
import rightMenu from "./components/Right-Menu.vue";
export default {
  components: {
    leftMenu,
    rightMenu,
  },

  computed: { ...mapState(["breadcrumbs"]) },

  data: () => ({
    leftDrawer: null,
    rightDrawer: null,
  }),
};
</script>
