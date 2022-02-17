import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';
import "./axios";
import axios from "axios";

import './assets/global.css'
import { MutationTypes } from './store/modules/auth';

console.log(axios.defaults.baseURL);

export const edition = 1;
store.commit(
  MutationTypes.SET_ACCESS_TOKEN,
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwaW50YWRlIiwicm9sZSI6IkFETUlOIiwiZXhwaXJlX2F0IjoiMjAyMi0wMi0xN1QyMTowMTowNi41MDJaIiwiYXRobGV0ZUlkIjpudWxsLCJhZG1pbklkIjoxLCJpYXQiOjE2NDUxMDE2NjYsImV4cCI6MTY0NTEzMTY2Nn0.nrXpzuJV4xpUnE08ul9rZ2jHB7WpUc-pFcQ5z3km4S4"
);
store.commit(
  MutationTypes.SET_ADMIN_ID, 1
)


createApp(App).use(router).use(store).mount('#app')
