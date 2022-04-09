<template>
  <v-app>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card class="mx-auto" max-width="350" elevation="5" rounded="md">
          <v-list-item three-line>
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-5"> GİRİŞ YAP </v-list-item-title>
              <v-list-item-subtitle class="mb-3">
                <v-text-field prepend-icon="mdi-account-lock" v-model="username" dense flat hide-details rounded solo-inverted />
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-text-field
                  prepend-icon="mdi-shield-key"
                  v-model="pwd"
                  :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                  :type="show ? 'text' : 'password'"
                  @click:append="show = !show"
                  dense
                  flat
                  hide-details
                  rounded
                  solo-inverted
                />
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="justify-end"> <v-btn class="primary" rounded text @click="mLogin"> GİRİŞ </v-btn> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
import mixin from "./mixins";

export default {
  name: "Login",
  mixins: [mixin],
  data: () => {
    return {
      show: false,
      username: "",
      pwd: "",
    };
  },
  methods: {},
};
</script>

<style></style>
