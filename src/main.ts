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
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJwaW50YWRlIiwicm9sZSI6IkFETUlOIiwiZXhwaXJlX2F0IjoiMjAyMi0wMi0xOFQwNTo0NTo1MC40MTRaIiwiYXRobGV0ZUlkIjpudWxsLCJhZG1pbklkIjoxLCJpYXQiOjE2NDUxMzMxNTAsImV4cCI6MTY0NTE2MzE1MH0.-3oWlIBHFLCv2sJBXesmtLhnx07AkQTOdjOQR04IId8"
);
store.commit(
  MutationTypes.SET_ADMIN_ID, 1
)


createApp(App).use(router).use(store).mount('#app')
