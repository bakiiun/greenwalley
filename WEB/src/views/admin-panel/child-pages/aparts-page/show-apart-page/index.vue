<template>
  <v-row dense>
    <v-col cols="12" md="4">
      <apart-card :data="apartDetail" class="mb-3" />
      <customer-card :data="apartDetail" />
    </v-col>
    <v-col cols="12" md="8">
      <v-tabs v-model="tab" align-with-title>
        <v-tab>EŞYALAR</v-tab>
        <v-tab>FATURALAR</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-container fluid>
            <item-list :itemList="itemList" v-on:deleteItem="mItemDelete" />
          </v-container>
        </v-tab-item>
        <v-tab-item>
          <v-container fluid>
            <invoice-list :invoiceList="invoiceList" />
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
import mixin from "./mixins";

export default {
  mixins: [mixin],
  components: {
    apartCard,
    customerCard,
    itemList,
    invoiceList,
  },
  data: () => {
    return {
      tab: 0,
      apartDetail: {},
      itemList: [],
      invoiceList: [],
    };
  },
};
</script>

<style></style>
