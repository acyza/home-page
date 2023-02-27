import { createRouter, createWebHistory } from "vue-router";
import Config from "./config";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: Config,
});

export default router;
