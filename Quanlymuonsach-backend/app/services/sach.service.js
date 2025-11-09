const { ObjectId } = require("mongodb");

class SachService {
  constructor(client) {
    this.Sachs = client.db().collection("sach");
  }

  extractSachData(payload) {
  const sach = {
    MaSach: payload.MaSach,            // Mã sách
    TenSach: payload.TenSach,          // Tên sách
    TacGia: payload.TacGia,            // Tác giả
    DonGia: payload.DonGia,            // Đơn giá
    SoQuyen: payload.SoQuyen,          // Số lượng tồn kho
    NamXuatBan: payload.NamXuatBan,    // Năm xuất bản
    MaNXB: payload.MaNXB,              // Mã nhà xuất bản
    TheLoai: payload.TheLoai,          // Thể loại
  };

    Object.keys(sach).forEach(
      (key) => sach[key] === undefined && delete sach[key]
    );

    return sach;
  }

  // tạo sách mới
  async create(payload) {
    const sach = this.extractSachData(payload);
    const result = await this.Sachs.insertOne(sach);

    return {
      _id: result.insertedId,
      ...sach,
    };
  }

  // lấy danh sách sách
  async find(filter) {
    const cursor = await this.Sachs.find(filter);
    return await cursor.toArray();
  }

  // tìm theo tên sách (TenSach)
  async findByName(TenSach) {
    return await this.find({
      TenSach: { $regex: new RegExp(TenSach), $options: "i" },
    });
  }

  // tìm 1 sách theo ID
  async findById(id) {
    return await this.Sachs.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // cập nhật thông tin sách
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractSachData(payload);
    const result = await this.Sachs.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );

    return result.value;
  }

  // xóa 1 sách
  async delete(id) {
    const result = await this.Sachs.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  // xóa toàn bộ sách
  async deleteAll() {
    const result = await this.Sachs.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = SachService;
