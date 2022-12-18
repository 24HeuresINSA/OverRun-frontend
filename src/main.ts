import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./axios";
import axios from "axios";

import "./assets/global.css";
import { MutationTypes } from "./store/modules/auth";

console.log(axios.defaults.baseURL);

export const edition = 1;

router.beforeEach(async (to, from) => {

  const accessToken = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem("refreshToken");
  const userId = localStorage.getItem("userId");
  const adminId = localStorage.getItem("adminId");
  if (accessToken && refreshToken) {
    store.commit(MutationTypes.SET_ACCESS_TOKEN, accessToken);
    store.commit(MutationTypes.SET_REFRESH_TOKEN, refreshToken);
    store.commit(MutationTypes.SET_USER, userId);
    store.commit(MutationTypes.SET_ADMIN_ID, adminId);
  }

  if (store.getters.getAccessToken === "" && to.name !== "Login") {
    return { name: "Login" };
  }
});

createApp(App).use(router).use(store).mount("#app");
