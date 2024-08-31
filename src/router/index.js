// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import VideoCapture from '../views/VideoCapture.vue';
import ImageDisplay from '../views/ImageDisplay.vue';

const routes = [
  {
    path: '/',
    name: 'video',
    component: VideoCapture,
  },
  {
    path: '/image',
    name: 'image',
    component: ImageDisplay,
  }

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
