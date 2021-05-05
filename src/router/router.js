import Vue from "vue";
import VueRouter from "vue-router";

import ClientsList from "@/components/ClientsList";

Vue.use(VueRouter);

const routes = [{ path: "/", component: ClientsList, secure: false }];

const router = new VueRouter({
  mode: "history",
  //  base: process.env.BASE_URL,
  routes,
});

export default router;
