import {
  ActionContext,
  CommitOptions,
  DispatchOptions,
  GetterTree,
  MutationTree,
  Store as VuexStore,
} from "vuex";

export const state = {
  accessToken: "",
  refreshToken: "",
  user: null as unknown,
  adminId: null as unknown,
};

export type State = typeof state;

export enum MutationTypes {
  SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN",
  SET_REFRESH_TOKEN = "SET_REFRESH_TOKEN",
  SET_USER = "SET_USER",
  SET_ADMIN_ID = "SET_ADMIN_ID",
  LOGOUT = "LOGOUT",
}

export type Mutations<S = State> = {
  [MutationTypes.SET_ACCESS_TOKEN](state: S, payload: string): void;
  [MutationTypes.SET_REFRESH_TOKEN](state: S, payload: string): void;
  [MutationTypes.SET_USER](state: S, payload: unknown): void;
  [MutationTypes.SET_ADMIN_ID](state: S, payload: unknown): void;
  [MutationTypes.LOGOUT](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationTypes.SET_ACCESS_TOKEN](state, payload: string) {
    state.accessToken = payload;
  },
  [MutationTypes.SET_REFRESH_TOKEN](state, payload: string) {
    state.refreshToken = payload;
  },
  [MutationTypes.SET_USER](state, payload: unknown) {
    state.user = payload;
  },
  [MutationTypes.SET_ADMIN_ID](state, payload: unknown) {
    state.adminId = payload;
  },
  [MutationTypes.LOGOUT](state) {
    state.user = null;
    state.accessToken = "";
    state.refreshToken = "";
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};

export type Getters = {
  getAccessToken(state: State): string;
  getRefreshToken(state: State): string;
  getUser(state: State): unknown;
  getAdminId(state: State): unknown;
};

export const getters: GetterTree<State, State> & Getters = {
  getAccessToken: (state) => {
    return state.accessToken;
  },
  getRefreshToken: (state) => {
    return state.refreshToken;
  },
  getUser: (state) => {
    return state.user;
  },
  getAdminId: (state) => {
    return state.adminId;
  },
};

export enum ActionTypes {
  LOGIN_API = "LOGIN_API",
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
    payload: unknown
  ): void;
}

// const actions: ActionTree<State, State> & Actions = {
//   async [ActionTypes.LOGIN_API]({ commit }, payload: Object) {
//     const response = await axios
//       .post("http://localhost:8000/api/v1/login", payload, {
//         withCredentials: true,
//       })
//       .catch((err) => {
//         console.log(err);
//       });

//     if (response && response.data) {
//       localStorage.setItem("isAuthenticated", "true");
//       commit(MutationTypes.SET_LOGIN_TO_API, true);
//     } else {
//       commit(MutationTypes.SET_LOGIN_TO_API, false);
//     }
//   },
// };

export default {
  state,
  getters,
  // actions,
  mutations,
  namespaced: true,
};

export type Store = Omit<
  VuexStore<State>,
  "getters" | "commit" | "dispatch"
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};
