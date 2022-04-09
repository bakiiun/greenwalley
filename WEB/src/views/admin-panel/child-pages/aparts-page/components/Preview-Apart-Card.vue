<template>
  <v-card class="my-2" @click="showApart()">
    <v-system-bar height="16px" :color="data.customerID ? 'warning' : 'green'">
      <v-spacer />
    </v-system-bar>
    <v-list-item style="height: 128px" class="pa-2">
      <div class="d-flex justify-center rotated text-h4 font-weight-bold" v-text="data.apartName" />
      <v-divider class="mx-1 ml-n1" vertical inset />
      <v-list-item-content class="mb-n6">
        <v-list-item-subtitle class="mb-1" v-text="data.customerName" />
        <v-list-item-subtitle v-text="data.customerPhone" />

        <v-list-item-subtitle>
          <span style="font-size: 11px">Kontrat Bitiş Tarihi: {{ dateFormatter }}</span>
        </v-list-item-subtitle>

        <v-list-item-subtitle class="pa-3 mx-n6">
          <div class="mx-3 pb-3">
            <div class="d-flex mb-3 font-weight-bold">
              <sub v-text="remainingDay" />
              <v-spacer />
              <sub v-text="`% ${remainingDay < 0 ? 100 : percent}`" />
            </div>
            <v-progress-linear class="mt-1" :value="percent < 0 ? 0 : percent" color="primary" />
          </div>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar class="ma-n2 pl-3" size="90">
        <v-col>
          <v-icon class="mb-n3" size="50" color="primary">mdi-home-roof</v-icon>
          <span class="font-weight-bold primary--text" style="font-size: 36px"> {{ data.apartRoomCount }}<sup v-text="`+${data.apartType}`" /> </span>
        </v-col>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
import moment from "moment";
export default {
  props: ["data"],
  data: () => {
    return {
      percent: 0,
      remainingDay: 0,
    };
  },

  methods: {
    showApart() {
      this.$router.push(`/aparts/show/${this.data.apartID}`);
    },
  },

  computed: {
    dateFormatter() {
      return moment(this.data.contractDate, "YYYY-MM-DD").format("DD-MM-YYYY");
    },
  },

  mounted() {
    const dateFormat = "DD-MM-YYYY";
    const SQLFormat = "YYYY-MM-DD";
    let contractDate = moment(this.data.contractDate, SQLFormat).format(dateFormat);
    let endDate = moment(contractDate, dateFormat).add(this.data.contractLength, "months").format(dateFormat);
    let conctractAsDay = moment(endDate, dateFormat).diff(moment(contractDate, dateFormat), "days");
    this.remainingDay = moment(endDate, dateFormat).diff(moment(), "days") || 0;
    let completed = moment().diff(moment(contractDate, dateFormat), "days");
    this.percent = Math.round((completed * 100) / conctractAsDay) || 0;
  },
};
</script>
<style>
.rotated {
  transform: rotate(270deg);
  white-space: nowrap;
  width: 50px;
}
</style>
