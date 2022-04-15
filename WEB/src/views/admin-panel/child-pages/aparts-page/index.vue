<template>
  <div>
    <div class="d-flex">
      <v-text-field
        background-color="grey lighten-1"
        prepend-icon="mdi-home-search"
        @click:prepend="(dialog = true), (dialogType = 'filter')"
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
      <v-card v-show="dialogType == 'create'">
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

      <!--  -->

      <v-card v-show="dialogType == 'filter'">
        <v-card-title class="text-h5">FİLTRELE</v-card-title>
        <div class="mx-2 ml-5">
          <v-card outlined>
            <div class="ma-1">
              <span>GÖSTER</span>
              <v-row class="mb-n10">
                <v-col>
                  <v-checkbox v-model="apartFilter.empty" label="Boş" hide-details />
                </v-col>
                <v-col>
                  <v-checkbox v-model="apartFilter.full" label="Dolu" hide-details />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-checkbox v-model="apartFilter.apart" label="Apart" hide-details />
                </v-col>
                <v-col>
                  <v-checkbox v-model="apartFilter.office" label="Ofis" hide-details />
                </v-col>
              </v-row>
            </div>
          </v-card>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">İPTAL</v-btn>
          <v-btn color="primary" @click="(dialog = false), filterEvent()" text>ONAYLA</v-btn>
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
      dialogType: "create",
      apartFilter: {
        empty: true,
        full: true,
        apart: true,
        office: true,
      },
      search: "",
      createApart: {
        apartName: "",
        apartRoomCount: "",
        apartType: null,
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

    filterEvent() {
      const { empty, full, office, apart } = this.apartFilter;

      const emptyFilter = (x) => (empty ? !x.customerID : x.customerID);
      const fullFilter = (x) => (full ? x.customerID : !x.customerID);
      const apartFilter = (x) => (apart ? x.apartType : !x.apartType);
      const officeFilter = (x) => (office ? !x.apartType : x.apartType);

      this.showList = this.apartList.filter((i) => emptyFilter(i) || fullFilter(i));
      this.showList = this.showList.filter((i) => apartFilter(i) || officeFilter(i));
    },
  },

  watch: {
    search: function (v) {
      let val = v.toLowerCase();
      if (val.length > 2) {
        this.showList = this.apartList.filter(
          (i) =>
            i.apartName.includes(val) ||
            i.customerName?.toLowerCase().includes(val) ||
            i.customerPhone?.includes(val) ||
            i.identityNumber?.includes(val)
        );

        this.apartFilter = {
          empty: true,
          full: true,
          apart: true,
          office: true,
        };
      } else {
        this.showList = this.apartList;
      }
    },
    dialog: function (v) {
      if (!v) {
        this.createApart = {
          apartName: "",
          apartRoomCount: "",
          apartType: null,
        };
      }
    },

    showList: function (v) {
      console.log(v);
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
