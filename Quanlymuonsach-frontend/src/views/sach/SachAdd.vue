<template>
  <div class="page d-flex justify-content-center">
    <div class="card shadow add-card p-4">
      <h4 class="title mb-3 text-center">
        <i class="fas fa-plus-circle"></i> Thêm Sách Mới
      </h4>

      <SachForm 
        :sach="sach" 
        :nxbList="nxbList" 
        @submit:sach="addSach" 
      />

      <p class="text-success text-center mt-2">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import SachForm from "@/components/SachForm.vue";
import SachService from "@/services/sach.service";
import NhaXuatBanService from "@/services/nhaxuatban.service";

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
      nxbList: [],
      message: "",
    };
  },
  async created() {
    try {
      this.nxbList = await NhaXuatBanService.getDropdown();
    } catch (error) {
      console.error("Lỗi load danh sách NXB", error);
    }
  },
  methods: {
    async addSach(data) {
      try {
        await SachService.create(data);
        alert("Thêm sách thành công!");
        this.$router.push({ name: "sach.list" });
      } catch (error) {
        alert("Có lỗi xảy ra khi thêm sách.");
        console.error(error);
      }
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
