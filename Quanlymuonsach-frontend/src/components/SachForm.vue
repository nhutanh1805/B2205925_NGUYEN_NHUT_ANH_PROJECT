<template>
  <form @submit.prevent="submit">
    <div class="form-group mb-3">
      <label>Mã sách</label>
      <input type="text" v-model="local.MaSach" class="form-control" required>
    </div>

    <div class="form-group mb-3">
      <label>Tên sách</label>
      <input type="text" v-model="local.TenSach" class="form-control" required>
    </div>

    <div class="form-group mb-3">
      <label>Tác giả</label>
      <input type="text" v-model="local.TacGia" class="form-control" required>
    </div>

    <div class="form-group mb-3">
      <label>Thể loại</label>
      <input type="text" v-model="local.TheLoai" class="form-control">
    </div>

    <div class="form-group mb-3">
      <label>Nhà xuất bản</label>
      <input type="text" v-model="local.NhaXuatBan" class="form-control">
    </div>

    <div class="form-group mb-3">
      <label>Năm xuất bản</label>
      <input type="number" v-model="local.NamXuatBan" class="form-control">
    </div>

    <div class="form-group mb-3">
      <label>Số lượng</label>
      <input type="number" v-model="local.SoLuong" class="form-control" required>
    </div>

    <button class="btn btn-success mt-2" type="submit">
      <i class="fas fa-save"></i> Lưu
    </button>
  </form>
</template>

<script>
export default {
  name: "SachForm",
  props: {
    sach: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      local: { ...this.sach },
    };
  },
  emits: ["submit:sach"],
  methods: {
    submit() {
      this.$emit("submit:sach", { ...this.local });
    }
  }
};
</script>
