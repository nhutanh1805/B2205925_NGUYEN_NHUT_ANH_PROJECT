import { createWebHistory, createRouter } from "vue-router";

// bảng sách
import SachList from "@/views/sach/SachList.vue";

const routes = [
  {
    path: "/",
    name: "sach.list",
    component: SachList,
  },

  {
    path: "/sach/add",
    name: "sach.add",
    component: () => import("@/views/sach/SachAdd.vue"),
  },
  {
    path: "/sach/:id",
    name: "sach.edit",
    component: () => import("@/views/sach/SachEdit.vue"),
    props: true,
  },

  // bảng độc giả
  {
    path: "/docgia",
    name: "docgia.list",
    component: () => import("@/views/docgia/DocGiaList.vue"),
  },
  {
    path: "/docgia/add",
    name: "docgia.add",
    component: () => import("@/views/docgia/DocGiaAdd.vue"),
  },
  {
    path: "/docgia/:id",
    name: "docgia.edit",
    component: () => import("@/views/docgia/DocGiaEdit.vue"),
    props: true,
  },

 
  // 404
  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
