<template>
  <div class="min-vh-100" style="background: linear-gradient(135deg, #f5f9f6 0%, #e8f5e9 100%)">
    <div class="text-center py-5 px-4">
      <div class="d-inline-block p-4 bg-white rounded-circle shadow-lg mb-4">
        <i class="fas fa-book-open-reader text-success display-1"></i>
      </div>
      <h1 class="display-4 fw-bold text-success mb-2">Thư Viện Thông Minh</h1>
      <p class="lead text-success opacity-80">Chạm vào cuốn sách bạn yêu thích để mượn ngay</p>
    </div>

    <div class="container pb-5">
      <div class="row justify-content-center mb-5">
        <div class="col-lg-8 col-xl-6">
          <div class="position-relative">
            <InputSearch v-model="searchText" @submit="refreshList"
              class="form-control form-control-lg rounded-pill shadow-lg border-0 ps-5 fs-5 bg-white"
              placeholder="Tìm tên sách, tác giả, thể loại, NXB..." />
            <i class="fas fa-search position-absolute top-50 start-0 translate-middle-y ms-4 text-success fs-4"></i>
            <button @click="refreshList" class="btn btn-success rounded-pill position-absolute top-50 end-0 translate-middle-y me-3 shadow-sm">
              Làm mới
            </button>
          </div>
        </div>
      </div>

      <div class="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4">
        <div v-for="(book, index) in filteredBooks" :key="book._id">
          <div class="book-item cursor-pointer" @click="openDetail(book)">
            <div class="real-book-wrapper">
              <div class="real-book" :style="{ '--book-color': bookColors[index % bookColors.length] }">
                <div class="book-spine"></div>
                <div class="book-cover-front">
                  <div class="cover-title">{{ truncate(book.TenSach, 18) }}</div>
                  <div class="cover-author">{{ book.TacGia }}</div>
                  <div class="cover-letter">{{ book.TenSach.charAt(0) }}</div>
                </div>
                <div class="book-page-effect"></div>
              </div>
              <div class="book-shadow"></div>
            </div>

            <div class="text-center mt-3">
              <h6 class="fw-bold text-success">{{ truncate(book.TenSach, 26) }}</h6>
              <small class="text-success opacity-75">{{ book.TacGia }}</small>
              <div class="mt-1">
                <span class="badge bg-opacity-20 text-success px-3 py-1">{{ book.SoQuyen }} quyển</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="filteredBooks.length === 0" class="text-center py-5 my-5">
        <i class="fas fa-book-open display-1 text-success opacity-20 mb-4"></i>
        <h3 class="text-success opacity-50">Không tìm thấy sách nào</h3>
      </div>
    </div>

    <div v-if="selectedBook" class="modal fade show d-block bg-black bg-opacity-60" @click.self="selectedBook = null">
      <div class="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
        <div class="modal-content rounded-4 overflow-hidden shadow-2xl border-0">
          <div class="modal-header border-0 pb-0">
            <button @click="selectedBook = null" class="btn-close position-absolute top-0 end-0 m-4 z-top"></button>
          </div>
          <div class="modal-body p-5">
            <div class="row g-5">
              <div class="col-lg-5 text-center">
                <div class="real-book-big mx-auto mb-4" :style="{ '--book-color': bookColors[selectedIndex % bookColors.length] }">
                  <div class="book-spine-big"></div>
                  <div class="book-cover-front-big">
                    <div class="cover-title-big">{{ selectedBook.TenSach }}</div>
                    <div class="cover-author-big">{{ selectedBook.TacGia }}</div>
                  </div>
                </div>
                <h2 class="fw-bold text-success mt-4">{{ selectedBook.TenSach }}</h2>
                <p class="lead text-success opacity-80">{{ selectedBook.TacGia }}</p>
                <span class="badge bg-success fs-5 px-5 py-3">Còn {{ selectedBook.SoQuyen }} quyển</span>
              </div>

              <div class="col-lg-7">
                <h3 class="fw-bold text-success mb-4">Thông tin chi tiết</h3>
                <div class="card border-0 shadow-sm rounded-4 p-4 bg-white bg-opacity-95">
                  <DetailCard :item="selectedBook" />
                </div>
                <div class="text-center mt-5">
                  <button @click="muonSach(selectedBook)" class="btn btn-success btn-lg rounded-pill px-7 py-4 shadow-lg hover-lift fs-5 fw-bold">
                    Mượn sách ngay
                  </button>
                  <small class="d-block mt-3 text-success opacity-70">Hạn mượn: 14 ngày</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="text-center py-5 mt-5">
      <router-link to="/" class="btn btn-outline-success rounded-pill px-5 py-3 shadow hover-lift">
        Về Trang chủ
      </router-link>
      <p class="text-success mt-4 fst-italic opacity-70">
        "Đọc sách là cách học rẻ nhất trên đời"
      </p>
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import DetailCard from "@/components/DetailCard.vue";
import SachService from "@/services/sach.service";

const bookColors = ['#2e7d32', '#388e3c', '#43a047', '#4caf50', '#66bb6a', '#81c784', '#1b5e20', '#33691e'];

