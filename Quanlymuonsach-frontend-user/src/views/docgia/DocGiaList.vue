<template>
  <div class="page row g-4">

    <div class="col-lg-5">
      <InputSearch v-model="searchText" @submit="refreshList" />

      <div class="section-title">
        Danh sách Độc giả <i class="fas fa-users"></i>
      </div>

      <ListView
        v-if="filteredCount > 0"
        :items="filtered"
        v-model:activeIndex="activeIndex"
        display-key="fullName"
      />
      <p v-else>Không có độc giả nào.</p>

      <div class="d-flex gap-2 mt-3">
        <button class="btn btn-primary btn-sm" @click="refreshList">
          <i class="fas fa-redo"></i> Làm mới
        </button>

        <button class="btn btn-success btn-sm" @click="goToAdd">
          <i class="fas fa-plus"></i> Thêm mới
        </button>

        <button class="btn btn-danger btn-sm" @click="removeAll">
          <i class="fas fa-trash"></i> Xóa tất cả
        </button>
      </div>
    </div>

    <div class="col-lg-7" v-if="activeDocGia">
      <div class="section-title">
        Chi tiết Độc giả <i class="fas fa-address-card"></i>
      </div>

      <DetailCard :item="activeDocGia" />

      <router-link
        class="btn btn-warning btn-sm mt-3"
        :to="{ name: 'docgia.edit', params: { id: activeDocGia._id }}"
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
import DocGiaService from "@/services/docgia.service";

export default {
  components: { InputSearch, ListView, DetailCard },
  data() {
    return {
      docgiaList: [],
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
    filtered() {
      const s = this.searchText.toLowerCase();
      return this.docgiaList
        .map((d) => ({
          ...d,
          fullName: `${d.HoLot || ""} ${d.Ten || ""}`.trim(),
        }))
        .filter((d) =>
          `${d.MaDocGia}${d.fullName}${d.Phai}${d.DiaChi}${d.DienThoai}`
            .toLowerCase()
            .includes(s)
        );
    },
    filteredCount() {
      return this.filtered.length;
    },
    activeDocGia() {
      return this.activeIndex >= 0 ? this.filtered[this.activeIndex] : null;
    },
  },

  methods: {
    async refreshList() {
      this.docgiaList = await DocGiaService.getAll();
      this.activeIndex = -1;
    },
    goToAdd() {
      this.$router.push({ name: "docgia.add" });
    },
    async removeAll() {
      if (confirm("Bạn có chắc muốn xóa tất cả độc giả không?")) {
        await DocGiaService.deleteAll?.();
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
</style>
