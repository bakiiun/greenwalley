<template>
  <div>
    <v-btn v-if="!fakeData.customerID" class="primary my-7" @click="(dialog = true), (dialogType = 'create')" block x-large>
      YENİ MÜŞTERİ OLUŞTUR
    </v-btn>
    <v-card v-else outlined>
      <v-list-item>
        <v-list-item-content three-line>
          <v-list-item-title class="mb-2"> Müşteri Bilgileri </v-list-item-title>
          <v-list-item-subtitle> <span class="font-weight-bold">TC: </span> {{ fakeData.customerID }} </v-list-item-subtitle>
          <v-list-item-subtitle> <span class="font-weight-bold">ADI: </span> {{ fakeData.customerName }} </v-list-item-subtitle>
          <v-list-item-subtitle> <span class="font-weight-bold">TEL: </span> {{ fakeData.customerPhone }} </v-list-item-subtitle>
          <v-list-item-subtitle> <span class="font-weight-bold">KONTRAT:</span> {{ fakeData.contractDate }} </v-list-item-subtitle>
          <v-list-item-subtitle> <span class="font-weight-bold">KALAN GÜN:</span> 16 - {{ fakeData.contractDate }} </v-list-item-subtitle>
          <v-progress-linear class="mt-1" :value="15" color="primary" />
        </v-list-item-content>
      </v-list-item>
      <v-card-actions class="justify-end">
        <v-btn class="error" @click="(dialog = true), (dialogType = 'endContract')"> SONLANDIR </v-btn>
        <v-btn class="warning" @click="(dialog = true), (dialogType = 'update')"> DÜZENLE </v-btn>
        <v-btn class="success" @click="(dialog = true), (dialogType = 'updateContract')"> UZAT </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialog" persistent max-width="300">
      <!-- ************ -->
      <!-- CONTRACT END -->
      <!-- ************ -->
      <v-card v-show="dialogType == 'endContract'">
        <v-card-title class="text-h5 font-weight-bold">SONLANDIR</v-card-title>
        <div class="d-flex justify-center">
          <v-card-text class="text-center text-body-2 mx-2"> Bu dairedeki müşterinin kontratını sonlandırmak için onaylayın. </v-card-text>
        </div>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="dialog = false">İPTAL</v-btn>
          <v-btn color="red darken-1" text @click="endContractEvent()">ONAYLA</v-btn>
        </v-card-actions>
      </v-card>
      <!-- ****** -->
      <!-- UPDATE -->
      <!-- ****** -->
      <v-card v-show="dialogType == 'update' || dialogType == 'create'">
        <v-card-title class="text-h5">{{ dialogType == "update" ? "DÜZENLE" : "OLUŞTUR" }}</v-card-title>
        <div class="mx-2">
          <v-text-field
            class="mb-2"
            background-color="grey lighten-1"
            prepend-icon="mdi-card-account-details"
            label="TC Numarası"
            v-model="customer.idNumber"
            dense
            flat
            hide-details
            rounded
            solo
          />
          <v-text-field
            class="mb-2"
            background-color="grey lighten-1"
            prepend-icon="mdi-account"
            label="Adı Soyadı"
            v-model="customer.name"
            dense
            flat
            hide-details
            rounded
            solo
          />
          <v-text-field
            class="mb-2"
            background-color="grey lighten-1"
            prepend-icon="mdi-card-account-phone"
            label="Numarası"
            v-model="customer.phone"
            dense
            flat
            hide-details
            rounded
            solo
          />
          <v-text-field
            class="mb-2"
            background-color="grey lighten-1"
            prepend-icon="mdi-calendar-week"
            label="Kontrat Süresi"
            v-model="customer.contractLength"
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
          <v-btn color="primary" text @click="updateEvent()">ONAYLA</v-btn>
        </v-card-actions>
      </v-card>
      <!-- *************** -->
      <!-- UPDATE CONTRACT -->
      <!-- *************** -->
      <v-card v-show="dialogType == 'updateContract'">
        <v-card-title class="text-h5 font-weight-bold">UZAT</v-card-title>
        <div class="mx-2">
          <v-text-field
            class="mb-2"
            background-color="grey lighten-1"
            prepend-icon="mdi-clipboard-plus"
            label="Eklenecek Ay"
            v-model="addContractLength"
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
          <v-btn color="primary" text @click="updateContract()">ONAYLA</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      //* VERIABLES
      dialog: false,
      dialogType: "update",
      apartType: null,

      //*INPUT MODELS

      customer: {
        idNumber: "",
        name: "",
        phone: "",
        contractLength: "",
      },
      addContractLength:"",
      fakeData: {
        id: 5,
        apartName: "A-105",
        apartType: 0,
        apartRoomCount: 1,
        customerID: 31612545800,
        customerName: "Baki ÜN",
        customerPhone: "05050619070",
        contractDate: "11.12.2022",
      },
    };
  },
  methods: {
    endContractEvent() {},
    updateEvent() {},
    updateContract() {},
  },
};
</script>

<style></style>
