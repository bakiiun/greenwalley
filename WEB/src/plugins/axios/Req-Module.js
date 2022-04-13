import router from "../../router";
import axios from "axios";
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
    switch (e.response.status) {
      case 401:
        router.push("/login");
        break;
      case 403:
        return { color: "orange", msg: "Bunun için yetkiniz yok." };
      case 404:
        return { color: "orange", msg: "404, Bulunamadı." };
      case 500:
        return { color: "red", msg: "Sunucu kaynaklı hata." };
      default:
        return { color: "red", msg: "Sunucu kaynaklı hata." };
    }
  }
}
