import { api } from "../../../../../plugins/axios/Req-Module";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["trigger"]),

    mCustomerInfo() {
      api("get", `/customers/${this.$route.params.id}`).then((res) => {
        if (res.status == 200) {
          this.$data.customer = res.data;

          this.trigger({
            state: "breadcrumbs",
            data: [
              { text: "Müşteriler", disabled: false, href: "/customers" },
              { text: res.data.customer_name, disabled: true, href: `/customers/${res.data.customer_id}` },
            ],
          });
        }
      });

      api("get", `/aparts/${this.$route.params.id}/invoices`).then((res) => {
        if (res.status == 200) {
          this.$data.invoices = res.data;
        }
      });
    },
  },
  mounted() {
    this.mCustomerInfo();
  },
};
