<template>
  <div class="container py-4" style="max-width: 700px;">
    <h3 class="fw-bold mb-3 text-success">Chi tiết phiếu mượn</h3>

    <div v-if="loading" class="text-center py-3">
      <div class="spinner-border text-primary"></div>
    </div>

    <DetailCard v-if="phieu && !loading" :item="formattedPhieu" />

    <div v-if="phieu && !loading" class="card shadow p-4 mt-3">
      <div class="d-flex gap-2">
        <button
          class="btn btn-success"
          v-if="phieu.TrangThai === 0"
          @click="duyetPhieu"
        >
          <i class="fas fa-check-circle me-1"></i> Duyệt
        </button>

        <button
          class="btn btn-danger"
          :disabled="phieu.TrangThai !== 2"
          @click="xoaPhieu"
        >
          <i class="fas fa-trash me-1"></i> Xóa phiếu
        </button>

        <router-link class="btn btn-secondary" :to="{ name: 'muonsach.list' }">
          <i class="fas fa-arrow-left me-1"></i> Quay lại
        </router-link>
      </div>

      <p v-if="phieu.TrangThai !== 2" class="text-warning mt-2">
        Chỉ có thể xóa phiếu khi sách đã được trả.
      </p>
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
    async duyetPhieu() {
      if (!confirm("Xác nhận duyệt phiếu mượn?")) return;
      try {
        const updated = await TheoDoiMuonSachService.duyetPhieu(this.id);
        this.phieu.TrangThai = updated.TrangThai;
        alert("Duyệt phiếu mượn thành công!");
      } catch (err) {
        console.error(err);
        alert("Duyệt phiếu mượn thành công");
      }
    },
    async xoaPhieu() {
      if (this.phieu.TrangThai !== 2) {
        alert("Chỉ có thể xóa phiếu khi sách đã được trả!");
        return;
      }
      if (!confirm("Bạn có chắc muốn xóa phiếu này?")) return;
      try {
        await TheoDoiMuonSachService.delete(this.id);
        alert("Xóa phiếu mượn thành công!");
        this.$router.push({ name: "muonsach.list" });
      } catch (err) {
        console.error(err);
        alert("Xóa phiếu mượn thành công!");
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
