<template>
  <div class="card shadow-sm">
    <div class="card-header bg-light d-flex justify-content-between align-items-center">
      <h6 class="mb-0">
        <i class="fas fa-users me-2"></i>
        Danh sách Độc giả ({{ filteredCount }})
      </h6>

      <div class="d-flex gap-2">
        <button 
          class="btn btn-outline-secondary btn-sm"
          @click="refreshList"
        >
          <i class="fas fa-sync-alt me-1"></i>
          Làm mới
        </button>

        <router-link 
          to="/docgia/add" 
          class="btn btn-success btn-sm"
        >
          <i class="fas fa-plus me-1"></i>
          Thêm mới
        </router-link>

        <button 
          class="btn btn-danger btn-sm"
          @click="removeAll"
          :disabled="filteredCount === 0"
        >
          <i class="fas fa-trash-alt me-1"></i>
          Xóa tất cả
        </button>
      </div>
    </div>

    <div class="card-body border-bottom pb-3">
      <InputSearch v-model="searchText" @submit="refreshList" />
    </div>

    <div class="table-responsive">
      <table class="table table-hover mb-0 align-middle">
        <thead class="table-light">
          <tr>
            <th width="120">Mã Độc Giả</th>
            <th width="180">Họ tên</th>
            <th width="100">Giới tính</th>
            <th>Địa chỉ</th>
            <th width="130">SĐT</th>
            <th width="140">Thao tác</th>
          </tr>
        </thead>

        <tbody>
          <tr v-if="filteredCount === 0">
            <td :colspan="6" class="text-center py-5 text-muted">
              <i class="fas fa-user-slash fa-3x mb-3 opacity-50"></i>
              <p class="mb-0">Không có độc giả nào</p>
            </td>
          </tr>

          <tr 
            v-else 
            v-for="(dg, index) in filtered" 
            :key="dg._id"
            :class="{ 'table-active': index === activeIndex }"
            @click="activeIndex = index"
            style="cursor: pointer;"
          >
            <td><strong class="text-primary">{{ dg.MaDocGia }}</strong></td>
            <td>{{ dg.fullName }}</td>
            <td>{{ dg.Phai || "-" }}</td>
            <td class="text-truncate" style="max-width: 250px" :title="dg.DiaChi">
              {{ dg.DiaChi || "-" }}
            </td>
            <td>{{ dg.DienThoai || "-" }}</td>

            <td>
              <div class="btn-group btn-group-sm" role="group">
                <router-link 
                  :to="{ name:'docgia.edit', params:{ id: dg._id } }"
                  class="btn btn-outline-primary"
                >
                  <i class="fas fa-edit"></i>
                </router-link>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="card-body" v-if="activeDocGia">
      <div class="section-title mb-2">
        Chi tiết Độc giả
      </div>
      <DetailCard :item="activeDocGia" />
    </div>
  </div>
</template>

<script>
import InputSearch from "@/components/InputSearch.vue";
import DetailCard from "@/components/DetailCard.vue";
import DocGiaService from "@/services/docgia.service";

export default {
  components: { InputSearch, DetailCard },
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
    async removeAll() {
      if (!confirm("Bạn có chắc muốn xóa tất cả độc giả không?")) return;
      await DocGiaService.deleteAll?.();
      this.refreshList();
    },
  },

  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.section-title {
  font-weight: 600;
  font-size: 17px;
  display: flex;
  align-items: center;
  gap: 6px;
}
</style>
