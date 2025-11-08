const { ObjectId } = require("mongodb");

class TheodoimuonsachService {
  constructor(client) {
    // lưu thông tin theo dõi mượn sách
    this.Theodoimuonsach = client.db().collection("theodoimuonsach");
  }

  extractData(payload) {
    const record = {
      MaPhieuMuon: payload.MaPhieuMuon, // Mã phiếu mượn
      MaDocGia: payload.MaDocGia,       // Mã độc giả
      TenDocGia: payload.TenDocGia,     // Tên độc giả
      MaSach: payload.MaSach,           // Mã sách
      TenSach: payload.TenSach,         // Tên sách
      NgayMuon: payload.NgayMuon,       // Ngày mượn
      HanTra: payload.HanTra,           // Hạn trả
      NgayTra: payload.NgayTra,         // Ngày trả (nếu có)
      TrangThai: payload.TrangThai ?? false, // Trạng thái (đã trả/chưa)
      GhiChu: payload.GhiChu,           // Ghi chú thêm (nếu có)
    };

    Object.keys(record).forEach(
      (key) => record[key] === undefined && delete record[key]
    );

    return record;
  }

  // thêm phiếu mượn mới
  async create(payload) {
    const record = this.extractData(payload);
    const result = await this.Theodoimuonsach.insertOne(record);
    return {
      _id: result.insertedId,
      ...record
    };
  }

  // lấy tất cả phiếu mượn hoặc theo filter
  async find(filter) {
    const cursor = await this.Theodoimuonsach.find(filter);
    return await cursor.toArray();
  }

  // tìm theo tên độc giả
  async findByName(name) {
    return await this.find({
      TenDocGia: { $regex: new RegExp(name), $options: "i" },
    });
  }

  // tìm theo ID
  async findById(id) {
    return await this.Theodoimuonsach.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // cập nhật phiếu mượn
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractData(payload);
    const result = await this.Theodoimuonsach.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );

    return result.value;
  }

  // xóa phiếu mượn theo ID
  async delete(id) {
    const result = await this.Theodoimuonsach.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  // xóa toàn bộ phiếu mượn
  async deleteAll() {
    const result = await this.Theodoimuonsach.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = TheodoimuonsachService;
