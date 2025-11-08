const { ObjectId } = require("mongodb");

class NhaXuatBanService {
  constructor(client) {
    this.NhaXuatBan = client.db().collection("nhaxuatban");
  }

  extractNhaXuatBanData(payload) {
    const nxb = {
      MaNXB: payload.MaNXB,         // Mã nhà xuất bản
      TenNXB: payload.TenNXB,       // Tên nhà xuất bản
      DiaChi: payload.DiaChi,       // Địa chỉ
      SoDienThoai: payload.SoDienThoai, // Số điện thoại
      Email: payload.Email,         // Email liên hệ
    };

    Object.keys(nxb).forEach(
      (key) => nxb[key] === undefined && delete nxb[key]
    );

    return nxb;
  }

  // tạo mới nhà xuất bản
  async create(payload) {
    const nxb = this.extractNhaXuatBanData(payload);
    const result = await this.NhaXuatBan.insertOne(nxb);

    return {
      _id: result.insertedId,
      ...nxb,
    };
  }

  // lấy danh sách nhà xuất bản
  async find(filter) {
    const cursor = await this.NhaXuatBan.find(filter);
    return await cursor.toArray();
  }

  // tìm theo tên nhà xuất bản
  async findByName(TenNXB) {
    return await this.find({
      TenNXB: { $regex: new RegExp(TenNXB), $options: "i" },
    });
  }

  // tìm 1 nhà xuất bản theo ID
  async findById(id) {
    return await this.NhaXuatBan.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // cập nhật thông tin nhà xuất bản
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractNhaXuatBanData(payload);
    const result = await this.NhaXuatBan.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );

    return result.value;
  }

  // xóa 1 nhà xuất bản
  async delete(id) {
    const result = await this.NhaXuatBan.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  // xóa toàn bộ nhà xuất bản
  async deleteAll() {
    const result = await this.NhaXuatBan.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = NhaXuatBanService;
