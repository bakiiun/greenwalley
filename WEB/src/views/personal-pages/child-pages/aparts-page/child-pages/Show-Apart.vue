<template>
  <v-row dense>
    <v-col cols="12" md="4">
      <apart-card class="mb-3" />
      <customer-card />
    </v-col>
    <v-col cols="12" md="8">
      <v-tabs v-model="tab" align-with-title>
        <v-tab>EŞYALAR</v-tab>
        <v-tab>FATURALAR</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-container fluid>
            <item-list />
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container fluid>
            <invoice-list />
          </v-container>
        </v-tab-item>
      </v-tabs-items>
    </v-col>
  </v-row>
</template>

<script>
import apartCard from "./components/Show-Apart-Card.vue";
import customerCard from "./components/Show-Customer-Card.vue";
import itemList from "./components/Tab-Item-List.vue";
import invoiceList from "./components/Tab-Invoice-List.vue";
import { mapActions } from "vuex";
export default {
  components: {
    apartCard,
    customerCard,
    itemList,
    invoiceList,
  },
  data: () => {
    return {
      tab: 0,
      fakeApartData: {
        id: 5,
        apartName: "A-105",
        apartType: 0,
        apartRoomCount: 1,
        customerID: 31612545800,
        customerName: "Baki ÜN",
        customerPhone: "05050619070",
        contractDate: "11.12.2022",
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
        { text: "Daireler", disabled: false, href: "/aparts" },
        { text: this.fakeApartData.apartName, disabled: true, href: "" },
      ],
    });
  },
};
</script>

<style></style>
ue
