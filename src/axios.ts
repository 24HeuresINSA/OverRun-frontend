import axios from "axios";
import router from "./router";
import store from "./store";
import { MutationTypes } from "./store/modules/auth";

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response.status === 403) {
      originalConfig._retry = true;
      const response = axios.post("refresh", {
        refreshToken: store.getters.getRefreshToken,
      });
      if (
        (await response).status === 200 &&
        (await response).data.accessToken &&
        (await response).data.refreshToken
      ) {
        store.commit(
          MutationTypes.SET_ACCESS_TOKEN,
          (await response).data.accessToken
        );
        store.commit(
          MutationTypes.SET_REFRESH_TOKEN,
          (await response).data.refreshToken
        );
        if (
          localStorage.getItem("accessToken") !== "" &&
          localStorage.getItem("refreshToken") !== ""
        ) {
          localStorage.setItem(
            "accessToken",
            (await response).data.accessToken
          );
          localStorage.setItem(
            "refreshToken",
            (await response).data.refreshToken
          );
        }
        return axios(originalConfig);
      } else {
        store.commit(MutationTypes.SET_ACCESS_TOKEN, "");
        store.commit(MutationTypes.SET_REFRESH_TOKEN, "");
        router.push({ name: "Login" });
      }
    }
    return Promise.reject(err);
  }
);
