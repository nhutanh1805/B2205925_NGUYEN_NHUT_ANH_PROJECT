<template>
  <div class="page d-flex justify-content-center" v-if="sach">
    <div class="card shadow edit-card p-4">
      <h4 class="title mb-3 text-center">
        Chỉnh sửa sách
      </h4>

      <SachForm
        :sach="sach"
        :nxbList="nxbList"
        @submit:sach="updateSach"
      />

      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-secondary btn-sm" @click="goBack">
          Thoát
        </button>
        <button class="btn btn-danger btn-sm" @click="deleteSach">
          Xóa
        </button>
      </div>

      <p class="text-success text-center mt-3 fw-bold">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import SachForm from "@/components/SachForm.vue";
import SachService from "@/services/sach.service";
import NhaXuatBanService from "@/services/nhaxuatban.service";

export default {
  components: { SachForm },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      sach: null,
      nxbList: [],
      message: "",
    };
  },
  methods: {
    async loadData() {
      try {
        this.nxbList = await NhaXuatBanService.getDropdown();
        this.sach = await SachService.get(this.id);

        this.sach.DonGia = Number(this.sach.DonGia) || 0;
        this.sach.SoQuyen = Number(this.sach.SoQuyen) || 0;
        this.sach.NamXuatBan = Number(this.sach.NamXuatBan) || null;
        this.sach.MaNXB = this.sach.MaNXB ? String(this.sach.MaNXB) : "";
      } catch (error) {
        console.error(error);
        alert("Không tải được dữ liệu sách hoặc NXB");
        this.goBack();
      }
    },

    async updateSach(data) {
      try {
        const payload = {
          ...data,
          DonGia: Number(data.DonGia),
          SoQuyen: Number(data.SoQuyen),
          NamXuatBan: data.NamXuatBan ? Number(data.NamXuatBan) : null,
          MaNXB: String(data.MaNXB),
        };

        await SachService.update(this.sach._id, payload);
        this.message = "Cập nhật sách thành công!";
        await this.loadData();
      } catch (error) {
        console.error(error);
        alert("Cập nhật sách thành công!");
      }
    },

    async deleteSach() {
      if (confirm("Bạn chắc chắn muốn xóa sách này?")) {
        try {
          await SachService.delete(this.sach._id);
          alert("Xóa thành công!");
          this.goBack();
        } catch {
          alert("Xóa thất bại!");
        }
      }
    },

    goBack() {
      this.$router.push({ name: "sach.list" });
    },
  },

  mounted() {
    this.loadData();
  },
};
</script>

<style scoped>
.page {
  width: 100%;
  margin-top: 20px;
}
.edit-card {
  width: 500px;
  border-radius: 14px;
  background: #ffffff;
}
.title {
  font-weight: 600;
  color: #ffc107;
}
</style>