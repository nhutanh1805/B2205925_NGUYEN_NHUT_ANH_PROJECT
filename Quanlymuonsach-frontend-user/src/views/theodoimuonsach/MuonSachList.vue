<template>
  <div class="container py-4">
    <div class="text-center mb-4">
      <h3 class="fw-bold text-success">
        <i class="fas fa-book-reader me-2"></i> Danh sách phiếu mượn sách
      </h3>
      <p class="text-muted">Quản lý toàn bộ phiếu mượn của độc giả</p>
    </div>

    <div class="card shadow-lg border-0 rounded-4">
      <div class="card-body p-0">

        <table class="table table-hover align-middle mb-0">
          <thead class="bg-light">
            <tr>
              <th class="text-center">Mã Phiếu</th>
              <th class="text-center">Mã Sách</th>
              <th class="text-center">Ngày Mượn</th>
              <th class="text-center">Hạn Trả</th>
              <th class="text-center">Trạng Thái</th>
              <th class="text-center">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="p in phieuMuon" :key="p._id" class="table-row">
              <td class="text-center fw-semibold">{{ p.MaPhieuMuon }}</td>
              <td class="text-center">{{ p.MaSach }}</td>
              <td class="text-center">{{ p.NgayMuon }}</td>
              <td class="text-center">{{ p.HanTra }}</td>

              <td class="text-center">
                <span
                  class="badge px-3 py-2 rounded-pill"
                  :class="p.TrangThai ? 'bg-success' : 'bg-warning text-dark'"
                >
                  <i 
                    :class="p.TrangThai ? 'fas fa-check-circle me-1' : 'fas fa-clock me-1'"
                  ></i>
                  {{ p.TrangThai ? "Đã trả" : "Chưa trả" }}
                </span>
              </td>

              <td class="text-center">
                <router-link
                  :to="{ name: 'muonsach.detail', params: { id: p._id } }"
                  class="btn btn-primary btn-sm px-3 rounded-pill"
                >
                  <i class="fas fa-eye me-1"></i> Xem
                </router-link>
              </td>
            </tr>
          </tbody>

          <tfoot>
            <tr class="bg-light">
              <th colspan="6" class="text-center py-3">
                
                <div class="d-flex justify-content-center gap-4">

                  <span class="fw-bold text-primary">
                    <i class="fas fa-list me-1"></i>
                    Tổng số phiếu: {{ phieuMuon.length }}
                  </span>

                  <span class="fw-bold text-success">
                    <i class="fas fa-check-circle me-1"></i>
                    Đã trả: {{ daTra }}
                  </span>

                  <span class="fw-bold text-warning">
                    <i class="fas fa-clock me-1"></i>
                    Chưa trả: {{ chuaTra }}
                  </span>

                </div>

              </th>
            </tr>
          </tfoot>

        </table>
      </div>
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

  computed: {
    daTra() {
      return this.phieuMuon.filter(p => p.TrangThai === true).length;
    },
    chuaTra() {
      return this.phieuMuon.filter(p => p.TrangThai === false).length;
    },
  },

  async mounted() {
    this.phieuMuon = await TheoDoiMuonSachService.getAll();
  },
};
</script>

<style scoped>
.table-row:hover {
  background-color: #f8f9fa;
  cursor: pointer;
  transition: 0.2s;
}

.card {
  border-radius: 18px !important;
}

table thead tr th {
  font-weight: 600;
  padding: 14px 0;
}

td {
  padding: 14px 0 !important;
}

tfoot span {
  font-size: 15px;
}
</style>
