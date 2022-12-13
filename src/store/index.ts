import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions,
} from "vuex";
import authModule from "./modules/auth";
import { Store } from "./modules/auth";

const store = createStore({
  modules: {
    auth: authModule,
  },
});

export default store;
