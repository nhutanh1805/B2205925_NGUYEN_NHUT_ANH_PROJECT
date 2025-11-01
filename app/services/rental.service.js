const { ObjectId } = require("mongodb");

class RentalService {
  constructor(client) {
    // lưu thông tin mượn sách
    this.Rentals = client.db().collection("rentals");
  }

  // Trích dữ liệu hợp lệ từ request
  extractRentalData(payload) {
    const rental = {
      MaDocGia: payload.MaDocGia,   // Mã độc giả
      TenDocGia: payload.TenDocGia, // Tên độc giả
      MaSach: payload.MaSach,       // Mã sách
      TenSach: payload.TenSach,     // Tên sách
      NgayMuon: payload.NgayMuon,   // Ngày mượn
      NgayTra: payload.NgayTra,     // Ngày trả
      DaTra: payload.DaTra ?? false // Đã trả chưa (mặc định false)
    };

    Object.keys(rental).forEach(
      (key) => rental[key] === undefined && delete rental[key]
    );

    return rental;
  }

  // thêm phiếu mượn mới
  async create(payload) {
    const rental = this.extractRentalData(payload);
    const result = await this.Rentals.insertOne(rental);

    return {
      _id: result.insertedId,
      ...rental
    };
  }

  // lấy tất cả phiếu mượn (hoặc theo filter)
  async find(filter) {
    const cursor = await this.Rentals.find(filter);
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
    return await this.Rentals.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // cập nhật phiếu mượn
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractRentalData(payload);
    const result = await this.Rentals.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );

    return result.value;
  }

  // xóa phiếu mượn theo ID
  async delete(id) {
    const result = await this.Rentals.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  // xóa toàn bộ phiếu mượn
  async deleteAll() {
    const result = await this.Rentals.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = RentalService;
