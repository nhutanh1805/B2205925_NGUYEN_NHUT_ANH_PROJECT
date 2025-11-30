<template>
  <div class="books-page py-5">
    <div class="container">
      <div class="hero-box text-center text-white py-4 mb-5 rounded-4 shadow">
        <h2 class="fw-bold mb-2"><i class="fas fa-book-reader"></i> Quản lý thư viện thông minh</h2>
        <p class="lead mb-0">Khám phá, quản lý và yêu lại những cuốn sách cũ – theo cách hiện đại nhất 📚</p>
      </div>

      <div class="row g-4">
        <div class="col-lg-5">
          <div class="p-4 bg-white rounded-4 shadow-sm">
            <InputSearch v-model="searchText" @submit="refreshList" />
            <h4 class="section-title text-success mt-4">
              <i class="fas fa-layer-group me-2"></i> Danh sách Sách ({{ filteredBooksCount }})
            </h4>

            <ListView
              v-if="filteredBooksCount > 0"
              :items="filteredBooks"
              v-model:activeIndex="activeIndex"
            />

            <p v-else class="text-muted mt-3 text-center fst-italic">
              <i class="fas fa-inbox me-1"></i> Không có sách nào.
            </p>

            <div class="d-flex flex-wrap gap-2 mt-4 justify-content-center">
              <button class="btn btn-success btn-sm" @click="exportToPDF($event)" :disabled="filteredBooksCount === 0">
                <i class="fas fa-file-pdf me-1"></i>Xuất PDF
              </button>
              <button class="btn btn-primary btn-sm" @click="exportToExcel($event)" :disabled="filteredBooksCount === 0">
                <i class="fas fa-file-excel me-1"></i>Xuất Excel
              </button>
              <button class="btn btn-success btn-sm" @click="refreshList">
                <i class="fas fa-sync-alt"></i> Làm mới
              </button>
              <button class="btn btn-primary btn-sm" @click="goToAddBook">
                <i class="fas fa-plus-circle"></i> Thêm mới
              </button>
              <button class="btn btn-danger btn-sm" @click="removeAllBooks">
                <i class="fas fa-trash-alt"></i> Xóa tất cả
              </button>
            </div>
          </div>
        </div>

        <div class="col-lg-7" v-if="activeBook">
          <div class="p-4 bg-white rounded-4 shadow-sm">
            <h4 class="section-title text-success">
              <i class="fas fa-book-open me-2"></i> Chi tiết Sách
            </h4>

            <div class="book-card p-3 border rounded-4 bg-light shadow-sm mb-3">
              <DetailCard :item="activeBook" />
              <div class="mt-3">
                <span class="badge bg-success me-2">
                  <i class="fas fa-tag"></i> {{ activeBook.TheLoai }}
                </span>
                <span class="badge bg-secondary">
                  <i class="fas fa-user-pen"></i> {{ activeBook.TacGia }}
                </span>
              </div>
            </div>

            <div class="d-flex gap-2 mt-3 justify-content-center">
              <router-link
                class="btn btn-warning btn-sm"
                :to="{ name: 'sach.edit', params: { id: activeBook._id }}"
              >
                <i class="fas fa-edit"></i> Chỉnh sửa
              </router-link>

              <button class="btn btn-primary btn-sm" @click="muonSach(activeBook)">
                <i class="fas fa-book-reader"></i> Mượn sách
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="text-center mt-5">
        <router-link to="/" class="btn btn-outline-success px-4 py-2 shadow-sm">
          <i class="fas fa-home me-2"></i> Quay về Trang chủ
        </router-link>
        <p class="text-muted mt-3 fst-italic">“Một cuốn sách hay có thể thay đổi cả một tâm hồn.” ✨</p>
      </div>
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import ListView from "@/components/ListView.vue";
import DetailCard from "@/components/DetailCard.vue";
import SachService from "@/services/sach.service";
import * as XLSX from 'xlsx';

