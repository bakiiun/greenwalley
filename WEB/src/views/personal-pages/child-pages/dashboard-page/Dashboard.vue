<template>
  <v-container fluid>
    <v-container v-if="false">
      <chart-card-1 />
    </v-container>

    <v-row justify="space-around">
      <chart-card-2 class="" :data="fakeCardData1" />
      <chart-card-2 :data="fakeCardData2" />
    </v-row>
  </v-container>
</template>

<script>
import chartCard1 from "./components/Chart-Card-1.vue";
import chartCard2 from "./components/Chart-Card-2.vue";
import { mapActions } from "vuex";
export default {
  components: {
    chartCard1,
    chartCard2,
  },
  data: () => ({
    fakeCardData1: {
      title: "MÜŞTERİLER",
      ico: "mdi-account-supervisor",
      value: "Aktif Müşteri: 70",
      oldValue: `Geçen Ay: 56`,
    },
    fakeCardData2: {
      title: "FATURALAR",
      ico: "mdi-note-text",
      value: "Ödenmemiş Fatura:108",
      oldValue: `Günü Geçen: 14`,
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
