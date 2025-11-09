<template>
  <form @submit.prevent="submit">

    <div class="form-group mb-3">
      <label>Mã độc giả</label>
      <input type="text" v-model="local.MaDocGia" class="form-control" required>
    </div>

    <div class="form-group mb-3">
      <label>Họ lót</label>
      <input type="text" v-model="local.HoLot" class="form-control" required>
    </div>

    <div class="form-group mb-3">
      <label>Tên</label>
      <input type="text" v-model="local.Ten" class="form-control" required>
    </div>

    <div class="form-group mb-3">
      <label>Ngày sinh</label>
      <input type="date" v-model="local.NgaySinh" class="form-control">
    </div>

    <div class="form-group mb-3">
      <label>Giới tính</label>
      <select v-model="local.Phai" class="form-control">
        <option>Nam</option>
        <option>Nữ</option>
        <option>Khác</option>
      </select>
    </div>

    <div class="form-group mb-3">
      <label>Địa chỉ</label>
      <input type="text" v-model="local.DiaChi" class="form-control">
    </div>

    <div class="form-group mb-3">
      <label>Số điện thoại</label>
      <input type="text" v-model="local.DienThoai" class="form-control">
    </div>

    <button class="btn btn-success mt-2">
      <i class="fas fa-save"></i> Lưu
    </button>

  </form>
</template>

<script>
export default {
  name: "DocGiaForm",
  props: {
    docgia: { type: Object, default: () => ({}) }
  },
  data() {
    return {
      local: { ...this.docgia },
    };
  },
  emits: ["submit:docgia"],
  methods: {
    submit() {
      this.$emit("submit:docgia", { ...this.local });
    }
  }
};
</script>
