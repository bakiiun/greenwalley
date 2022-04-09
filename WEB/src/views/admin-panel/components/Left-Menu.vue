<template>
  <div>
    <v-sheet color="red" height="128" width="100%" />

    <v-list shaped>
      <v-list-item v-for="(i, j) in items" :key="j" :to="i.uri" link>
        <v-list-item-icon class="pl-2"> <v-icon v-text="i.ico" /> </v-list-item-icon>
        <v-list-item-title v-text="i.title" />
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
export default {
  data: () => ({
    items: [
      { title: "DASHBOARD", ico: "mdi-view-dashboard", uri: "/dashboard" },
      { title: "DAİRELER", ico: "mdi-warehouse", uri: "/aparts" },
      { title: "MÜŞTERİLER", ico: "mdi-account-supervisor", uri: "/customers" },
      // { title: "FATURALAR", ico: "mdi-note-text", uri: "/invoices" },
    ],
  }),
};
</script>

<style></style>
