import { api } from "../../plugins/axios/Req-Module";

export default {
  methods: {
    mLogin() {
      const { username, pwd } = this.$data;
      api("post", "/login", { username, pwd }).then(async (i) => {
        localStorage.setItem("token", i.data.token);
        await this.$router.push("/dashboard");
        return;
      });
    },
  },

  mounted() {
    api("get", "/gate").then((i) => {
      if (i.status == 200) {
        this.$router.push("/dashboard");
      }
    });
  },
};
