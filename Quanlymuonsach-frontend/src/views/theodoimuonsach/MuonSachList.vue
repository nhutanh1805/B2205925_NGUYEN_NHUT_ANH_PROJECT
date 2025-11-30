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
                    :class="p.TrangThai ? 'bg-success' : 'bg-warning text-dark'"
                  >
                    <i 
                      :class="p.TrangThai ? 'fas fa-check-circle me-1' : 'fas fa-clock me-1'"
                    ></i>
                    {{ p.TrangThai ? "Đã trả" : "Chưa trả" }}
                  </span>
                </td>
              </tr>
            </tbody>

            <tfoot class="bg-light">
              <tr>
                <th colspan="8" class="text-center py-4">
                  <div class="row g-4">
                    <div class="col-md-4">
                      <div class="card bg-primary text-white">
                        <div class="card-body text-center">
                          <i class="fas fa-list fs-1 opacity-75"></i>
                          <h4 class="fw-bold">{{ phieuMuon.length }}</h4>
                          <small>Tổng phiếu mượn</small>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card bg-success text-white">
                        <div class="card-body text-center">
                          <i class="fas fa-check-circle fs-1 opacity-75"></i>
                          <h4 class="fw-bold">{{ daTra }}</h4>
                          <small>Đã trả</small>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-4">
                      <div class="card bg-warning text-dark">
                        <div class="card-body text-center">
                          <i class="fas fa-clock fs-1 opacity-75"></i>
                          <h4 class="fw-bold">{{ chuaTra }}</h4>
                          <small>Chưa trả</small>
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
      return this.phieuMuon.filter(p => p.TrangThai === true).length;
    },
    chuaTra() {
      return this.phieuMuon.filter(p => p.TrangThai === false).length;
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

    async exportToPDF(event) {
      if (this.phieuMuon.length === 0) {
        alert('Không có phiếu mượn để xuất!')
        return
      }

      const btn = event.target
      const originalText = btn.innerHTML
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Đang xuất...'
      btn.disabled = true

      try {
        const { jsPDF } = await import('jspdf')
        const jsPDFAutoTable = await import('jspdf-autotable')
        const { default: autoTable } = jsPDFAutoTable

        const doc = new jsPDF('l', 'mm', 'a4')

        doc.setFontSize(22)
        doc.setFont("times", "bold")
        doc.text('📋 DANH SÁCH PHIẾU MƯỢN SÁCH', 105, 25, { align: 'center' })
        
        doc.setFontSize(12)
        doc.setFont("times", "normal")
        doc.text(`Ngày xuất: ${new Date().toLocaleDateString('vi-VN')}`, 105, 35, { align: 'center' })
        doc.text(`Tổng: ${this.phieuMuon.length} phiếu | Đã trả: ${this.daTra} | Chưa trả: ${this.chuaTra}`, 105, 45, { align: 'center' })

        const cols = ['STT', 'Mã Phiếu', 'Độc giả', 'Mã Sách', 'Tên sách', 'Ngày mượn', 'Hạn trả', 'Trạng thái']
        const rows = this.phieuMuon.map((p, i) => [
          i + 1,
          p.MaPhieuMuon || '',
          p.TenDocGia || '',
          p.MaSach || '',
          p.TenSach || '',
          this.formatDate(p.NgayMuon),
          this.formatDate(p.HanTra),
          p.TrangThai ? 'Đã trả' : 'Chưa trả'
        ])

        autoTable(doc, {
          head: [cols],
          body: rows,
          startY: 55,
          styles: { 
            font: 'times',
            fontSize: 8, 
            cellPadding: 4,
            halign: 'center',
            valign: 'middle'
          },
          headStyles: { 
            font: 'times',
            fillColor: [46, 204, 113], 
            textColor: 255, 
            fontStyle: 'bold',
            fontSize: 9
          },
          alternateRowStyles: { fillColor: [248, 250, 252] },
          columnStyles: {
            0: { cellWidth: 12 },
            1: { cellWidth: 20 },
            2: { cellWidth: 30 },
            3: { cellWidth: 18 },
            4: { cellWidth: 40 },
            5: { cellWidth: 20 },
            6: { cellWidth: 20 },
            7: { cellWidth: 18 }
          },
          margin: { left: 15, right: 15 }
        })

        const filename = `phieu-muon-${new Date().toISOString().split('T')[0]}.pdf`
        doc.save(filename)
        
        btn.innerHTML = '<i class="fas fa-check me-1"></i>Xuất thành công!'
        setTimeout(() => {
          btn.innerHTML = originalText
          btn.disabled = false
        }, 2000)
        
      } catch (error) {
        console.error('PDF ERROR:', error)
        alert('Lỗi xuất PDF: ' + error.message)
        btn.innerHTML = originalText
        btn.disabled = false
      }
    },

    async exportToExcel(event) {
      if (this.phieuMuon.length === 0) {
        alert('Không có phiếu mượn để xuất!')
        return
      }

      const btn = event.target
      const originalText = btn.innerHTML
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Đang xuất...'
      btn.disabled = true

      try {
        const excelData = this.phieuMuon.map((p, index) => ({
          'STT': index + 1,
          'Mã Phiếu': p.MaPhieuMuon || '',
          'Độc giả': p.TenDocGia || '',
          'Mã Sách': p.MaSach || '',
          'Tên sách': p.TenSach || '',
          'Ngày mượn': this.formatDate(p.NgayMuon),
          'Hạn trả': this.formatDate(p.HanTra),
          'Trạng thái': p.TrangThai ? 'Đã trả' : 'Chưa trả'
        }))

        const worksheet = XLSX.utils.json_to_sheet(excelData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Phiếu mượn sách")

        worksheet['!cols'] = [
          { wch: 6 }, { wch: 15 }, { wch: 25 }, { wch: 12 }, { wch: 40 },
          { wch: 12 }, { wch: 12 }, { wch: 12 }
        ]

        XLSX.writeFile(workbook, `phieu-muon-${new Date().toISOString().split('T')[0]}.xlsx`)
        
        btn.innerHTML = '<i class="fas fa-check me-1"></i>Xuất thành công!'
        setTimeout(() => {
          btn.innerHTML = originalText
          btn.disabled = false
        }, 2000)
        
      } catch (error) {
        console.error('EXCEL ERROR:', error)
        alert('Lỗi xuất Excel: ' + error.message)
        btn.innerHTML = originalText
        btn.disabled = false
      }
    },

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