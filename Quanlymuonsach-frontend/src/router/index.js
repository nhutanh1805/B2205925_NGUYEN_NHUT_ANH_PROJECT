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

  // các bảng khác sẽ thêm đây

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
