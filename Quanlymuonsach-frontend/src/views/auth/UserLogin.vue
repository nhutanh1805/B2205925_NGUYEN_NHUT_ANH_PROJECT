<template>
  <div class="page d-flex justify-content-center">
    <div class="card p-4 shadow" style="width: 380px;">
      <h4 class="text-center mb-3">Đăng nhập</h4>

      <form @submit.prevent="login">
        <input v-model="Username" class="form-control mb-2" placeholder="Tên đăng nhập" required>
        <input v-model="Password" type="password" class="form-control mb-3" placeholder="Mật khẩu" required>

        <button class="btn btn-primary w-100">Đăng nhập</button>
      </form>
    </div>
  </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";

export default {
  data() {
    return { Username: "", Password: "" };
  },
  methods: {
    async login() {
      try {
        const result = await DocGiaService.login({
          Username: this.Username,
          Password: this.Password,
        });
        localStorage.setItem("user", JSON.stringify(result.user));
        this.$router.push("/user/books");
      } catch {
        alert("Sai tài khoản hoặc mật khẩu");
      }
    },
  },
};
</script>
