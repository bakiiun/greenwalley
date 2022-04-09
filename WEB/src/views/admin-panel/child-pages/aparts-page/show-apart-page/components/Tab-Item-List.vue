<template>
  <v-container fluid>
    <v-btn class="mb-2 primary" @click="(dialog = true), (dialogType = 'create')" block> YENİ EŞYA</v-btn>
    <v-card class="my-1" outlined v-for="(i, j) in itemList" :key="j">
      <v-list-item>
        <v-row align="center" no-gutters>
          <v-col cols="8"> {{ i.itemName }} </v-col>
          <v-col cols="4" class="text--secondary">
            <v-row align="center" no-gutters style="width: 100%">
              <v-col cols="9"> Tarih: {{ dateFormatter(i.itemGivenDate) }} </v-col>
              <v-col cols="3">
                <v-btn color="error" @click="(dialog = true), (dialogType = 'delete'), (selectedItem = i.itemID)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-list-item>
    </v-card>

    <v-dialog v-model="dialog" persistent max-width="300">
      <!-- ******** -->
      <!-- DEL MOD  -->
      <!-- ******** -->
      <v-card v-show="dialogType == 'delete'">
        <v-card-title class="text-h5 font-weight-bold">ONAYLA</v-card-title>
        <div class="d-flex justify-center">
          <v-card-text class="text-center text-body-2 mx-2"> Silmek için onaylayın. </v-card-text>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">İPTAL</v-btn>
          <v-btn color="red darken-1" text @click="deleteEvent()">ONAYLA</v-btn>
        </v-card-actions>
      </v-card>
      <!-- ********** -->
      <!-- CREATE MOD -->
      <!-- ********** -->
      <v-card v-show="dialogType == 'create'">
        <v-card-title class="text-h5">DÜZENLE</v-card-title>
        <div class="mx-2">
          <v-text-field
            class="mb-2"
            background-color="grey lighten-1"
            prepend-icon="mdi-toolbox-outline"
            label="Eşya Adı"
            v-model="itemName"
            dense
            flat
            hide-details
            rounded
            solo
          />
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="dialog = false">İPTAL</v-btn>
          <v-btn color="primary" text @click="createEvent()">ONAYLA</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  props: ["itemList"],
  data: () => {
    return {
      dialog: false,
      dialogType: "",
      itemName: "",
      selectedItem: "",
    };
  },
  methods: {
    createEvent() {
      this.$parent.$parent.$parent.mItemCreate({ itemName: this.itemName }).then((i) => {
        if (i) {
          this.dialog = false;
        }
      });
    },
    deleteEvent() {
      this.$parent.$parent.$parent.mItemDelete(this.selectedItem).then((i) => {
        if (i) {
          this.dialog = false;
        }
      });
    },

    dateFormatter(date) {
      return moment(date).format("DD-MM-YYYY");
    },
  },

  watch: {
    dialog() {
      this.itemName = "";
    },
  },
};
</script>

<style></style>
