import { api } from "../../../../plugins/axios/Req-Module";

export default {
  methods: {
    mApartList() {
      api("get", "/aparts").then((res) => {
        this.$data.apartList = res.data;
        this.$data.showList = res.data;
      });
    },

    async mCreateApart() {
      const { apartName, apartType, apartRoomCount } = this.$data.createApart;
      return api("post", "/aparts", { apartName, apartType, apartRoomCount })
        .then((i) => {
          if (i.status == 201) {
            this.notification(["İşlem Başarılı", "Daire oluşturma işlemi başarılı.", "success"]);
            this.mApartList();
            return true;
          }
          return false;
        })
        .catch(() => {
          this.notification(["İşlem Başarısız", "Daire oluşturma işleminde bir hata oluştu.", "error"]);
        });
    },
  },

  mounted() {
    this.mApartList();
  },
};