export default {
  components: { InputSearch, ListView, DetailCard },
  data() {
    return {
      books: [],
      searchText: "",
      activeIndex: -1,
    };
  },

  watch: {
    searchText() {
      this.activeIndex = -1;
    },
  },

  computed: {
    bookStrings() {
      return this.books.map((b) => {
        const { MaSach, TenSach, TacGia, TheLoai } = b;
        return `${MaSach}${TenSach}${TacGia}${TheLoai}`.toLowerCase();
      });
    },
    filteredBooks() {
      if (!this.searchText) return this.books;
      return this.books.filter((_b, index) =>
        this.bookStrings[index].includes(this.searchText.toLowerCase())
      );
    },
    filteredBooksCount() {
      return this.filteredBooks.length;
    },
    activeBook() {
      return this.activeIndex < 0 ? null : this.filteredBooks[this.activeIndex];
    },
  },

  methods: {
    async exportToPDF(event) {
      if (this.filteredBooksCount === 0) {
        alert('Không có sách để xuất!')
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

        doc.setFontSize(20)
        doc.text('📚 DANH SÁCH SÁCH THƯ VIỆN', 14, 20)
        doc.setFontSize(10)
        doc.text(`Ngày: ${new Date().toLocaleDateString('vi-VN')}`, 14, 30)
        doc.text(`Tổng: ${this.filteredBooksCount} sách`, 14, 38)

        const cols = ['STT', 'Mã', 'Tên sách', 'Tác giả', 'Thể loại', 'NXB', 'Năm', 'Số quyển', 'Giá']
        const rows = this.filteredBooks.map((sach, i) => [
          i + 1,
          sach.MaSach || '',
          sach.TenSach || '',
          sach.TacGia || '',
          sach.TheLoai || '',
          sach.MaNXB || '',
          sach.NamXuatBan || '',
          sach.SoQuyen || 0,
          (sach.DonGia || 0).toLocaleString('vi-VN')
        ])

        autoTable(doc, {
          head: [cols],
          body: rows,
          startY: 45,
          styles: { fontSize: 7, cellPadding: 2 },
          headStyles: { 
            fillColor: [52, 152, 219], 
            textColor: 255, 
            fontStyle: 'bold' 
          },
          alternateRowStyles: { fillColor: [236, 245, 253] },
          margin: { left: 14, right: 14 }
        })

        const filename = `sach-${Date.now()}.pdf`
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
      if (this.filteredBooksCount === 0) {
        alert('Không có sách để xuất!')
        return
      }

      const btn = event.target
      const originalText = btn.innerHTML
      btn.innerHTML = '<i class="fas fa-spinner fa-spin me-1"></i>Đang xuất...'
      btn.disabled = true

      try {
        const excelData = this.filteredBooks.map((sach, index) => ({
          'STT': index + 1,
          'Mã sách': sach.MaSach || '',
          'Tên sách': sach.TenSach || '',
          'Tác giả': sach.TacGia || '',
          'Thể loại': sach.TheLoai || '',
          'Nhà XB': sach.MaNXB || '',
          'Năm XB': sach.NamXuatBan || '',
          'Số quyển': sach.SoQuyen || 0,
          'Đơn giá': sach.DonGia ? new Intl.NumberFormat('vi-VN').format(sach.DonGia) + ' VNĐ' : ''
        }))

        const worksheet = XLSX.utils.json_to_sheet(excelData)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, "Danh sách sách")

        worksheet['!cols'] = [
          { wch: 6 }, { wch: 12 }, { wch: 40 }, { wch: 20 }, { wch: 15 },
          { wch: 12 }, { wch: 10 }, { wch: 12 }, { wch: 15 }
        ]

        XLSX.writeFile(workbook, `danh-sach-sach-${new Date().toISOString().split('T')[0]}.xlsx`)
        
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

    async retrieveBooks() {
      this.books = await SachService.getAll();
    },

    refreshList() {
      this.retrieveBooks();
      this.activeIndex = -1;
    },

    goToAddBook() {
      this.$router.push({ name: "sach.add" });
    },

    async removeAllBooks() {
      if (confirm("Bạn có chắc muốn xóa tất cả sách không?")) {
        await SachService.deleteAll?.();
        this.refreshList();
      }
    },

    async muonSach(sach) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Bạn cần đăng nhập trước!");
        this.$router.push("/login");
        return;
      }

      const soLuongMuon = Number(prompt("Bạn muốn mượn bao nhiêu quyển?"));

      if (!soLuongMuon || soLuongMuon <= 0) {
        return alert("Số lượng không hợp lệ!");
      }

      if (soLuongMuon > sach.SoQuyen) {
        return alert("Số lượng vượt quá số quyển đang còn!");
      }

      const MaPhieuMuon = "PM" + Math.floor(1000 + Math.random() * 9000);
      const today = new Date();
      const hanTra = new Date();
      hanTra.setDate(today.getDate() + 14);

      const data = {
        MaPhieuMuon,
        MaDocGia: user.MaDocGia,
        TenDocGia: `${user.HoLot} ${user.Ten}`,
        MaSach: sach.MaSach,
        TenSach: sach.TenSach,
        SoLuong: soLuongMuon,
        NgayMuon: today.toISOString().split("T")[0],
        HanTra: hanTra.toISOString().split("T")[0],
        TrangThai: false,
        GhiChu: "Chưa trả",
      };

      await fetch("http://localhost:4000/api/theodoimuonsach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const newSoQuyen = sach.SoQuyen - soLuongMuon;

      await fetch(`http://localhost:4000/api/sach/${sach._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...sach, SoQuyen: newSoQuyen }),
      });

      alert("Mượn sách thành công!");
      this.refreshList();
    },
  },

  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.books-page {
  font-family: "Poppins", sans-serif;
  min-height: 100vh;
  background: linear-gradient(180deg, #e6f9ec, #ffffff);
}
.hero-box {
  background: linear-gradient(135deg, #22c55e, #15803d);
}
.section-title {
  font-weight: 700;
  font-size: 20px;
  border-left: 4px solid #16a34a;
  padding-left: 10px;
  margin-bottom: 16px;
}
.btn {
  border-radius: 10px;
  transition: all 0.25s ease;
}
.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.book-card:hover {
  transform: scale(1.02);
  transition: all 0.3s ease;
  background: #f8fff9;
}
.container {
  max-width: 1150px;
}
</style>