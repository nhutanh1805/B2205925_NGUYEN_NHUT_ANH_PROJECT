<template>
  <div class="page d-flex justify-content-center">
    <div class="card shadow add-card p-4">
      <h4 class="title mb-3 text-center">
        <i class="fas fa-plus-circle"></i> Thêm Sách Mới
      </h4>

      <SachForm :sach="sach" @submit:sach="addSach" />

      <p class="text-success text-center mt-2">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import SachForm from "@/components/SachForm.vue";
import SachService from "@/services/sach.service";

export default {
  components: { SachForm },
  data() {
    return {
      sach: {
        MaSach: "",
        TenSach: "",
        TacGia: "",
        DonGia: "",
        SoQuyen: "",
        NamXuatBan: "",
        MaNXB: "",
        TheLoai: "",
      },
      message: "",
    };
  },
  methods: {
    async addSach(data) {
      await SachService.create(data);
      alert("Thêm sách thành công!");
      this.$router.push({ name: "sach.list" });
    },
  },
};
</script>

<style scoped>
.page {
  width: 100%;
  margin-top: 20px;
}

.add-card {
  width: 500px;
  border-radius: 14px;
  background: #ffffff;
}

.title {
  font-weight: 600;
  color: #007bff;
}
</style>
