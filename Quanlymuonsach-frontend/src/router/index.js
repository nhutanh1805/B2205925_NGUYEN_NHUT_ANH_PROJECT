import { createWebHistory, createRouter } from "vue-router";

// Trang chủ + Auth
import Home from "@/views/Home.vue";
import UserLogin from "@/views/auth/UserLogin.vue";
import UserRegister from "@/views/auth/UserRegister.vue";

// Bảng Sách
import SachList from "@/views/sach/SachList.vue";

// Bảng Độc giả
// (sử dụng import lazy cho đồng bộ như bạn đang dùng)

const routes = [
  // Trang chủ
  {
    path: "/",
    name: "home",
    component: Home,
  },

  // Auth (Đăng nhập / Đăng ký)
  {
    path: "/login",
    name: "login",
    component: UserLogin,
  },
  {
    path: "/register",
    name: "register",
    component: UserRegister,
  },

  // Bảng Sách
  {
    path: "/sach",
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

  // Bảng Độc Giả
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

  // 404 Not Found
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
