import { createStore } from "vuex";
import authModule from "./modules/auth";
import editionModule from "./modules/edition";

const store = createStore({
  state: {
    ...authModule.state,
    ...editionModule.state,
  },

  modules: {
    auth: authModule,
    edition: editionModule,
  },
});

export default store;
