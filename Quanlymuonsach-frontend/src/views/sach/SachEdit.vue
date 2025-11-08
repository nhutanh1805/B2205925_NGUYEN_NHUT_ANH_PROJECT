<template>
  <div class="page d-flex justify-content-center" v-if="book">
    <div class="card shadow edit-card p-4">
      <h4 class="title mb-3 text-center">
        <i class="fas fa-edit"></i> Chỉnh sửa sách
      </h4>

      <SachForm
        :book="book"
        @submit:book="updateBook"
      />

      <div class="d-flex justify-content-between mt-3">
        <button class="btn btn-secondary btn-sm" @click="goBack">
          <i class="fas fa-arrow-left"></i> Thoát
        </button>

        <button class="btn btn-danger btn-sm" @click="deleteBook">
          <i class="fas fa-trash"></i> Xóa
        </button>
      </div>

      <p class="text-success text-center mt-2">{{ message }}</p>
    </div>
  </div>
</template>

<script>
import SachForm from "@/components/SachForm.vue";
import SachService from "@/services/sach.service";

export default {
  components: { SachForm },
  props: {
    id: { type: String, required: true },
  },
  data() {
    return {
      book: null,
      message: "",
    };
  },
  methods: {
    async loadBook() {
      try {
        this.book = await SachService.get(this.id);
      } catch {
        alert("Không tìm thấy sách.");
        this.goBack();
      }
    },
    async updateBook(data) {
      await SachService.update(this.book._id, data);
      this.message = "Cập nhật thành công.";
    },
    async deleteBook() {
      if (confirm("Bạn chắc chắn muốn xóa sách này?")) {
        await SachService.delete(this.book._id);
        this.goBack();
      }
    },
    goBack() {
      this.$router.push({ name: "sach.list" });
    },
  },
  mounted() {
    this.loadBook();
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
