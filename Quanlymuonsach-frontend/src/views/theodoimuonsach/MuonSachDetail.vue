<template>
  <div class="container py-4" style="max-width: 600px;">
    <h3 class="fw-bold mb-3 text-success">Chi tiết phiếu mượn</h3>

    <div class="card shadow p-3" v-if="phieu">
      <p><strong>Mã Phiếu:</strong> {{ phieu.MaPhieuMuon }}</p>
      <p><strong>Mã Sách:</strong> {{ phieu.MaSach }}</p>
      <p><strong>Ngày Mượn:</strong> {{ phieu.NgayMuon }}</p>
      <p><strong>Hạn Trả:</strong> {{ phieu.HanTra }}</p>
      <p>
        <strong>Trạng Thái:</strong>
        <span class="badge bg-warning" v-if="!phieu.TrangThai">Chưa trả</span>
        <span class="badge bg-success" v-else>Đã trả</span>
      </p>
    </div>
  </div>
</template>

<script>
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";

export default {
  props: ["id"],
  data() {
    return {
      phieu: null,
    };
  },

  async mounted() {
    this.phieu = await TheoDoiMuonSachService.get(this.id);
  },
};
</script>
