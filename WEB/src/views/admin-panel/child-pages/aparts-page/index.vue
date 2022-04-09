<template>
  <div>
    <div class="d-flex">
      <v-text-field
        background-color="grey lighten-1"
        prepend-icon="mdi-home-search"
        label="Ara..."
        v-model="search"
        dense
        flat
        hide-details
        rounded
        solo
      />
      <v-btn class="ml-2 primary" @click="dialog = true">YENİ DAİRE</v-btn>
    </div>

    <v-row class="mt-2">
      <v-col cols="12" md="4" v-for="(i, j) in showList" :key="j">
        <preview-card :data="i" />
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" persistent max-width="300">
      <v-card>
        <v-card-title class="text-h5">OLUŞTUR</v-card-title>
        <div class="mx-2">
          <v-text-field
            class="mb-2"
            background-color="grey lighten-1"
            prepend-icon="mdi-home-map-marker"
            label="Kapı Numarası"
            v-model="createApart.apartName"
            dense
            flat
            hide-details
            rounded
            solo
          />

          <v-text-field
            class="mb-2"
            background-color="grey lighten-1"
            prepend-icon="mdi-home-assistant"
            label="Oda Sayısı"
            v-model="createApart.apartRoomCount"
            dense
            flat
            hide-details
            rounded
            solo
          />
          <div class="d-flex justify-center mt-2 font-weight-bold">DAİRE TİPİ</div>
          <div class="d-flex justify-center">
            <v-radio-group v-model="createApart.apartType">
              <v-radio label="Ofis" value="0" />
              <v-radio label="Daire" value="1" />
            </v-radio-group>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">İPTAL</v-btn>
          <v-btn color="primary" text @click="createApartEvent()">ONAYLA</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import mixin from "./mixins";
import previewCard from "./components/Preview-Apart-Card.vue";
import { mapActions } from "vuex";

export default {
  mixins: [mixin],
  components: { previewCard },

  data: () => {
    return {
      showList: [],
      apartList: [],
      dialog: false,
      search: "",
      createApart: {
        apartName: "",
        apartRoomCount: "",
        apartType: false,
      },
    };
  },

  methods: {
    ...mapActions(["trigger"]),
    createApartEvent() {
      this.mCreateApart().then((i) => {
        if (i) {
          this.dialog = false;
        }
      });
    },
  },

  watch: {
    search: function (v) {
      let val = v.toLowerCase();
      if (val.length > 2) {
        this.showList = this.apartList.filter(
          (i) => i.apartName.includes(val) || i.customerName?.toLowerCase().includes(val) || i.customerPhone?.includes(val) ||i.identityNumber?.includes(val)
        );
      } else {
        this.showList = this.apartList;
      }
    },
  },

  mounted() {
    this.trigger({
      state: "breadcrumbs",
      data: [{ text: "Daireler", disabled: true, href: "/aparts" }],
    });
  },
};
</script>

<style></style>
