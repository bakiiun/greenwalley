<template>
  <div>
    <div class="d-flex">
      <v-text-field
        background-color="grey lighten-1"
        prepend-icon="mdi-account-search"
        label="Ara..."
        v-model="search"
        dense
        flat
        hide-details
        rounded
        solo
      />
      <v-btn class="ml-2 primary">ARA</v-btn>
    </div>
    <v-container fluid>
      <v-row class="mt-2">
        <v-col cols="12" md="4" v-for="(i, j) in showList" :key="j">
          <customer-card :data="i" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import CustomerCard from "./componenst/Customer-Card.vue";
import { mapActions } from "vuex";
import mixins from "./mixins";

export default {
  mixins: [mixins],
  components: { CustomerCard },

  data: () => {
    return {
      search: "",
      showList: [],
      customerList: [],
    };
  },

  methods: {
    ...mapActions(["trigger"]),
  },

  watch: {
    search: function (v) {
      let val = v.toLowerCase();
      if (val.length > 2) {
        this.showList = this.customerList.filter(
          (i) => i.customerName?.toLowerCase().includes(val) || i.customerPhone?.includes(val) || i.identityNumber?.includes(val)
        );
      } else {
        this.showList = this.customerList;
      }
    },
  },

  mounted() {
    this.trigger({
      state: "breadcrumbs",
      data: [{ text: "Müşteriler", disabled: true, href: "/customers" }],
    });
  },
};
</script>

<style>
.textSize {
  font-size: 0.9em;
}
</style>
