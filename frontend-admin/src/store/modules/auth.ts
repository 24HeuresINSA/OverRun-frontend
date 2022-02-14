import { MutationTree } from "vuex";
import { ActionTree, ActionContext } from "vuex";
import { GetterTree } from "vuex";
import axios from "axios";


export const state = {
  loginToApi: false,
};

export type State = typeof state;

export enum MutationTypes {
  SET_LOGIN_TO_API = "SET_LOGIN_TO_API",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_LOGIN_TO_API](state: S, data: boolean): void;
};

export enum ActionTypes {
    LOGIN_API = 'LOGIN_API',
}

type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, "commit">;

export interface Actions {
  [ActionTypes.LOGIN_API](
    { commit }: AugmentedActionContext,
    payload: Object
  ): void;
}

export type Getters = {
  getLoginApiStatus(state: State): boolean;
};

export const getters: GetterTree<State, State> & Getters = {
    getLoginApiStatus: (state) => {
        return state.loginToApi;
    }
};

const actions: ActionTree<State, State> & Actions = {
    async [ActionTypes.LOGIN_API]({ commit }, payload: Object) {
        const response = await axios.post("http://localhost:8000/api/v1/login", payload, { withCredentials: true }).catch((err) => {
            console.log(err)
        });

        if (response && response.data) {
            localStorage.setItem("isAuthenticated", "true");
            commit(MutationTypes.SET_LOGIN_TO_API, true);
        } else {

            commit(MutationTypes.SET_LOGIN_TO_API, false);
        }
    }
};

const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_LOGIN_TO_API](state, data: boolean) {
    state.loginToApi = data;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
