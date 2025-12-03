<template>
  <div class="bg-light min-vh-100 py-5">
    <div class="container">

      <div class="text-center mb-5 5">
        <div class="p-5 rounded-4 bg-success text-white shadow-lg" style="background: linear-gradient(135deg,#38b000,#1b5e20);">
          <h1 class="fw-bold display-5">Thư viện thông minh</h1>
          <p class="lead opacity-75">Khám phá và yêu lại những cuốn sách cũ theo cách hiện đại nhất</p>
        </div>
      </div>

      <div class="row g-4">
        <div class="col-lg-4">
          <div class="card shadow-sm rounded-4 border-0">
            <div class="card-body">

              <InputSearch v-model="searchText" @submit="refreshList" />

              <h5 class="mt-4 fw-bold border-start border-4 border-success ps-3">
                Danh sách Sách
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
                  Không có sách nào.
                </p>
              </div>

              <div class="d-flex justify-content-center mt-4">
                <button class="btn btn-success btn-sm rounded-pill px-4" @click="refreshList">
                  Làm mới
                </button>
              </div>

            </div>
          </div>
        </div>

        <div class="col-lg-8" v-if="activeBook">
          <div class="card shadow-sm rounded-4 border-0">
            <div class="card-body">

              <h5 class="fw-bold border-start border-4 border-success ps-3">
                Chi tiết sách
              </h5>

              <div class="card mt-3 shadow-sm rounded-4 bg-light border p-4">
                <DetailCard :item="activeBook" />
                <div class="mt-3 d-flex flex-wrap gap-2">
                  <span class="badge bg-success rounded-pill px-3 py-2">
                    {{ activeBook.TheLoai }}
                  </span>
                  <span class="badge bg-secondary rounded-pill px-3 py-2">
                    {{ activeBook.TacGia }}
                  </span>
                  <span class="badge bg-info text-dark rounded-pill px-3 py-2">
                    {{ activeBook.SoQuyen }} Quyển
                  </span>
                </div>
              </div>

              <div class="mt-4 text-center">
                <button class="btn btn-primary rounded-pill px-5 py-3" @click="muonSach(activeBook)">
                  Mượn sách
                </button>
              </div>

            </div>
          </div>
        </div>

        <div class="col-lg-8" v-else>
          <div class="text-center py-5">
            <h4 class="text-muted">Vui lòng chọn một cuốn sách để xem chi tiết</h4>
          </div>
        </div>
      </div>

      <div class="text-center mt-5">
        <router-link to="/" class="btn btn-outline-success rounded-pill px-4 py-2 shadow-sm">
          Quay về Trang chủ
        </router-link>
        <p class="text-muted mt-3 fst-italic">“Một cuốn sách hay có thể thay đổi cả một tâm hồn.”</p>
      </div>

    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import DetailCard from "@/components/DetailCard.vue";
import SachService from "@/services/sach.service";

export default {
  components: { InputSearch, DetailCard },
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
      return this.books.map((b) => `${b.MaSach}${b.TenSach}${b.TacGia}${b.TheLoai}`.toLowerCase());
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

    async muonSach(sach) {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        alert("Bạn cần đăng nhập trước!");
        this.$router.push("/login");
        return;
      }

      const soLuongMuon = Number(prompt(`Còn ${sach.SoQuyen} quyển. Bạn muốn mượn bao nhiêu?`, "1"));
      if (!soLuongMuon || soLuongMuon <= 0) return alert("Số lượng không hợp lệ!");
      if (soLuongMuon > sach.SoQuyen) return alert("Không đủ số lượng sách để mượn!");

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

      try {
        await fetch("http://localhost:4000/api/theodoimuonsach", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });

        await fetch(`http://localhost:4000/api/sach/${sach._id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...sach, SoQuyen: sach.SoQuyen - soLuongMuon }),
        });

        alert(`Mượn thành công ${soLuongMuon} quyển!\nHạn trả: ${hanTra.toLocaleDateString('vi-VN')}\n(14 ngày kể từ hôm nay)`);
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