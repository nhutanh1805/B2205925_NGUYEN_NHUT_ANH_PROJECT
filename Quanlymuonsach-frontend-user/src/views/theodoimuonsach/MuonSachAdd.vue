<template>
  <div class="container mt-4">
    <div class="card shadow p-4">
      <h4 class="text-primary fw-bold mb-3">
        <i class="fas fa-book-reader"></i> Mượn sách
      </h4>

      <p><b>Mã sách:</b> {{ book.MaSach }}</p>
      <p><b>Tên sách:</b> {{ book.TenSach }}</p>

      <button class="btn btn-success mt-3 w-100" @click="muonSach">
        <i class="fas fa-plus-circle"></i> Xác nhận mượn sách
      </button>
    </div>
  </div>
</template>

<script>
import TheodoimuonsachService from "@/services/theodoimuonsach.service";
import SachService from "@/services/sach.service";

export default {
  props: ["MaSach"],

  data() {
    return {
      book: {},
      user: {},
    };
  },

  async created() {
    const user = localStorage.getItem("user");
    if (!user) return alert("Bạn cần đăng nhập!");

    this.user = JSON.parse(user);

    this.book = await SachService.get(this.MaSach);
  },

  methods: {
    async muonSach() {
      try {
        const data = {
          MaPhieuMuon: "PM" + Date.now(),
          MaDocGia: this.user.MaDocGia,
          TenDocGia: this.user.HoTen,
          MaSach: this.book.MaSach,
          TenSach: this.book.TenSach,
          NgayMuon: new Date().toISOString().slice(0, 10),
          HanTra: "2025-12-01",
          TrangThai: false,
          GhiChu: "Chưa trả",
        };

        await TheodoimuonsachService.create(data);

        alert("Mượn sách thành công!");

        this.$router.push("/muonsach");
      } catch (error) {
        alert("Không thể mượn sách");
      }
    },
  },
};
</script>
