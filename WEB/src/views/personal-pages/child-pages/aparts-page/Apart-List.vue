<template>
  <div>
    <div class="d-flex">
      <v-text-field background-color="grey lighten-1" prepend-icon="mdi-home-search" label="Ara..." dense flat hide-details rounded solo />
      <v-btn class="ml-2 primary">ARA</v-btn>
    </div>
    <v-container fluid>
      <preview-card />
    </v-container>
  </div>
</template>

<script>
import previewCard from "./components/Preview-Apart-Card.vue";
import { mapActions } from "vuex";
export default {
  components: {
    previewCard,
  },

  methods: {
    ...mapActions(["trigger"]),
  },

  mounted() {
    this.trigger({
      state: "breadcrumbs",
      data: [{ text: "Daireler", disabled: true, href: "/aparts" }],
    });
  },
};
</script>

<style></style>
