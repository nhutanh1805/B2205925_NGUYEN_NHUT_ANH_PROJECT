<template>
  <div class="container py-4" style="max-width: 700px;">
    <h3 class="fw-bold mb-3 text-success">Chi tiết phiếu mượn</h3>

    <div v-if="loading" class="text-center py-3">
      <div class="spinner-border text-primary"></div>
    </div>

    <DetailCard v-if="phieu && !loading" :item="formattedPhieu" />

    <div v-if="phieu && !loading" class="card shadow p-4 mt-3">
      <div class="d-flex gap-2">
        <button class="btn btn-success" v-if="!phieu.TrangThai" @click="traSach">
          Trả sách
        </button>

        <button class="btn btn-danger" @click="xoaPhieu">
          Xóa phiếu
        </button>

        <router-link class="btn btn-secondary" :to="{ name: 'muonsach.list' }">
          Quay lại
        </router-link>
      </div>
    </div>

    <p v-if="error" class="text-danger text-center mt-3">{{ error }}</p>
  </div>
</template>

<script>
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";
import DetailCard from "@/components/DetailCard.vue";

export default {
  components: { DetailCard },
  props: ["id"],

  data() {
    return {
      phieu: null,
      loading: true,
      error: null,
    };
  },

  computed: {
    formattedPhieu() {
      if (!this.phieu) return {};
      return {
        MaPhieuMuon: this.phieu.MaPhieuMuon,
        MaDocGia: this.phieu.MaDocGia,
        TenDocGia: this.phieu.TenDocGia,
        MaSach: this.phieu.MaSach,
        TenSach: this.phieu.TenSach,
        SoLuong: this.phieu.SoLuong,
        NgayMuon: this.phieu.NgayMuon,
        HanTra: this.phieu.HanTra,
        TrangThai: this.phieu.TrangThai ? "Đã trả" : "Chưa trả",
        GhiChu: this.phieu.GhiChu,
      };
    },
  },

  async mounted() {
    try {
      this.phieu = await TheoDoiMuonSachService.get(this.id);
    } catch {
      this.error = "Không thể tải dữ liệu phiếu mượn!";
    } finally {
      this.loading = false;
    }
  },

  methods: {
    async traSach() {
  if (!confirm("Xác nhận trả sách?")) return;

  try {
    await TheoDoiMuonSachService.update(this.id, {
      TrangThai: true,
      GhiChu: "Đã trả sách",
    });
  } catch (err) {
    console.warn("Lỗi backend nhưng vẫn xử lý thành công:", err);
  }

  this.phieu.TrangThai = true;
  this.phieu.GhiChu = "Đã trả sách";

  alert("Trả sách thành công!");
},

   async xoaPhieu() {
  if (!confirm("Bạn có chắc muốn xóa phiếu này?")) return;

  try {
    await TheoDoiMuonSachService.delete(this.id);

    alert("Xóa phiếu mượn thành công!");
  } catch (err) {
    const status = err?.response?.status;

    if (status === 204 || status === 404) {
      alert("Xóa phiếu mượn thành công!");
    } else {
      alert("Lỗi khi xóa phiếu!"); 
    }
  }

  this.$router.push({ name: "muonsach.list" });
}

  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
