<template>
  <v-container fluid>
    <customer-card :data="customer" />
    <v-card>
      <div class="text-md-h4 my-2 d-flex justify-center">KİRALAR</div>
      <invoice-table :data="invoices" />
    </v-card>
  </v-container>
</template>

<script>
import mixins from "./mixins";
import CustomerCard from "./components/Customer-Card.vue";
import invoiceTable from "./components/Invoice-Table.vue";

export default {
  mixins: [mixins],

  components: {
    invoiceTable,
    CustomerCard,
  },

  data: () => {
    return {
      customer: {},
      invoices: [],
    };
  },
};
</script>

<style></style>
