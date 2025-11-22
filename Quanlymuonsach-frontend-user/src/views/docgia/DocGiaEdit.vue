<template>
  <div class="page d-flex justify-content-center" v-if="docgia">
    <div class="card shadow edit-card p-4">

      <h4 class="title mb-3 text-center">
        <i class="fas fa-user-edit"></i> Chỉnh sửa Độc Giả
      </h4>

      <DocGiaForm
        :docgia="docgia"
        @submit:docgia="updateDocGia"
      />

      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-secondary btn-sm" @click="goBack">
          <i class="fas fa-arrow-left"></i> Thoát
        </button>

        <button class="btn btn-danger btn-sm" @click="deleteDocGia">
          <i class="fas fa-trash"></i> Xóa
        </button>
      </div>

      <p class="text-success text-center mt-2">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import DocGiaForm from "@/components/DocGiaForm.vue";
import DocGiaService from "@/services/docgia.service";

export default {
  components: { DocGiaForm },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      docgia: null,
      message: "",
    };
  },
  methods: {
    async loadDocGia() {
      try {
        this.docgia = await DocGiaService.get(this.id);
      } catch {
        alert("Không tìm thấy độc giả.");
        this.goBack();
      }
    },
    async updateDocGia(data) {
      const result = await DocGiaService.update(this.docgia._id, data);

      if (result && result.message) {
        alert(result.message);
        return;
      }

      this.message = "Cập nhật thành công.";
    },
    async deleteDocGia() {
      if (confirm("Bạn chắc chắn muốn xóa độc giả này?")) {
        await DocGiaService.delete(this.docgia._id);
        this.goBack();
      }
    },
    goBack() {
      this.$router.push({ name: "docgia.list" });
    },
  },
  mounted() {
    this.loadDocGia();
  },
};
</script>

<style scoped>
.page {
  width: 100%;
  margin-top: 20px;
}
.edit-card {
  width: 500px;
  border-radius: 14px;
  background: #ffffff;
}
.title {
  font-weight: 600;
  color: #ffc107;
}
</style>
