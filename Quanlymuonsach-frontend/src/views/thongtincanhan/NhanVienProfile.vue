<template>
  <div class="container py-5">

    <div class="hero-section text-white text-center py-5 mb-5">
      <h1 class="display-4 fw-bold">
        <i class="fas fa-id-card me-2"></i> Thông Tin Nhân Viên
      </h1>
      <p class="lead">Thông tin tài khoản của bạn tại hệ thống quản lý mượn sách</p>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">

        <div class="card shadow-lg p-4 rounded-4">

          <div class="text-center mb-4">
            <i class="fas fa-user-circle text-primary" style="font-size: 100px;"></i>
            <h3 class="fw-bold mt-3">{{ nhanvien.HoTenNV }}</h3>
            <p class="text-muted mb-1">
              <i class="fas fa-id-badge"></i> Employee ID: <b>{{ nhanvien.MSNV }}</b>
            </p>
            <p class="text-muted mb-1">
              <i class="fas fa-briefcase"></i> Chức vụ: <b>{{ nhanvien.ChucVu }}</b>
            </p>
          </div>

          <hr />

          <div class="mb-3">
            <label class="fw-semibold">Họ và Tên:</label>
            <p class="form-control">{{ nhanvien.HoTenNV }}</p>
          </div>

          <div class="mb-3">
            <label class="fw-semibold">Phone Number:</label>
            <p class="form-control">{{ nhanvien.SoDienThoai || "Chưa cập nhật" }}</p>
          </div>

          <div class="mb-3">
            <label class="fw-semibold">Address:</label>
            <p class="form-control">{{ nhanvien.DiaChi || "Chưa cập nhật" }}</p>
          </div>

          <div class="text-center mt-4">
            <router-link to="/" class="btn btn-success px-4">
              <i class="fas fa-arrow-left"></i> Back to Home
            </router-link>
          </div>

          <div class="text-center mt-3">
            <button class="btn btn-danger px-4" @click="logout">
              <i class="fas fa-sign-out-alt me-2"></i> Đăng xuất
            </button>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: "NhanVienProfile",
  data() {
    return {
      nhanvien: JSON.parse(localStorage.getItem("nhanvien")),
    };
  },
  mounted() {
    if (!this.nhanvien) {
      alert("Vui lòng đăng nhập trước!");
      this.$router.push("/nhanvien/login");
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("nhanvien");
      this.$router.push("/nhanvien/login");
    },
  },
};
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #007bff, #00b4d8);
  border-radius: 0 0 40px 40px;
}

.card {
  border-radius: 15px;
}

.form-control {
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #e0e0e0;
  padding: 12px;
}

.btn {
  font-weight: 600;
  text-transform: uppercase;
}
</style>
