<template>
  <v-card class="ma-2" max-width="450">
    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="font-weight-bold">Abdulbaki ÜN</v-list-item-title>
        <v-row no-gutters>
          <v-col cols="12" md="6">
            <v-list-item-subtitle> <span class="font-weight-bold">TC: </span> 13645865400 </v-list-item-subtitle>
            <v-list-item-subtitle> <span class="font-weight-bold"> TEL: </span> 5050619070 </v-list-item-subtitle>
          </v-col>
          <v-col cols="12" md="6">
            <v-list-item-subtitle> <span class="font-weight-bold"> SON KİRA: </span> 2022-11-15 </v-list-item-subtitle>
            <v-list-item-subtitle> <span class="font-weight-bold"> TÜM KİRA ÖDENDİ: </span> Evet </v-list-item-subtitle>
          </v-col>
        </v-row>
      </v-list-item-content>
      <v-btn :to="'/customers/5'" x-large icon>
        <v-icon x-large>mdi-clipboard-arrow-right-outline</v-icon>
      </v-btn>
    </v-list-item>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
