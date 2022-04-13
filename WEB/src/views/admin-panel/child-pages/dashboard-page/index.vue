<template>
  <v-container fluid>
    <v-row justify="space-around">
      <info-card v-for="(i, j) in cardList" :key="j" :data="i" />
    </v-row>
    <div class="mt-8">
      <chart-card-1 />
    </div>
  </v-container>
</template>

<script>
import mixin from "./mixins";
import chartCard1 from "./components/Chart-Card-1.vue";
import infoCard from "./components/Info-Card.vue";
import { mapActions } from "vuex";
export default {
  mixins: [mixin],
  components: {
    chartCard1,
    infoCard,
  },
  data: () => ({
    cardList: {
      customerCard: {
        title: "MÜŞTERİLER",
        ico1: "mdi-account-supervisor",
        ico2: "mdi-account-group",
        value1: "Aktif Müşteri: -",
        value2: "Toplam: -",
      },

      invoiceCard: {
        title: "KİRALAR",
        ico1: "mdi-note-text",
        ico2: "mdi-backup-restore",
        value1: "Ödenmemiş Kira: -",
        value2: `Günü Geçen: -`,
      },
    },
  }),
  methods: {
    ...mapActions(["trigger"]),
  },
  mounted() {
    this.trigger({
      state: "breadcrumbs",
      data: [{ text: "Dashboard", disabled: true, href: "/dashboard" }],
    });
  },
};
</script>

<style></style>
