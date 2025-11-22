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
      <label>Đơn giá</label>
      <input type="number" v-model.number="local.DonGia" class="form-control" required min="0">
    </div>

    <div class="form-group mb-3">
      <label>Số quyển</label>
      <input type="number" v-model.number="local.SoQuyen" class="form-control" required min="1">
    </div>

    <div class="form-group mb-3">
      <label>Năm xuất bản</label>
      <input type="number" v-model.number="local.NamXuatBan" class="form-control" min="1900" max="2100">
    </div>

    <div class="form-group mb-3">
      <label>Mã nhà xuất bản</label>
      <input type="text" v-model="local.MaNXB" class="form-control">
    </div>

    <div class="form-group mb-3">
      <label>Thể loại</label>
      <input type="text" v-model="local.TheLoai" class="form-control">
    </div>

    <button class="btn btn-success mt-2" type="submit">
      <i class="fas fa-save"></i> Lưu
    </button>

  </form>
</template>

<script>
export default {
  name: "SachForm",
  props: { sach: { type: Object, default: () => ({}) } },
  data() { return { local: { ...this.sach } }; },
  emits: ["submit:sach"],
  methods: {
    submit() { this.$emit("submit:sach", { ...this.local }); }
  }
};
</script>
