<template>
  <v-card max-width="340" @click="showApart()">
    <v-system-bar height="16px" color="warning">
      <v-spacer />
      <v-icon size="13px">mdi-circle</v-icon>
      <v-icon size="13px">mdi-triangle</v-icon>
      <v-icon size="13px">mdi-square</v-icon>
    </v-system-bar>
    <v-list-item class="pa-2">
      <div class="d-flex justify-center rotated text-h4 font-weight-bold" v-text="fakeApartData.apartName" />
      <v-divider class="mx-1 ml-n1" vertical inset />
      <v-list-item-content class="mb-n6">
        <v-list-item-subtitle class="mb-1" v-text="fakeApartData.customerName" />
        <v-list-item-subtitle v-text="fakeApartData.customerPhone" />

        <v-list-item-subtitle>
          <span style="font-size: 11px">Kontrat Bitiş Tarihi: {{ fakeApartData.contractDate }}</span>
        </v-list-item-subtitle>

        <v-list-item-subtitle class="pa-3 mx-n6">
          <div class="mx-3 pb-3">
            <div class="d-flex mb-3 font-weight-bold">
              <sub v-text="`Kalan Gün: 15`" />
              <v-spacer />
              <sub v-text="`% 15`" />
            </div>
            <v-progress-linear class="mt-1" :value="15" color="primary" />
          </div>
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-avatar class="ma-n2 pl-3" size="90">
        <v-col>
          <v-icon class="mb-n3" size="50" color="primary">mdi-home-roof</v-icon>
          <span class="font-weight-bold primary--text" style="font-size: 36px">
            {{ fakeApartData.apartRoomCount }}<sup v-text="`+${fakeApartData.apartType}`" />
          </span>
        </v-col>
      </v-list-item-avatar>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  data: () => {
    return {
      fakeApartData: {
        id: 5,
        apartName: "A-105",
        apartType: 0,
        apartRoomCount: 1,
        customerName: "Baki ÜN",
        customerPhone: "05050619070",
        contractDate: "11.12.2022",
      },
    };
  },

  methods: {
    showApart() {
      this.$router.push(`/aparts/show/${this.fakeApartData.id}`);
    },
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
