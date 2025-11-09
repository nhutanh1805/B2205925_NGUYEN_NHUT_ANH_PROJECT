<template>
  <div class="page d-flex justify-content-center">
    <div class="card shadow form-card p-4">
      <h4 class="title mb-3 text-center">
        <i class="fas fa-user-plus"></i> Thêm Độc Giả Mới
      </h4>

      <DocGiaForm :docgia="docgia" @submit:docgia="addDocGia" />

      <p class="text-success text-center mt-2">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import DocGiaForm from "@/components/DocGiaForm.vue";
import DocGiaService from "@/services/docgia.service";

export default {
  components: { DocGiaForm },
  data() {
    return {
      docgia: {
        MaDocGia: "",
        HoLot: "",
        Ten: "",
        NgaySinh: "",
        Phai: "Nam",
        DiaChi: "",
        DienThoai: ""
      },
      message: "",
    };
  },
  methods: {
    async addDocGia(data) {
      const result = await DocGiaService.create(data);

      if (result && result.message) {
        alert(result.message); // báo lỗi validation
        return;
      }

      alert("Thêm độc giả thành công!");
      this.$router.push({ name: "docgia.list" });
    },
  },
};
</script>

<style scoped>
.page {
  width: 100%;
  margin-top: 20px;
}
.form-card {
  width: 500px;
  border-radius: 14px;
  background: #ffffff;
}
.title {
  font-weight: 600;
  color: #007bff;
}
</style>
