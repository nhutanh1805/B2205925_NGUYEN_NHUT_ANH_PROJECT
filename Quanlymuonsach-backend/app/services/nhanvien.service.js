const { ObjectId } = require("mongodb");

class NhanVienService {
  constructor(client) {
    this.NhanVien = client.db().collection("nhanvien");
  }

  extractNhanVienData(payload) {
    const nhanvien = {
      MaNhanVien: payload.MaNhanVien,
      HoTen: payload.HoTen,
      GioiTinh: payload.GioiTinh,
      NgaySinh: payload.NgaySinh,
      DiaChi: payload.DiaChi,
      DienThoai: payload.DienThoai,
      Email: payload.Email,
      ChucVu: payload.ChucVu,
    };

    Object.keys(nhanvien).forEach(
      (key) => nhanvien[key] === undefined && delete nhanvien[key]
    );

    return nhanvien;
  }

  // tạo nhân viên mới
  async create(payload) {
    const nhanvien = this.extractNhanVienData(payload);
    const result = await this.NhanVien.insertOne(nhanvien);
    return result;
  }

  // lấy danh sách tất cả nhân viên
  async find(filter) {
    const cursor = await this.NhanVien.find(filter);
    return await cursor.toArray();
  }

  // tìm nhân viên theo tên
  async findByName(name) {
    return await this.find({
      HoTen: { $regex: new RegExp(name, "i") },
    });
  }

  // tìm nhân viên theo ID
  async findById(id) {
    return await this.NhanVien.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // cập nhật nhân viên
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };
    const update = this.extractNhanVienData(payload);
    const result = await this.NhanVien.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  // xóa 1 nhân viên theo ID
  async delete(id) {
    const result = await this.NhanVien.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  // xóa toàn bộ nhân viên
  async deleteAll() {
    const result = await this.NhanVien.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = NhanVienService;
