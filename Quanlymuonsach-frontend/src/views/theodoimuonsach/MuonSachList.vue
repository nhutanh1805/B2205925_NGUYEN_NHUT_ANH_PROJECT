<template>
  <div class="container py-4">
    <div class="text-center mb-4">
      <h3 class="fw-bold text-success">
        <i class="fas fa-book-reader me-2"></i> Danh sách phiếu mượn sách
      </h3>
      <p class="text-muted">Quản lý toàn bộ phiếu mượn của độc giả</p>
    </div>

    <div class="card shadow-lg border-0 rounded-4">
      <div class="card-body p-4">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <div>
            <InputSearch v-model="searchText" @submit="refreshList" />
          </div>
          <div class="d-flex gap-2">
            <button class="btn btn-success btn-sm" @click="exportToPDF($event)" :disabled="phieuMuon.length === 0">
              <i class="fas fa-file-pdf me-1"></i>Xuất PDF
            </button>
            <button class="btn btn-primary btn-sm" @click="exportToExcel($event)" :disabled="phieuMuon.length === 0">
              <i class="fas fa-file-excel me-1"></i>Xuất Excel
            </button>
            <button class="btn btn-success btn-sm" @click="refreshList">
              <i class="fas fa-sync-alt"></i> Làm mới
            </button>
          </div>
        </div>

        <div class="table-responsive">
          <table class="table table-hover align-middle mb-0">
            <thead class="table-dark">
              <tr>
                <th class="text-center">STT</th>
                <th class="text-center">Mã Phiếu</th>
                <th class="text-center">Độc giả</th>
                <th class="text-center">Mã Sách</th>
                <th class="text-center">Tên sách</th>
                <th class="text-center">Ngày Mượn</th>
                <th class="text-center">Hạn Trả</th>
                <th class="text-center">Trạng Thái</th>
                <th class="text-center">Thao tác</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="(p, index) in filteredPhieuMuon" :key="p._id" class="table-row">
                <td class="text-center fw-semibold">{{ index + 1 }}</td>
                <td class="text-center fw-semibold">{{ p.MaPhieuMuon }}</td>
                <td class="text-center">{{ p.TenDocGia }}</td>
                <td class="text-center">{{ p.MaSach }}</td>
                <td class="text-center">{{ p.TenSach }}</td>
                <td class="text-center">{{ formatDate(p.NgayMuon) }}</td>
                <td class="text-center">{{ formatDate(p.HanTra) }}</td>

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
                      v-if="p.TrangThai === 0"
                      @click="duyetPhieu(p._id)"
                      class="btn btn-success btn-sm px-3 rounded-pill"
                    >
                      <i class="fas fa-check-circle me-1"></i> Duyệt
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>

            <tfoot class="bg-light">
              <tr>
                <th colspan="9" class="text-center py-4">
                  <div class="row g-4">
                    <div class="col-md-3">
                      <div class="card bg-primary text-white">
                        <div class="card-body text-center">
                          <i class="fas fa-list fs-1 opacity-75"></i>
                          <h4 class="fw-bold">{{ phieuMuon.length }}</h4>
                          <small>Tổng phiếu mượn</small>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="card bg-success text-white">
                        <div class="card-body text-center">
                          <i class="fas fa-check-circle fs-1 opacity-75"></i>
                          <h4 class="fw-bold">{{ daTra }}</h4>
                          <small>Đã trả</small>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="card bg-warning text-dark">
                        <div class="card-body text-center">
                          <i class="fas fa-book-reader fs-1 opacity-75"></i>
                          <h4 class="fw-bold">{{ dangMuon }}</h4>
                          <small>Đang mượn</small>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-3">
                      <div class="card bg-secondary text-white">
                        <div class="card-body text-center">
                          <i class="fas fa-hourglass-half fs-1 opacity-75"></i>
                          <h4 class="fw-bold">{{ choDuyet }}</h4>
                          <small>Chờ duyệt</small>
                        </div>
                      </div>
                    </div>
                  </div>
                </th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import TheoDoiMuonSachService from "@/services/theodoimuonsach.service";
import * as XLSX from 'xlsx';

export default {
  components: { InputSearch },
  data() {
    return {
      phieuMuon: [],
      searchText: "",
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
    filteredPhieuMuon() {
      if (!this.searchText) return this.phieuMuon;
      const query = this.searchText.toLowerCase();
      return this.phieuMuon.filter(p =>
        p.MaPhieuMuon.toLowerCase().includes(query) ||
        p.TenDocGia.toLowerCase().includes(query) ||
        p.MaSach.toLowerCase().includes(query) ||
        p.TenSach.toLowerCase().includes(query)
      );
    },
  },

  methods: {
    formatDate(dateString) {
      return dateString ? new Date(dateString).toLocaleDateString('vi-VN') : '';
    },

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

    async duyetPhieu(id) {
      try {
        const updated = await TheoDoiMuonSachService.duyetPhieu(id);
        const index = this.phieuMuon.findIndex(p => p._id === id);
        if (index !== -1) this.phieuMuon[index] = updated;
        this.$toast?.success("Duyệt phiếu mượn thành công!");
      } catch (error) {
        console.error(error);
        this.$toast?.error(error.message || "Duyệt phiếu thất bại");
      }
    },

    async exportToPDF(event) { },
    async exportToExcel(event) { },
    async refreshList() {
      this.phieuMuon = await TheoDoiMuonSachService.getAll();
    },
  },

  async mounted() {
    await this.refreshList();
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

tfoot .card {
  border-radius: 12px;
  transition: transform 0.2s ease;
}

tfoot .card:hover {
  transform: translateY(-2px);
}

.btn {
  border-radius: 25px;
}
</style>
