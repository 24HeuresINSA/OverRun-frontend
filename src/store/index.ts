import { createStore } from "vuex";
import authModule, { State as AuthState } from "./modules/auth";
import editionModule, { State as EditionState } from "./modules/edition";
import certificatesModule, {
  State as CertificatesState,
} from "./modules/certificates";

export type State = AuthState & EditionState & CertificatesState;

const store = createStore<State>({
  modules: {
    auth: authModule,
    edition: editionModule,
    certificates: certificatesModule,
  },
});

export default store;
