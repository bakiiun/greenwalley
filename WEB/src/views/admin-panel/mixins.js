import { api } from "../../plugins/axios/Req-Module";
export default {
  methods: {
    mPersonalInfo() {
      api("get", "/gate")
        .then((res) => {
          this.$data.personalInfo = res.data;
        })
        .catch(() => {
          this.notification(["Yönlendiriliyor", "Lütfen giriş yapınız.", "warning"]);
          this.$router.push("/login");
        });
    },
    async mPersonalUpdate(payload) {
      return api("patch", "/personals", payload).then((res) => {
        if (res.status == 200) {
          return true;
        }
      });
    },
  },
  mounted() {
    this.mPersonalInfo();
  },
};