export default {
  components: { InputSearch, DetailCard },
  data() {
    return {
      books: [],
      searchText: "",
      selectedBook: null,
      selectedIndex: 0,
      bookColors
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchText) return this.books;
      const q = this.searchText.toLowerCase();
      return this.books.filter(book =>
        `${book.TenSach} ${book.TacGia} ${book.TheLoai} ${book.MaSach} ${book.TenNXB || ''}`.toLowerCase().includes(q)
      );
    },
  },
  methods: {
    async retrieveBooks() {
      this.books = await SachService.getAll();
    },
    refreshList() {
      this.retrieveBooks();
    },
    openDetail(book) {
      this.selectedIndex = this.filteredBooks.indexOf(book);
      this.selectedBook = book;
    },
    truncate(str, n) {
      return str.length > n ? str.slice(0, n) + "..." : str;
    },
    async muonSach(sach) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Vui lòng đăng nhập để mượn sách!");
        return this.$router.push("/login");
      }
      const sl = Number(prompt(`Còn ${sach.SoQuyen} quyển. Bạn muốn mượn bao nhiêu?`, "1"));
      if (!sl || sl <= 0 || sl > sach.SoQuyen) {
        return alert("Số lượng không hợp lệ!");
      }
      const today = new Date();
      const hanTra = new Date(today);
      hanTra.setDate(today.getDate() + 14);
      const data = {
        MaPhieuMuon: "PM" + Date.now().toString().slice(-6),
        MaDocGia: user.MaDocGia,
        TenDocGia: `${user.HoLot} ${user.Ten}`,
        MaSach: sach.MaSach,
        TenSach: sach.TenSach,
        SoLuong: sl,
        NgayMuon: today.toISOString().split("T")[0],
        HanTra: hanTra.toISOString().split("T")[0],
        TrangThai: false,
        GhiChu: "Chưa trả",
      };
      try {
        await fetch("http://localhost:4000/api/theodoimuonsach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
        await fetch(`http://localhost:4000/api/sach/${sach._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...sach, SoQuyen: sach.SoQuyen - sl })
        });
        alert(`Mượn thành công ${sl} quyển!\nHạn trả: ${hanTra.toLocaleDateString('vi-VN')} (14 ngày)`);
        this.selectedBook = null;
        this.refreshList();
      } catch {
        alert("Có lỗi khi mượn sách!");
      }
    },
  },
  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.book-item {
  transition: all 0.4s ease;
}
.book-item:hover {
  transform: translateY(-16px) scale(1.06);
}

.real-book-wrapper {
  perspective: 1200px;
  padding: 20px 10px 10px;
  position: relative;
}
.real-book {
  width: 160px;
  height: 220px;
  position: relative;
  transform-style: preserve-3_needed;
  transform: rotateX(18deg) rotateY(-14deg);
  transition: transform 0.4s ease;
}
.book-item:hover .real-book {
  transform: rotateX(12deg) rotateY(-10deg) translateY(-8px);
}

.book-spine {
  position: absolute;
  left: 0;
  top: 0;
  width: 36px;
  height: 100%;
  background: linear-gradient(to right, #111, var(--book-color));
  border-radius: 8px 0 0 8px;
  box-shadow: inset -6px 0 10px rgba(0,0,0,0.5);
}

.book-cover-front {
  position: absolute;
  left: 36px;
  top: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, var(--book-color) 0%, #111 100%);
  border-radius: 0 10px 10px 0;
  box-shadow: 10px 10px 25px rgba(0,0,0,0.5);
  padding: 16px 12px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  color: white;
  overflow: hidden;
}

.cover-title {
  font-size: 0.95rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 6px;
  text-shadow: 2px 2px 6px rgba(0,0,0,0.7);
}
.cover-author {
  font-size: 0.75rem;
  opacity: 0.9;
  text-shadow: 1px 1px 4px rgba(0,0,0,0.7);
}
.cover-letter {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 4rem;
  font-weight: 900;
  opacity: 0.2;
}

.book-page-effect {
  position: absolute;
  right: 4px;
  top: 12%;
  width: 14px;
  height: 76%;
  background: linear-gradient(to right, rgba(255,255,255,0.15), rgba(255,255,255,0.4));
  border-radius: 8px;
}

.book-shadow {
  position: absolute;
  bottom: -12px;
  left: 50%; 
  width: 90%;
  height: 24px;
  background: radial-gradient(ellipse, rgba(0,0,0,0.4), transparent);
  transform: translateX(-50%);
  filter: blur(10px);
}

.real-book-big {
  width: 300px;
  height: 420px;
  transform: rotateX(14deg) rotateY(-12deg);
}
.book-spine-big { width: 56px; }
.book-cover-front-big {
  left: 56px;
  border-radius: 0 14px 14px 0;
  padding: 30px 20px;
}
.cover-title-big {
  font-size: 1.8rem;
  font-weight: 900;
  line-height: 1.2;
  margin-bottom: 12px;
}
.cover-author-big {
  font-size: 1.3rem;
  opacity: 0.95;
}

.hover-lift:hover {
  transform: translateY(-8px);
  box-shadow: 0 28px 56px rgba(67,160,71,0.5) !important;
}
.shadow-2xl { box-shadow: 0 40px 80px rgba(0,0,0,0.3) !important; }
.cursor-pointer { cursor: pointer; }
.z-top { z-index: 10; }
.modal.show.d-block { display: block !important; }
</style>