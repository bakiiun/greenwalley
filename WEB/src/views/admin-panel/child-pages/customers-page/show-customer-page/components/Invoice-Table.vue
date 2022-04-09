<template>
  <div>
    <v-data-table
      class="table-rounded"
      :headers="headers"
      :items="data"
      :loading="loading"
      :sort-by="['invoice_date']"
      hide-default-footer
    >
      <template #[`item.invoice_id`]="{ item }">
        {{ `#${item.invoice_id}` }}
      </template>

      <template #[`item.invoice_date`]="{ item }">
        {{ dateFormatter(item.invoice_date) }}
      </template>

      <template #[`item.cost`]="{ item }">
        {{ `₺ ${item.cost}` }}
      </template>

      <template #[`item.status`]="{ item }">
        <!-- status 1 ise yeşil çip, değilse kırmızı veya sarı çip göster -->
        <v-chip v-if="item.status" small class="font-weight-medium lighten-4" :class="`green green--text`"> Ödenmiş </v-chip>
        <!-- Eğer ödeme methodu çağrılması gerekirse ==> @click="selectInvoice(item)" -->
        <v-chip v-else small class="font-weight-medium lighten-4" :class="`${statusChip(item).color}--text`">
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
  props: ["data"],
  data: () => {
    return {
      //* PAGE VERİABLES
      confirmPay: false,
      selectedInvoice: null,
      //*TABLE VERIABLES
      headers: [
        { text: "#ID", value: "invoice_id" },
        { text: "Tarih", value: "invoice_date" },
        { text: "Ücret", value: "cost" },
        { text: "Durum", value: "status" },
      ],
      loading: false,
      invoiceList: [],
    };
  },

  methods: {
    dateFormatter(i) {
      return moment(i).format("DD-MM-YYYY");
    },

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
      if (moment(i.invoice_date).add(1, "days") < moment()) {
        return { text: "Geçmiş", color: "red red" };
      } else {
        return { text: "Gelecek", color: "orange orange" };
      }
    },
  },
};
</script>

<style></style>
