<template>
  <div>
    <div class="d-flex">
      <v-text-field background-color="grey lighten-1" prepend-icon="mdi-account-search" label="Ara..." dense flat hide-details rounded solo />
      <v-btn class="ml-2 primary">ARA</v-btn>
    </div>
    <v-container fluid>
      <v-row> <customer-card /> </v-row>
    </v-container>
  </div>
</template>

<script>
import CustomerCard from "./componenst/Customer-Card.vue";
import { mapActions } from "vuex";

export default {
  components: { CustomerCard },
  methods: {
    ...mapActions(["trigger"]),
  },
  mounted() {
    this.trigger({
      state: "breadcrumbs",
      data: [
        { text: "Müşteriler", disabled: true, href: "/customers" },
      ],
    });
  },
};
</script>

<style>
.textSize {
  font-size: 0.9em;
}
</style>
