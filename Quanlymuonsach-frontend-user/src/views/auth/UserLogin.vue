<template>
  <div class="page d-flex justify-content-center">
    <div class="card p-4 shadow" style="width: 380px;">
      <h4 class="text-center mb-3 text-primary fw-bold">
        <i class="fas fa-sign-in-alt"></i> Đăng nhập
      </h4>

      <form @submit.prevent="login">
        <input
          v-model="Username"
          class="form-control mb-2"
          placeholder="Tên đăng nhập"
          required
        />

        <input
          v-model="Password"
          type="password"
          class="form-control mb-3"
          placeholder="Mật khẩu"
          required
        />

        <button class="btn btn-primary w-100">
          <i class="fas fa-unlock-alt"></i> Đăng nhập
        </button>
      </form>

      <!-- Link to register page -->
      <div class="mt-3 text-center">
        <p>Bạn chưa có tài khoản? <router-link to="/register" class="text-primary">Đăng ký ngay</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";

export default {
  name: "UserLogin",
  data() {
    return {
      Username: "",
      Password: "",
    };
  },
  methods: {
    async login() {
      try {
        const result = await DocGiaService.login({
          Username: this.Username,
          Password: this.Password,
        });

        localStorage.setItem("user", JSON.stringify(result.user));

        alert("Đăng nhập thành công!");
        this.$router.push("/"); // điều hướng sau login
      } catch (error) {
        alert("Sai tên đăng nhập hoặc mật khẩu!");
      }
    },
  },
};
</script>

<style scoped>
.page {
  width: 100%;
  margin-top: 40px;
}
.form-control {
  border-radius: 10px;
  border: 1px solid #cfd8dc;
  transition: 0.2s;
}
.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.15);
}
.btn-primary {
  border-radius: 10px;
  padding: 8px 0;
  font-weight: 600;
}
</style>
