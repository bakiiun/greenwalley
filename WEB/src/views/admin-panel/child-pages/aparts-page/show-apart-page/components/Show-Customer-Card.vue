<template>
  <div>
    <v-btn v-if="!data.customerID" class="primary my-7" @click="(dialog = true), (dialogType = 'create')" block x-large> YENİ MÜŞTERİ OLUŞTUR </v-btn>
    <v-card v-else outlined>
      <v-list-item>
        <v-list-item-content three-line>
          <v-list-item-title class="mb-2"> Müşteri Bilgileri </v-list-item-title>
          <v-list-item-subtitle> <span class="font-weight-bold">TC: </span> {{ data.identityNumber }} </v-list-item-subtitle>
          <v-list-item-subtitle> <span class="font-weight-bold">ADI: </span> {{ data.customerName }} </v-list-item-subtitle>
          <v-list-item-subtitle> <span class="font-weight-bold">TEL: </span> {{ data.customerPhone }} </v-list-item-subtitle>
          <v-list-item-subtitle> <span class="font-weight-bold">KONTRAT:</span> {{ `${contractDate} - ${contractEndDate}` }} </v-list-item-subtitle>
          <v-list-item-subtitle class="d-flex">
            <span class="font-weight-bold">KALAN GÜN:</span>{{ dayCounter }} <v-spacer />% {{ percent }}
          </v-list-item-subtitle>
          <v-progress-linear class="mt-1" :value="percent" color="primary" />
        </v-list-item-content>
      </v-list-item>
      <v-card-actions class="justify-end">
        <v-btn class="error" @click="(dialog = true), (dialogType = 'endContract')"> SONLANDIR </v-btn>
        <v-btn class="warning" @click="(dialog = true), (dialogType = 'update')"> DÜZENLE </v-btn>
        <!-- <v-btn class="success" @click="(dialog = true), (dialogType = 'updateContract')"> UZAT </v-btn> -->
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
            v-model="customer.identityNumber"
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
            v-model="customer.customerName"
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
            v-model="customer.customerPhone"
            dense
            flat
            hide-details
            rounded
            solo
          />
          <v-text-field
            v-show="dialogType == 'create'"
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
          <v-text-field
            v-show="dialogType == 'create'"
            class="mb-2"
            background-color="grey lighten-1"
            prepend-icon="mdi-calendar-week"
            label="Aylık Kira Ücreti"
            v-model="customer.cost"
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
          <v-btn color="primary" text @click="dialogType == 'update' ? updateEvent() : createEvent()">ONAYLA</v-btn>
        </v-card-actions>
      </v-card>
      <!-- *************** -->
      <!-- UPDATE CONTRACT -->
      <!-- *************** -->
      <!-- <v-card v-show="dialogType == 'updateContract'">
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
      </v-card> -->
    </v-dialog>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: ["data"],
  data: () => {
    return {
      //* VERIABLES

      dialog: false,
      dialogType: "",
      apartType: "",

      //*INPUT MODELS

      customer: {
        customerID: "",
        identityNumber: "",
        customerName: "",
        customerPhone: "",
        contractLength: "",
        apartID: "",
        cost: "",
      },
      // addContractLength: "",
    };
  },

  watch: {
    dialog: {
      handler: function () {
        this.customer.apartID = this.$route.params.id;
        if (this.dialogType == "create") {
          this.customer.customerID = "";
          this.customer.identityNumber = "";
          this.customer.customerName = "";
          this.customer.customerPhone = "";
          this.customer.cost = "";
        } else {
          this.customer.customerID = this.data.customerID;
          this.customer.identityNumber = this.data.identityNumber;
          this.customer.customerName = this.data.customerName;
          this.customer.customerPhone = this.data.customerPhone;
        }
      },
    },
  },

  computed: {
    contractDate() {
      return moment(this.data.contractDate, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY");
    },

    contractEndDate() {
      return moment(this.data.contractDate, "YYYY-MM-DD HH:mm:ss").add(this.data.contractLength, "months").format("DD-MM-YYYY");
    },

    dayCounter() {
      let dayCounter = moment(this.contractEndDate, "DD-MM-YYYY").diff(moment(), "days") || 0;
      return `${dayCounter}`;
    },
    contractAsDay() {
      return moment(this.contractEndDate, "DD-MM-YYYY").diff(moment(this.contractDate, "DD-MM-YYYY"), "days");
    },

    percent() {
      let contractLengthAsDay = moment().diff(moment(this.contractDate, "DD-MM-YYYY"), "days");
      let percent = Math.round((contractLengthAsDay * 100) / this.contractAsDay);
      if (percent < 1) {
        return 0;
      } else {
        return percent;
      }
    },
  },
  methods: {
    endContractEvent() {
      this.$parent.mCustomerEndContract(this.data.customerID).then((i) => {
        if (i) {
          this.dialog = false;
        }
      });
    },
    updateEvent() {
      this.$parent.mCustomerUpdate(this.customer).then((i) => {
        if (i) {
          this.dialog = false;
        }
      });
    },

    createEvent() {
      this.$parent.mCustomerCreate(this.customer).then((i) => {
        if (i) {
          this.dialog = false;
        }
      });
    },

    // updateContract() {},
  },
};
</script>

<style></style>
