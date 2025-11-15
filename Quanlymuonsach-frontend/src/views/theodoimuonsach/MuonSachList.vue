<template>
  <div class="container py-4">
    <h3 class="text-center fw-bold mb-4 text-success">
      Danh sách phiếu mượn sách
    </h3>

    <div class="card shadow p-3">
      <table class="table table-bordered">
        <thead class="table-light">
          <tr>
            <th>Mã Phiếu</th>
            <th>Mã Sách</th>
            <th>Ngày Mượn</th>
            <th>Hạn Trả</th>
            <th>Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="p in phieuMuon" :key="p._id">
            <td>{{ p.MaPhieuMuon }}</td>
            <td>{{ p.MaSach }}</td>
            <td>{{ p.NgayMuon }}</td>
            <td>{{ p.HanTra }}</td>
            <td>
              <span class="badge bg-warning" v-if="!p.TrangThai">Chưa trả</span>
              <span class="badge bg-success" v-else>Đã trả</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";

export default {
  data() {
    return {
      phieuMuon: [],
    };
  },

  async mounted() {
    this.phieuMuon = await TheoDoiMuonSachService.getAll();
  },
};
</script>
