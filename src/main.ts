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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwaW50YWRlIiwicm9sZSI6IkFETUlOIiwiZXhwaXJlX2F0IjoiMjAyMi0wMi0xN1QwNTowMzoxNC44MzNaIiwiYXRobGV0ZUlkIjpudWxsLCJhZG1pbklkIjoxLCJpYXQiOjE2NDUwNDQxOTQsImV4cCI6MTY0NTA3NDE5NH0.0XkDUUk5VuMjGbJ_iTAPz6MMUQl4SeiMKX1l1hrk4-o"
);


createApp(App).use(router).use(store).mount('#app')
