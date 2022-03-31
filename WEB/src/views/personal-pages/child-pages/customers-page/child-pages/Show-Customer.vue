<template>
  <v-container fluid>
    <customer-card />
    <v-card>
      <div class="text-md-h4 my-2 d-flex justify-center">KİRALAR</div>
      <invoice-table />
    </v-card>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
import CustomerCard from "./components/Customer-Card.vue";
import invoiceTable from "./components/Invoice-Table.vue";
export default {
  components: {
    invoiceTable,
    CustomerCard,
  },

  data: () => {
    return {
      fakeData: {
        idNumber: 13645865400,
        name: "Baki ÜN",
        phone: 5050619070,
        status: true,
        contractDate: "2022-11-15",
        contractEndDate: "2022-11-15",
        InvoicesPayed: true,
      },
    };
  },

  methods: {
    ...mapActions(["trigger"]),
  },
  mounted() {
    this.trigger({
      state: "breadcrumbs",
      data: [
        { text: "Müşteriler", disabled: false, href: "/customers" },
        { text: this.fakeData.name, disabled: true, href: "/customers/5" },
      ],
    });
  },
};
</script>

<style></style>
