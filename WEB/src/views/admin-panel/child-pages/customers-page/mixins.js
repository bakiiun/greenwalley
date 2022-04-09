import { api } from "../../../../plugins/axios/Req-Module";

export default {
  methods: {
    mCustomerList() {
      api("get", "/customers").then((res) => {
        this.$data.customerList = res.data;
        this.$data.showList = res.data;
      });
    },
  },
  mounted() {
    this.mCustomerList();
  },
};
