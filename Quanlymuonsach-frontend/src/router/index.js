import { createWebHistory, createRouter } from "vue-router";
import Home from "@/views/Home.vue";
import UserLogin from "@/views/auth/UserLogin.vue";
import UserRegister from "@/views/auth/UserRegister.vue";

import SachList from "@/views/sach/SachList.vue";

const routes = [

  {
    path: "/",
    name: "home",
    component: Home,
  },

  {
    path: "/login",
    name: "login",
    component: UserLogin,
    meta: { requiresGuest: true },
  },
  {
    path: "/register",
    name: "register",
    component: UserRegister,
    meta: { requiresGuest: true },
  },

{
  path: "/nhanvien/login",
  name: "nhanvien.login",
  component: () => import("@/views/auth/NhanVienLogin.vue"),
  meta: { requiresGuest: true },
},

{
  path: "/nhanvien/register",
  name: "nhanvien.register",
  component: () => import("@/views/auth/NhanVienRegister.vue"),
  meta: { requiresGuest: true },
},


  {
    path: "/thongtincanhan",
    name: "user.profile",
    component: () => import("@/views/thongtincanhan/UserProfile.vue"),
  },
{
  path: "/nhanvien/profile",
  name: "nhanvien.profile",
  component: () => import("@/views/thongtincanhan/NhanVienProfile.vue"),
  meta: { requiresAuth: true }, 
},
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

  {
    path: "/muonsach",
    name: "muonsach.list",
    component: () => import("@/views/theodoimuonsach/MuonSachList.vue"),
  },
  {
    path: "/muonsach/add/:MaSach",
    name: "muonsach.add",
    component: () => import("@/views/theodoimuonsach/MuonSachAdd.vue"),
    props: true,
  },
  {
    path: "/muonsach/:id",
    name: "muonsach.detail",
    component: () => import("@/views/theodoimuonsach/MuonSachDetail.vue"),
    props: true,
  },

 {
  path: "/phieumuon",
  name: "phieumuon.list",
  component: () => import("@/views/theodoimuonsach/MuonSachList.vue"),
},


  {
    path: "/:pathMatch(.*)*",
    name: "notfound",
    component: () => import("@/views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
