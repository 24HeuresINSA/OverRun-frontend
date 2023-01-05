import { createStore } from "vuex";
import authModule, { State as AuthState } from "./modules/auth";
import editionModule, { State as EditionState } from "./modules/edition";

export type State = AuthState & EditionState;

const store = createStore<State>({
  modules: {
    auth: authModule,
    edition: editionModule,
  },
});

export default store;
