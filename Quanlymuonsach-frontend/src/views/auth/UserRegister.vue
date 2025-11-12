<template>
  <div class="page d-flex justify-content-center">
    <div class="card p-4 shadow form-card">
      <h4 class="text-center mb-3 text-success fw-bold">
        <i class="fas fa-user-plus"></i> Đăng Ký Độc Giả
      </h4>

      <form @submit.prevent="submit">
        <div class="mb-2">
          <input v-model="form.HoLot" class="form-control" placeholder="Họ lót" required />
        </div>
        <div class="mb-2">
          <input v-model="form.Ten" class="form-control" placeholder="Tên" required />
        </div>
        <div class="mb-2">
          <input v-model="form.DienThoai" class="form-control" placeholder="Số điện thoại" />
        </div>
        <div class="mb-2">
          <input v-model="form.DiaChi" class="form-control" placeholder="Địa chỉ" />
        </div>
        <div class="mb-2">
          <input v-model="form.Username" class="form-control" placeholder="Tên đăng nhập" required />
        </div>
        <div class="mb-3">
          <input v-model="form.Password" type="password" class="form-control" placeholder="Mật khẩu" required />
        </div>
        <button class="btn btn-success w-100">
          <i class="fas fa-user-plus"></i> Đăng ký
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import DocGiaService from "@/services/docgia.service";

export default {
  name: "UserRegister",
  data() {
    return {
      form: {
        HoLot: "",
        Ten: "",
        DiaChi: "",
        DienThoai: "",
        Username: "",
        Password: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        // Tạo mã độc giả ngẫu nhiên dạng DGxxxx
        this.form.MaDocGia = "DG" + Math.floor(1000 + Math.random() * 9000);

        const response = await DocGiaService.create(this.form);

        if (response?.message?.includes("không được để trống")) {
          alert(response.message);
          return;
        }

        alert("Đăng ký thành công!");
        this.$router.push("/login");
      } catch (error) {
        console.error("Đăng ký lỗi:", error);
        alert("Đăng ký thất bại. Vui lòng thử lại!");
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
.form-card {
  width: 420px;
  border-radius: 14px;
  background: #ffffff;
}
h4 {
  color: #28a745;
}
.form-control {
  border-radius: 10px;
  border: 1px solid #cfd8dc;
  transition: 0.2s;
}
.form-control:focus {
  border-color: #28a745;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.15);
}
.btn-success {
  background-color: #28a745;
  border: none;
  border-radius: 10px;
  padding: 8px 0;
  font-weight: 600;
}
.btn-success:hover {
  background-color: #218838;
}
</style>
