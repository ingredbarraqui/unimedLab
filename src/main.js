import { requestS } from './helpers/requestS';
import { createApp, markRaw } from 'vue';
import { createPinia } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import App from './App.vue';
import router from './router';

import LabelFromYup from '@/components/LabelFromYup.vue';

import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '/src/css/style.css';

library.add(fas, fab);
const app = createApp(App);

// eslint-disable-next-line no-undef
const baseUrl = process.env.VUE_APP_API_MAPA;

const pinia = createPinia();

/**
 * @typedef {Object} RequestS
 * @property {(url: RequestInfo | URL, params?: URLSearchParams | {} | undefined) => Promise<any>} get
 * @property {(url: RequestInfo | URL, params: URLSearchParams | {} | undefined) => Promise<any>} post
 * @property {(url: RequestInfo | URL, params: URLSearchParams | {} | undefined) => Promise<any>} upload
 * @property {(url: RequestInfo | URL, params: URLSearchParams | {} | undefined) => Promise<any>} put
 * @property {(url: RequestInfo | URL, params: URLSearchParams | {} | undefined) => Promise<any>} patch
 * @property {(url: RequestInfo | URL, params?: URLSearchParams | {} | undefined) => Promise<any>} delete
 */

/**
 * @param {import('pinia').PiniaPluginContext} context
 */
const requestSPlugin = ({ store }) => {
  store.requestS = markRaw(requestS);
};


app.component('LabelFromYup', LabelFromYup);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(pinia);
pinia.use(requestSPlugin);

app.use(router);
app.mount('#app');
