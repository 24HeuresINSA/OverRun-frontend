import axios from "axios";
import { ActionContext, ActionTree, GetterTree, MutationTree } from "vuex";

export const state = {
  editionId: 0,
};

export type State = typeof state;

export enum MutationTypes {
  SET_EDITION_ID = "SET_EDITION_ID",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_EDITION_ID](state: S, payload: number): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_EDITION_ID](state, payload: number) {
    state.editionId = payload;
  },
};

export type Getters = {
  getEditionId(state: State): number;
};

export const getters: GetterTree<State, State> & Getters = {
  getEditionId: (state) => {
    return state.editionId;
  },
};

export type Actions = {
  setEditionId(context: ActionContext<State, State>, payload: number): void;
};

export const actions: ActionTree<State, State> & Actions = {
  async setEditionId({ commit }) {
    const curentEditionResponse = await axios.get("/edition/curent");
    commit(MutationTypes.SET_EDITION_ID, curentEditionResponse.data.id);
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
