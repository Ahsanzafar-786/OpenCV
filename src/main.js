// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';  // Ensure the router path is correct

createApp(App)
  .use(router)
  .mount('#app');
