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

createApp(App).use(router).use(store).mount('#app')
