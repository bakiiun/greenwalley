import { api } from "../../../../../plugins/axios/Req-Module";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["trigger"]),

    mApartData() {
      api("get", `/aparts/${this.$route.params.id}`).then((res) => {
        this.$data.apartDetail = res.data;
        this.trigger({
          state: "breadcrumbs",
          data: [
            { text: "Daireler", disabled: false, href: "/aparts" },
            { text: res.data.apartName, disabled: true, href: "/aparts/show/:id" },
          ],
        });
        const { customerID } = res.data;
        if (customerID) {
          this.mInvoiceList(customerID);
        }
      });
    },

    //* APART EVENTS

    async mUpdateApart(payload) {
      return api("put", `/aparts/${payload.apartID}`, payload).then((res) => {
        if (res.status == 200) {
          this.mApartData();
          return true;
        }
      });
    },

    mDeleteApart(apartID) {
      api("delete", `/aparts/${apartID}`).then((res) => {
        if (res.status == 200) {
          this.$router.push("/aparts");
        }
      });
    },

    //* CUSTOMER EVENTS

    async mCustomerCreate(payload) {
      return api("post", "/customers", payload).then((res) => {
        if (res.status == 201) {
          this.mApartData();
          return true;
        }
      });
    },

    async mCustomerUpdate(payload) {
      return api("put", `/customers/${payload.customerID}`, payload).then((res) => {
        if (res.status == 200) {
          this.mApartData();
          return true;
        }
      });
    },

    async mCustomerEndContract(customerID) {
      return api("patch", `/customers/:${customerID}`, { customerID }).then((res) => {
        if (res.status == 200) {
          this.mApartData();
          this.mInvoiceList();
          return true;
        }
      });
    },

    //* ITEM EVENTS

    mItemList() {
      api("get", `/aparts/${this.$route.params.id}/items`).then((res) => {
        this.$data.itemList = res.data;
      });
    },

    async mItemCreate(payload) {
      return api("post", `/aparts/${this.$route.params.id}/items`, payload).then((res) => {
        if (res.status == 201) {
          this.mItemList();
          return true;
        }
      });
    },

    async mItemDelete(itemID) {
      return api("delete", `/aparts/${this.$route.params.id}/items/${itemID}`).then((res) => {
        if (res.status == 200) {
          this.mItemList();
          return true;
        }
      });
    },

    //* INVOICE EVENTS

    mInvoiceList(id) {
      api("get", `/aparts/${id}/invoices`).then((res) => {
        this.$data.invoiceList = res.data;
      });
    },

    async mInvoicePay(customerID, invoiceID) {
      return api("patch", `/aparts/${customerID}/invoices/${invoiceID}`, { invoiceID }).then((res) => {
        if (res.status == 200) {
          this.mInvoiceList(customerID);
          return true;
        }
      });
    },
  },

  mounted() {
    this.mApartData();
    this.mItemList();
  },
};
