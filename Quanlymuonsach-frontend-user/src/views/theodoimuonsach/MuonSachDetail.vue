<template>
  <div class="container py-4" style="max-width: 700px;">
    <h3 class="fw-bold mb-3 text-success">Chi tiết phiếu mượn</h3>

    <div v-if="loading" class="text-center py-3">
      <div class="spinner-border text-primary"></div>
    </div>

    <DetailCard v-if="phieu && !loading" :item="formattedPhieu" />

    <div v-if="phieu && !loading" class="card shadow p-4 mt-3">
      <div class="d-flex gap-2">
        <button class="btn btn-success" v-if="phieu.TrangThai === 1" @click="traSach">
          <i class="fas fa-book-reader me-1"></i> Trả sách
        </button>

        <router-link class="btn btn-secondary" :to="{ name: 'muonsach.list' }">
          <i class="fas fa-arrow-left me-1"></i> Quay lại
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
        TrangThai: this.phieu.TrangThai === 0 ? "Chờ duyệt" :
                   this.phieu.TrangThai === 1 ? "Đang mượn" :
                   "Đã trả",
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
        await TheoDoiMuonSachService.traSach(this.id);
        this.phieu.TrangThai = 2;
        alert("Trả sách thành công!");
      } catch (err) {
        console.error(err);
        alert("Trả sách thất bại!");
      }
    },
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
}
</style>
