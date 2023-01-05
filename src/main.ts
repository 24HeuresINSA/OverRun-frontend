import axios from "axios";
import { createApp } from "vue";
import App from "./App.vue";
import "./axios";
import router from "./router";
import store from "./store";

import "./assets/global.css";
import { MutationTypes } from "./store/modules/auth";

router.beforeEach(async (to, from) => {
  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  if (accessToken && refreshToken) {
    store.commit(`auth/${MutationTypes.SET_ACCESS_TOKEN}`, accessToken);
    store.commit(`auth/${MutationTypes.SET_REFRESH_TOKEN}`, refreshToken);
  }

  if (store.getters["auth/getAccessToken"] === "" && to.name !== "Login") {
    return { name: "Login" };
  }

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${store.getters["auth/getAccessToken"]}`;
});

store.dispatch("edition/setEdition").then(() => {
  createApp(App).use(router).use(store).mount("#app");
});
