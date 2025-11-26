<template>
  <div class="bg-light min-vh-100 py-5">
    <div class="container">

      <div class="text-center mb-5">
        <div class="p-5 rounded-4 bg-success text-white shadow-lg" style="background: linear-gradient(135deg,#38b000,#1b5e20);">
          <h1 class="fw-bold display-5"><i class="fas fa-book-reader me-2"></i>Thư viện thông minh</h1>
          <p class="lead opacity-75">Khám phá và yêu lại những cuốn sách cũ theo cách hiện đại nhất 📚</p>
        </div>
      </div>

      <div class="row g-4">
        <!-- Sidebar: Danh sách sách -->
        <div class="col-lg-4">
          <div class="card shadow-sm rounded-4 border-0">
            <div class="card-body">

              <InputSearch v-model="searchText" @submit="refreshList" />

              <h5 class="mt-4 fw-bold border-start border-4 border-success ps-3">
                <i class="fas fa-layer-group me-2"></i>Danh sách Sách
              </h5>

              <div class="list-group mt-3">
                <button 
                  v-for="(book, index) in filteredBooks" 
                  :key="book._id"
                  type="button" 
                  class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                  :class="{ active: index === activeIndex }"
                  @click="activeIndex = index"
                >
                  <div>
                    <div class="fw-semibold">{{ book.TenSach }}</div>
                    <small class="text-muted">{{ book.TacGia }} • {{ book.TheLoai }}</small>
                  </div>
                  <span class="badge bg-success rounded-pill">{{ book.SoQuyen }}</span>
                </button>

                <p v-if="filteredBooksCount === 0" class="text-center text-muted mt-3 fst-italic">
                  <i class="fas fa-inbox me-1"></i> Không có sách nào.
                </p>
              </div>

              <div class="d-flex flex-wrap gap-2 justify-content-center mt-4">
                <button class="btn btn-success btn-sm rounded-pill" @click="refreshList">
                  <i class="fas fa-sync-alt me-1"></i> Làm mới
                </button>
                <button class="btn btn-primary btn-sm rounded-pill" @click="goToAddBook">
                  <i class="fas fa-plus-circle me-1"></i> Thêm mới
                </button>
                <button class="btn btn-danger btn-sm rounded-pill" @click="removeAllBooks">
                  <i class="fas fa-trash-alt me-1"></i> Xóa tất cả
                </button>
              </div>

            </div>
          </div>
        </div>

        <div class="col-lg-8" v-if="activeBook">
          <div class="card shadow-sm rounded-4 border-0">
            <div class="card-body">

              <h5 class="fw-bold border-start border-4 border-success ps-3">
                <i class="fas fa-book-open me-2"></i>Chi tiết sách
              </h5>

              <div class="card mt-3 shadow-sm rounded-4 bg-light border p-4">
                <DetailCard :item="activeBook" />
                <div class="mt-3 d-flex flex-wrap gap-2">
                  <span class="badge bg-success rounded-pill px-3 py-2">
                    <i class="fas fa-tag me-1"></i>{{ activeBook.TheLoai }}
                  </span>
                  <span class="badge bg-secondary rounded-pill px-3 py-2">
                    <i class="fas fa-user-pen me-1"></i>{{ activeBook.TacGia }}
                  </span>
                  <span class="badge bg-info text-dark rounded-pill px-3 py-2">
                    <i class="fas fa-book me-1"></i>{{ activeBook.SoQuyen }} Quyển
                  </span>
                </div>
              </div>

              <div class="mt-4 d-flex gap-3 justify-content-center flex-wrap">
                <router-link
                  class="btn btn-warning rounded-pill px-4"
                  :to="{ name: 'sach.edit', params: { id: activeBook._id }}"
                >
                  <i class="fas fa-edit me-1"></i> Chỉnh sửa
                </router-link>
                <button class="btn btn-primary rounded-pill px-4" @click="muonSach(activeBook)">
                  <i class="fas fa-book-reader me-1"></i> Mượn sách
                </button>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div class="text-center mt-5">
        <router-link to="/" class="btn btn-outline-success rounded-pill px-4 py-2 shadow-sm">
          <i class="fas fa-home me-2"></i> Quay về Trang chủ
        </router-link>
        <p class="text-muted mt-3 fst-italic">“Một cuốn sách hay có thể thay đổi cả một tâm hồn.” 🌿</p>
      </div>

    </div>
  </div>
</template>


<script>
import InputSearch from "@/components/InputSearch.vue";
import ListView from "@/components/ListView.vue";
import DetailCard from "@/components/DetailCard.vue";
import SachService from "@/services/sach.service";

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
      if (!soLuongMuon || soLuongMuon <= 0) return alert("Số lượng không hợp lệ!");

      if (soLuongMuon > sach.SoQuyen) return alert("Số lượng vượt quá số quyển đang còn!");

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
