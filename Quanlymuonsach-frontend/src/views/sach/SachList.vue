<template>
  <div class="page row g-4">

    <div class="col-lg-5">
      <InputSearch v-model="searchText" @submit="refreshList" />

      <div class="section-title">
        Danh sách Sách <i class="fas fa-book"></i>
      </div>

      <ListView
        v-if="filteredBooksCount > 0"
        :items="filteredBooks"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có sách nào.</p>

      <div class="d-flex gap-2 mt-3">
        <button class="btn btn-primary btn-sm" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>

        <button class="btn btn-success btn-sm" @click="goToAddBook">
          <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button class="btn btn-danger btn-sm" @click="removeAllBooks">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>

    <div class="col-lg-7" v-if="activeBook">
      <div class="section-title">
        Chi tiết Sách <i class="fas fa-book-open"></i>
      </div>

      <DetailCard :item="activeBook" />

      <router-link
        class="btn btn-warning btn-sm mt-3"
        :to="{ name: 'sach.edit', params: { id: activeBook._id }}"
      >
        <i class="fas fa-edit"></i> Chỉnh sửa
      </router-link>
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
  },

  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  max-width: 950px;
  margin: auto;
}
.section-title {
  font-weight: 600;
  font-size: 18px;
  margin: 14px 0;
  display: flex;
  align-items: center;
  gap: 6px;
}
.gap-2 > * {
  margin-right: 6px;
}
</style>
