<template>
  <div class="container py-4">
    <div class="text-center mb-4">
      <h3 class="fw-bold text-success">
        <i class="fas fa-book-reader me-2"></i> Phiếu mượn của bạn
      </h3>
      <p class="text-muted">Xem và quản lý phiếu mượn của bạn</p>
    </div>

    <div v-if="!user" class="alert alert-warning text-center">
      Vui lòng <router-link to="/login">đăng nhập</router-link> để xem phiếu mượn.
    </div>

    <div v-else class="card shadow-lg border-0 rounded-4">
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
              <td class="text-center">{{ p.NgayMuon || "-" }}</td>
              <td class="text-center">{{ p.HanTra || "-" }}</td>

              <td class="text-center">
                <span
                  class="badge px-3 py-2 rounded-pill"
                  :class="statusClass(p.TrangThai)"
                >
                  <i :class="statusIcon(p.TrangThai)"></i>
                  {{ statusText(p.TrangThai) }}
                </span>
              </td>

              <td class="text-center">
                <div class="d-flex justify-content-center gap-2">
                  <router-link
                    :to="{ name: 'muonsach.detail', params: { id: p._id } }"
                    class="btn btn-primary btn-sm px-3 rounded-pill"
                  >
                    <i class="fas fa-eye me-1"></i> Xem
                  </router-link>

                  <button
                    v-if="p.TrangThai === 1"
                    @click="traSach(p._id)"
                    class="btn btn-warning btn-sm px-3 rounded-pill"
                  >
                    <i class="fas fa-book-reader me-1"></i> Trả
                  </button>
                </div>
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
                    <i class="fas fa-book-reader me-1"></i>
                    Đang mượn: {{ dangMuon }}
                  </span>
                  <span class="fw-bold text-secondary">
                    <i class="fas fa-hourglass-half me-1"></i>
                    Chờ duyệt: {{ choDuyet }}
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
      user: null,
      phieuMuon: [],
    };
  },

  computed: {
    daTra() {
      return this.phieuMuon.filter(p => p.TrangThai === 2).length;
    },
    dangMuon() {
      return this.phieuMuon.filter(p => p.TrangThai === 1).length;
    },
    choDuyet() {
      return this.phieuMuon.filter(p => p.TrangThai === 0).length;
    },
  },

  methods: {
    statusText(trangThai) {
      switch(trangThai) {
        case 0: return "Chờ duyệt";
        case 1: return "Đang mượn";
        case 2: return "Đã trả";
        default: return "-";
      }
    },
    statusClass(trangThai) {
      switch(trangThai) {
        case 0: return "bg-secondary text-white";
        case 1: return "bg-warning text-dark";
        case 2: return "bg-success";
        default: return "";
      }
    },
    statusIcon(trangThai) {
      switch(trangThai) {
        case 0: return "fas fa-hourglass-half me-1";
        case 1: return "fas fa-book-reader me-1";
        case 2: return "fas fa-check-circle me-1";
        default: return "";
      }
    },

    async traSach(id) {
      try {
        const updated = await TheoDoiMuonSachService.traSach(id);
        const index = this.phieuMuon.findIndex(p => p._id === id);
        if (index !== -1) this.phieuMuon[index] = updated;
        this.$toast?.success("Trả sách thành công!");
      } catch (error) {
        console.error(error);
        this.$toast?.error(error.message || "Trả sách thất bại");
      }
    },
  },

  async mounted() {
    const saved = localStorage.getItem("user");
    if (saved) {
      this.user = JSON.parse(saved);
      this.phieuMuon = await TheoDoiMuonSachService.getByUser(this.user.MaDocGia);
    }
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
