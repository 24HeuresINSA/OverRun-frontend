import axios from "axios";
import router from "./router";
import store from "./store";
import { MutationTypes } from "./store/modules/auth";

const axiosRefeshInstance = axios.create();
axiosRefeshInstance.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL;

axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err?.config;
    if (err?.response?.status === 403) {
      await axiosRefeshInstance
        .post("refresh", {
          refreshToken: store.getters["auth/getRefreshToken"],
        })
        .then((response) => {
          if (response.status === 200) {
            const { accessToken, refreshToken } = response.data;
            store.commit(`auth/${MutationTypes.SET_ACCESS_TOKEN}`, accessToken);
            store.commit(
              `auth/${MutationTypes.SET_REFRESH_TOKEN}`,
              refreshToken
            );

            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);
            originalConfig.headers["Authorization"] = `Bearer ${accessToken}`;
          }
        })
        .catch((error) => {
          store.commit(`auth/${MutationTypes.SET_ACCESS_TOKEN}`, "");
          store.commit(`auth/${MutationTypes.SET_REFRESH_TOKEN}`, "");
          store.commit(`auth/${MutationTypes.SET_USER}`, "");
          store.commit(`auth/${MutationTypes.SET_ADMIN_ID}`, "");
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          return router.push({ name: "Login" });
        });
    }
    return err.response;
  }
);
