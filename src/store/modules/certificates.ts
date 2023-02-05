import { Certificate } from "@/types/interface";
import axios from "axios";
import { ActionContext, MutationTree } from "vuex";

const state = {
  certificates: [] as Certificate[],
  mCertificate: {} as Certificate,
};

export type State = typeof state;

export enum MutationTypes {
  SET_CERTIFICATES = "SET_CERTIFICATES",
  SET_CERTIFICATE = "SET_CERTIFICATE",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_CERTIFICATES](state: S, payload: Certificate[]): void;
  [MutationTypes.SET_CERTIFICATE](state: S, id: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_CERTIFICATES](state, payload: Certificate[]) {
    state.certificates = payload;
  },
  [MutationTypes.SET_CERTIFICATE](state, id: number) {
    state.mCertificate = state.certificates.find(
      (certificate) => certificate.id === id
    ) as Certificate;
  },
};

export type Getters = {
  getCertificates(state: State): Certificate[];
  getmCertificate(state: State): Certificate;
  getCertificateFile(state: State): string;
};

export const getters: Getters = {
  getCertificates: (state) => {
    return state.certificates;
  },
  getmCertificate: (state) => {
    return state.mCertificate;
  },
  getCertificateFile: (state) => {
    return state.mCertificate.filename;
  },
};

export type Actions = {
  fetchCertificates(context: ActionContext<State, State>): void;
};

export const actions: Actions = {
  async fetchCertificates({ commit, rootGetters }) {
    const certificatesResponse = await axios.get("certificates", {
      params: {
        editionId: rootGetters["edition/getEditionId"],
      },
    });
    commit(MutationTypes.SET_CERTIFICATES, certificatesResponse.data.data);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
  namespaced: true,
};
