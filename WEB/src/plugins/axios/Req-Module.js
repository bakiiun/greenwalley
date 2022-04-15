import router from "../../router";
import axios from "axios";
import vueApp from "../../main";

export async function api(method, url, data) {
  try {
    const i = await axios({
      method: method,
      url: url,
      data: data || {},
      headers: {
        token: localStorage.token,
      },
    });
    return i;
  } catch (e) {
    console.log(e.response.data.message);

    const notification = (title, text, type) => {
      return vueApp.$notify({
        group: "error",
        title: title || "Hata",
        type: type || "error",
        position: "top right",
        duration: "3000",
        speed: "300",
        text: text,
      });
    };

    switch (e.response.status) {
      case 400:
        notification("400 - Hata", e.response.data.message, "warning");
        break;
      case 401:
        notification("401 - Yetkiniz Yok", e.response.data.message);
        router.push("/login");
        break;
      case 403:
        notification("403 - Yetkiniz Yok", e.response.data.message);
        break;
      case 404:
        notification("404 - Bulunamadı", e.response.data.message);
        break;
      case 500:
        notification("500 - Hata", e.response.data.message);
        break;
      default:
        notification("Hata", "Sunucu kaynaklı hata.");
        break;
    }
  }
}
