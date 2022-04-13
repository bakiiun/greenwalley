<template>
  <v-app id="inspire">
    <v-app-bar app clipped-right flat height="50">
      <v-btn @click="leftDrawer = !leftDrawer" icon>
        <v-icon> mdi-menu </v-icon>
      </v-btn>
      <v-divider class="ml-2" inset vertical></v-divider>
      <v-breadcrumbs :items="breadcrumbs" large></v-breadcrumbs>
      <v-spacer />
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn class="mr-1" v-bind="attrs" v-on="on" icon>
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item link @click="dialog = true">
            <v-list-item-title>Şifre Değiştir</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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

    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">ŞİFRE DEĞİŞTİR</v-card-title>
        <div class="mx-2">
          <v-text-field
            class="mb-2"
            background-color="grey lighten-1"
            prepend-icon="mdi-shield-key"
            label="Şifre"
            v-model="personal.pwd"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show ? 'text' : 'password'"
            @click:append="show = !show"
            dense
            flat
            hide-details
            rounded
            solo
          />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">İPTAL</v-btn>
          <v-btn color="primary" text @click="updateEvent()">ONAYLA</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- <v-navigation-drawer v-model="rightDrawer" app clipped right>
      <rightMenu />
    </v-navigation-drawer> -->

    <v-main>
      <v-container fluid>
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import mixins from "./mixins";
import { mapState } from "vuex";
import leftMenu from "./components/Left-Menu.vue";
// import rightMenu from "./components/Right-Menu.vue";

export default {
  mixins: [mixins],
  components: {
    leftMenu,
    // rightMenu,
  },

  data: () => ({
    leftDrawer: null,
    rightDrawer: null,
    dialog: false,
    show: false,
    personalInfo: {},
    personal: {
      personalID: "",
      pwd: "",
    },
  }),

  methods: {
    updateEvent() {
      this.mPersonalUpdate(this.personal).then((i) => {
        if (i) {
          this.dialog = false;
        }
      });
    },
  },

  watch: {
    dialog: {
      handler: function () {
        this.personal = this.personalInfo;
      },
    },
  },

  computed: { ...mapState(["breadcrumbs"]) },
};
</script>
