import moment from "moment";
import { api } from "../../../../plugins/axios/Req-Module";

export default {
  mounted() {
    const { cardList } = this.$data;

    api("get", "/customer_info").then((i) => {
      const { totalCustomer, activeCustomer } = i.data;

      cardList.customerCard.value1 = `Aktif Müşteri: ${activeCustomer}`;
      cardList.customerCard.value2 = `Toplam: ${totalCustomer}`;
    });

    api("get", "/invoices").then((i) => {
      const overdueCount = i.data.filter(function (j) {
        if (moment(j.invoiceDate) < moment()) {
          return true;
        }
      }).length;

      cardList.invoiceCard.value1 = `Ödenmemiş Kira: ${i.data.length}`;
      cardList.invoiceCard.value2 = `Günü Geçen: ${overdueCount}`;
    });
  },
};
