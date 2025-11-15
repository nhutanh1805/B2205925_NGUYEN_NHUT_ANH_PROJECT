<template>
  <div class="card card-body detail-card">
    <div class="detail-row" v-for="(label, key) in finalLabels" :key="key">
      <span class="label">{{ label }}:</span>
      <span class="value">{{ item[key] }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailCard",
  props: {
    item: { type: Object, required: true },
  },
  computed: {
    finalLabels() {
      const sachLabels = {
        MaSach: "Mã Sách",
        TenSach: "Tên Sách",
        TacGia: "Tác Giả",
        DonGia: "Đơn Giá",
        SoQuyen: "Số Quyển",
        NamXuatBan: "Năm Xuất Bản",
        MaNXB: "Mã NXB",
        TheLoai: "Thể Loại",
      };

      const phieuLabels = {
        MaPhieuMuon: "Mã Phiếu",
        MaDocGia: "Mã Độc Giả",
        TenDocGia: "Tên Độc Giả",
        NgayMuon: "Ngày Mượn",
        HanTra: "Hạn Trả",
        TrangThai: "Trạng Thái",
        GhiChu: "Ghi Chú",
      };

      return Object.fromEntries(
        Object.keys(this.item).map((key) => [
          key,
          sachLabels[key] || phieuLabels[key] || key,
        ])
      );
    },
  },
};
</script>

<style scoped>
.detail-card {
  border-radius: 12px;
  padding: 18px;
  background: #f8fafc;
  border: 1px solid #cfe3ff;
}
.detail-row {
  margin-bottom: 10px;
  display: flex;
  gap: 8px;
}
.label {
  font-weight: 600;
  color: #1e3a8a;
  min-width: 150px;
}
.value {
  color: #111;
}
</style>
