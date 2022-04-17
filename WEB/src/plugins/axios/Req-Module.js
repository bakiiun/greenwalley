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
    const { status, data } = e.response;
    const dispatch = vueApp.$store.dispatch;

    switch (status) {
      case 400:
        dispatch("notification", ["400 - Eksik Girdi", data.message]);
        break;
      case 403:
        dispatch("notification", ["403 - Yasaklanmış Alan", data.message]);
        break;
      case 404:
        dispatch("notification", ["404 - Bulunamadı", data.message]);
        break;
      case 406:
        dispatch("notification", ["406 - Başarısız", "Kullanıcı adı veya şifre yanlış.", "warning"]);
        break;
      case 500:
        dispatch("notification", ["500 - Hata", data.message]);
        break;

      default:
        throw e.response;
    }
  }
}
