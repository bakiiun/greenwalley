<template>
  <div>
    <v-data-table class="table-rounded" :headers="headers" :items="invoiceList" :loading="loading" :search="search">
      <template #[`item.invoiceID`]="{ item }">
        {{ `#${item.invoiceID}` }}
      </template>

      <template #[`item.cost`]="{ item }">
        {{ `₺ ${item.cost}` }}
      </template>

      <template #[`item.status`]="{ item }">
        <!-- status 1 ise yeşil çip, değilse kırmızı veya sarı çip göster -->
        <v-chip v-if="item.status" small class="font-weight-medium lighten-4" :class="`green green--text`"> Ödenmiş </v-chip>
        <v-chip v-else @click="selectInvoice(item)" small class="font-weight-medium lighten-4" :class="`${statusChip(item).color}--text`">
          {{ statusChip(item).text }}
        </v-chip>
      </template>
    </v-data-table>

    <v-dialog v-model="confirmPay" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">ÖDEMEYİ ONAYLA</v-card-title>
        <v-card-text>Fatura ödenmiş olarak işaretlensin mi?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="confirmPay = false">İptal</v-btn>
          <v-btn color="primary" text @click="payEvent()">Onayla</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data: () => {
    return {
      //* PAGE VERİABLES
      confirmPay: false,
      selectedInvoice: null,
      //*TABLE VERIABLES
      headers: [
        { text: "#ID", value: "invoiceID" },
        { text: "Tarih", value: "invoiceDate" },
        { text: "Ücret", value: "cost" },
        { text: "Durum", value: "status" },
      ],
      loading: false,
      search: "",
      invoiceList: [],
    };
  },

  methods: {
    selectInvoice(i) {
      this.selectedInvoice = i;
      this.confirmPay = true;
    },

    payEvent() {
      console.log(this.selectedInvoice);
      this.confirmPay = false;
    },

    statusChip(i) {
      //* status = 0 --> Ödenmemiş
      //* status = 1 --> Ödenmiş
      if (moment(i.invoiceDate).add(1, "days") < moment()) {
        return { text: "Geçmiş", color: "red red" };
      } else {
        return { text: "Gelecek", color: "orange orange" };
      }
    },
  },

  mounted() {
    this.invoiceList = [
      { invoiceID: 1, cost: 2000, invoiceDate: "2022-01-01", status: 0 },
      { invoiceID: 2, cost: 1800, invoiceDate: "2022-02-02", status: 1 },
      { invoiceID: 3, cost: 1900, invoiceDate: "2022-03-03", status: 0 },
      { invoiceID: 4, cost: 2200, invoiceDate: "2022-11-12", status: 1 },
      { invoiceID: 5, cost: 1700, invoiceDate: "2022-11-12", status: 0 },
      { invoiceID: 6, cost: 2100, invoiceDate: "2022-11-12", status: 1 },
    ];
  },
};
</script>

<style></style>
