<template>
  <v-card>
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-md-h5 text-sm-body-1 mb-2">MÜŞTERİ BİLGİLERİ</v-list-item-title>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-list-item-subtitle> <span class="font-weight-bold">TC: </span> {{ data.identity_number }} </v-list-item-subtitle>
            <v-list-item-subtitle> <span class="font-weight-bold">ADI: </span> {{ data.customer_name }} </v-list-item-subtitle>
            <v-list-item-subtitle> <span class="font-weight-bold"> TEL: </span> {{ data.customer_phone }} </v-list-item-subtitle>
          </v-col>
          <v-col cols="12" md="6">
            <v-list-item-subtitle> <span class="font-weight-bold"> KONTRAT TARİHİ: </span> {{ contractDate }} </v-list-item-subtitle>
            <v-list-item-subtitle> <span class="font-weight-bold"> SON KİRA: </span> {{contractEndDay}} </v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  props: ["data"],
  data: () => {
    return {};
  },
  computed: {
    contractDate() {
      return moment(this.data.contract_date).format("DD-MM-YYYY");
    },
    contractEndDay() {
      return moment(this.contractDate, "DD-MM-YYYY").add(this.data.monthly_contract_length, "M").format("DD-MM-YYYY");
    },
  },
};
</script>

<style></style>
