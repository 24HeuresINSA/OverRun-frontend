import axios from "axios";
import { MutationTypes } from "./store/modules/auth";
import store from "./store";
import router from "./router";

axios.defaults.baseURL = "https://overrun.24heures.org/api/v1";

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (res) => {
    console.log(store.getters.getAccessToken);
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 403) {
      console.log("On essaye de refresh");
      originalConfig._retry = true;
      const response = axios.post("refresh", {
        refreshToken: store.getters.getRefreshToken,
      });
      console.log(response);
      if (
        (await response).status === 200 &&
        (await response).data.accessToken &&
        (await response).data.refreshToken
      ) {
        console.log("Hello");
        store.commit(
          MutationTypes.SET_ACCESS_TOKEN,
          (await response).data.accessToken
        );
        store.commit(
          MutationTypes.SET_REFRESH_TOKEN,
          (await response).data.refreshToken
        );
        return axios(originalConfig);
      } else {
        router.push({ name: "Login" });
      }
    }
    return Promise.reject(err);
  }
);
