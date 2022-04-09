<template>
  <div>
    <v-card outlined>
      <v-list-item>
        <v-list-item-content three-line>
          <v-list-item-title class="mb-2"> DAİRE Bilgileri </v-list-item-title>
          <v-list-item-subtitle> <span class="font-weight-bold">NO: </span> {{ data.apartName }} </v-list-item-subtitle>
          <v-list-item-subtitle> <span class="font-weight-bold">TİP: </span> {{ data.apartType ? "Daire" : "Ofis" }} </v-list-item-subtitle>
          <v-list-item-subtitle> <span class="font-weight-bold">ODA SAYISI: </span> {{ data.apartRoomCount }} </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-card-actions class="justify-end">
        <v-btn class="error" @click="(dialog = true), (dialogType = 'delete')"> SİL </v-btn>
        <v-btn class="warning" @click="(dialog = true), (dialogType = 'update')"> DÜZENLE </v-btn>
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="300">
      <!-- ******** -->
      <!-- DEL MOD  -->
      <!-- ******** -->
      <v-card v-show="dialogType == 'delete'">
        <v-card-title class="text-h5 font-weight-bold">ONAYLA</v-card-title>
        <div class="d-flex justify-center">
          <v-card-subtitle class="text-center font-weight-bold text-body-2 mx-2">
            Dairenin silinmesi, mevcut olan müşterinin ve müşteriye ait faturaların da silinmesine sebep olacaktır.
          </v-card-subtitle>
        </div>
        <div class="d-flex justify-center">
          <v-card-text class="text-center text-body-2 mx-2"> Silmek için onaylayın. </v-card-text>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">İPTAL</v-btn>
          <v-btn color="red darken-1" text @click="deleteEvent()">ONAYLA</v-btn>
        </v-card-actions>
      </v-card>
      <!-- ******** -->
      <!-- EDİT MOD -->
      <!-- ******** -->
      <v-card v-show="dialogType == 'update'">
        <v-card-title class="text-h5">DÜZENLE</v-card-title>
        <div class="mx-2">
          <v-text-field
            class="mb-2"
            background-color="grey lighten-1"
            prepend-icon="mdi-home-map-marker"
            label="Kapı Numarası"
            v-model="apart.apartName"
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
            v-model="apart.apartRoomCount"
            dense
            flat
            hide-details
            rounded
            solo
          />
          <div class="d-flex justify-center mt-2 font-weight-bold">DAİRE TİPİ</div>
          <div class="d-flex justify-center">
            <v-radio-group v-model="apart.apartType">
              <v-radio label="Ofis" :value="0" />
              <v-radio label="Daire" :value="1" />
            </v-radio-group>
          </div>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">İPTAL</v-btn>
          <v-btn color="primary" text @click="updateEvent()">ONAYLA</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: ["data"],
  data: () => {
    return {
      //*VERİABLES
      dialog: false,
      dialogType: 0, //* 0:update | 1:delete
      apart: {
        apartID: "",
        apartName: "",
        apartRoomCount: "",
        apartType: 1,
      },
    };
  },

  watch: {
    dialog: {
      handler: function () {
        this.apart = {
          apartID: this.data.apartID,
          apartName: this.data.apartName,
          apartRoomCount: this.data.apartRoomCount,
          apartType: this.data.apartType,
        };
      },
    },
  },

  methods: {
    deleteEvent() {
      this.dialog = false;
      this.$parent.mDeleteApart(this.data.apartID);
    },

    updateEvent() {
      this.$parent.mUpdateApart(this.apart).then((i) => {
        if (i) {
          this.dialog = false;
        }
      });
    },
  },
};
</script>

<style></style>
