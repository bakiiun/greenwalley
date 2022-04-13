<template>
  <div>
    <v-sheet class="d-flex justify-center align-center" height="128" width="100%">
      <logo />
    </v-sheet>

    <v-list shaped>
      <v-list-item v-for="(i, j) in items" :key="j" :to="i.uri" link>
        <v-list-item-icon class="pl-2"> <v-icon v-text="i.ico" /> </v-list-item-icon>
        <v-list-item-title v-text="i.title" />
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import logo from "./logo.vue";
export default {
  components: {
    logo,
  },
  data: () => ({
    items: [
      { title: "DASHBOARD", ico: "mdi-view-dashboard", uri: "/dashboard" },
      { title: "DAİRELER", ico: "mdi-warehouse", uri: "/aparts" },
      { title: "KONTRATLAR", ico: "mdi-note-text", uri: "/customers" },
      // { title: "FATURALAR", ico: "mdi-note-text", uri: "/invoices" },
    ],
  }),
};
</script>

<style></style>
