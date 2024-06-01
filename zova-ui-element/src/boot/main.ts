import { createApp } from 'vue';
import router from './router.js';
import App from './app.vue';
import { cabloy } from './cabloy.js';

import '../css/index.scss';
import 'uno.css';

async function start({ app, router }) {
  await cabloy({ app, router });
  app.use(router);
  app.mount('#app');
}

const app = createApp(App);
start({ app, router });