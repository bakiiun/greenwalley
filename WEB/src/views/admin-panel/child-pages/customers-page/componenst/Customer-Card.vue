<template>
  <v-card class="ma-2">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">{{ data.customerName }}</v-list-item-title>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-list-item-subtitle> <span class="font-weight-bold">TC: </span> {{ data.identityNumber }} </v-list-item-subtitle>
            <v-list-item-subtitle> <span class="font-weight-bold"> TEL: </span> {{ data.customerPhone }} </v-list-item-subtitle>
          </v-col>
          <v-col cols="12" md="6">
            <v-list-item-subtitle> <span class="font-weight-bold"> SON KİRA: </span> {{ lastContractDay }} </v-list-item-subtitle>
            <!-- <v-list-item-subtitle> <span class="font-weight-bold"> TÜM KİRA ÖDENDİ: </span> Evet </v-list-item-subtitle> -->
          </v-col>
        </v-row>
      </v-list-item-content>
      <v-btn @click="customerShow" x-large icon>
        <v-icon x-large>mdi-clipboard-arrow-right-outline</v-icon>
      </v-btn>
    </v-list-item>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  props: ["data"],
  computed: {
    lastContractDay() {
      return moment(this.data.contractDate, "YYYY-MM-DD HH:mm:ss").add(this.data.contractLength, "M").format("DD-MM-YYYY");
    },
  },
  methods: {
    customerShow() {
      this.$router.push(`/customers/${this.data.customerID}`);
    },
  },
};
</script>

<style></style>
