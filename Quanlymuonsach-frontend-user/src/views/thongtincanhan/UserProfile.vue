<template>
  <div class="container py-5" v-if="user">
    <div class="hero-section text-white text-center py-5 mb-5">
      <h1 class="display-4 fw-bold">
        <i class="fas fa-id-card me-2"></i> Thông Tin Cá Nhân
      </h1>
      <p class="lead">
        Thông tin tài khoản của bạn tại hệ thống quản lý mượn sách
      </p>
    </div>

    <div class="row justify-content-center">
      <div class="col-lg-10">
        <div class="card shadow-lg rounded-4 p-4">
          <div class="row g-4">
            <div
              class="col-md-4 text-center border-end d-flex flex-column align-items-center justify-content-center"
            >
              <i
                class="fas fa-user-circle text-primary mb-3"
                style="font-size: 120px"
              ></i>
              <h3 class="fw-bold">{{ fullName }}</h3>
              <p class="text-muted mb-1">
                <i class="fas fa-barcode me-1"></i> Reader ID:
                <b>{{ user.MaDocGia }}</b>
              </p>
              <p class="text-muted mb-0">
                <i class="fas fa-user me-1"></i> Username:
                <b>{{ user.Username }}</b>
              </p>
            </div>

            <div class="col-md-8">
              <div class="mb-3">
                <label class="fw-semibold">Họ và Tên:</label>
                <p class="form-control">{{ fullName }}</p>
              </div>

              <div class="mb-3">
                <label class="fw-semibold">Giới tính:</label>
                <p class="form-control">{{ user.Phai || "Chưa cập nhật" }}</p>
              </div>

              <div class="mb-3">
                <label class="fw-semibold">Số điện thoại:</label>
                <p class="form-control">{{ user.DienThoai || "Chưa cập nhật" }}</p>
              </div>

              <div class="mb-3">
                <label class="fw-semibold">Địa chỉ:</label>
                <p class="form-control">{{ user.DiaChi || "Chưa cập nhật" }}</p>
              </div>

              <div class="d-flex gap-3 mt-4 flex-wrap">
                <router-link
                  class="btn btn-warning flex-fill"
                  :to="{ name: 'docgia.edit', params: { id: user._id } }"
                >
                  <i class="fas fa-edit me-2"></i> Đổi thông tin cá nhân
                </router-link>
                <router-link to="/" class="btn btn-success flex-fill">
                  <i class="fas fa-arrow-left me-2"></i> Về trang chủ
                </router-link>
                <button class="btn btn-danger flex-fill" @click="logout">
                  <i class="fas fa-sign-out-alt me-2"></i> Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";

export default {
  name: "UserProfile",
  data() {
    return {
      user: null,
    };
  },
  computed: {
    fullName() {
      return this.user
        ? `${this.user.HoLot || ""} ${this.user.Ten || ""}`.trim()
        : "";
    },
  },
  methods: {
    async loadUser() {
      const localUser = JSON.parse(localStorage.getItem("user"));
      if (!localUser) {
        alert("Please log in first!");
        return this.$router.push("/login");
      }
      try {
        const updatedUser = await DocGiaService.get(localUser._id);
        this.user = updatedUser;
        localStorage.setItem("user", JSON.stringify(updatedUser));
      } catch (err) {
        console.error(err);
        this.user = localUser;
      }
    },
    logout() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
  mounted() {
    this.loadUser();
  },
};
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #007bff, #00b4d8);
  border-radius: 0 0 40px 40px;
}

.card {
  border-radius: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.form-control {
  background-color: #f8f9fa;
  border-radius: 12px;
  border: 1px solid #d1d1d1;
  padding: 12px;
}

.btn {
  font-weight: 600;
  text-transform: uppercase;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.border-end {
  border-right: 1px solid #dee2e6 !important;
}
</style>
