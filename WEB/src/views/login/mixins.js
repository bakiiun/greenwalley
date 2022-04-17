import { api } from "../../plugins/axios/Req-Module";
import { mapActions } from "vuex";

export default {
  methods: {
    ...mapActions(["notification"]),

    mLogin() {
      const { username, pwd } = this.$data;
      api("post", "/login", { username, pwd })
        .then(async (i) => {
          if (i.status == 200) {
            localStorage.setItem("token", i.data.token);
            await this.$router.push("/dashboard");
            this.notification(["Giriş Başarılı", null, "success"]);
          }
        })
        .catch(() => {
          this.$data.pwd = "";
        });
    },
  },

  mounted() {
    api("get", "/gate").then((i) => {
      if (i.status == 200) {
        this.notification(["Yönlendiriliyor", "Zaten giriş yapılmış.", "warning"]);
        this.$router.push("/dashboard");
      }
    });
  },
};
