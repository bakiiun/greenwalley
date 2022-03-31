<template>
  <v-app>
    <v-row no-gutters align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card class="mx-auto" max-width="350" elevation="5" rounded="md">
          <v-list-item three-line>
            <v-list-item-content>
              <!-- <div class="text-overline mb-4">GİRİŞ YAP</div> -->
              <v-list-item-title class="text-h5 mb-5"> GİRİŞ YAP </v-list-item-title>
              <v-list-item-subtitle class="mb-3">
                <v-text-field prepend-icon="mdi-account-lock" dense flat hide-details rounded solo-inverted />
              </v-list-item-subtitle>
              <v-list-item-subtitle>
                <v-text-field prepend-icon="mdi-shield-key" dense flat hide-details rounded solo-inverted />
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-card-actions class="justify-end"> <v-btn rounded text> GİRİŞ </v-btn> </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-app>
</template>

<script>
//
export default {
  name: "Login",
  data: () => {
    return {};
  },
  computed: {},
};
</script>

<style></style>
