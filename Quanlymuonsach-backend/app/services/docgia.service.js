const { ObjectId } = require("mongodb");

class DocGiaService {
  constructor(client) {
    this.DocGia = client.db().collection("docgia"); 
  }

 extractDocGiaData(payload) {
    const docGia = {
      MaDocGia: payload.MaDocGia,
      HoLot: payload.HoLot,
      Ten: payload.Ten,
      NgaySinh: payload.NgaySinh,
      Phai: payload.Phai,
      DiaChi: payload.DiaChi,
      DienThoai: payload.DienThoai,
    };

    Object.keys(docGia).forEach(
      (key) => docGia[key] === undefined && delete docGia[key]
    );

    return docGia;
  }

  // tạo độc giả mới
  async create(payload) {
    const docGia = this.extractDocGiaData(payload);
    const result = await this.DocGia.insertOne(docGia);

    return {
      _id: result.insertedId,
      ...docGia,
    };
  }

  // lấy danh sách độc giả
  async find(filter) {
    const cursor = await this.DocGia.find(filter);
    return await cursor.toArray();
  }

  // tìm theo họ tên (HoTen)
  async findByName(HoTen) {
    return await this.find({
      HoTen: { $regex: new RegExp(HoTen), $options: "i" },
    });
  }

  // tìm 1 độc giả theo ID
  async findById(id) {
    return await this.DocGia.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

  // cập nhật thông tin độc giả
  async update(id, payload) {
    const filter = {
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    };

    const update = this.extractDocGiaData(payload);
    const result = await this.DocGia.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );

    return result.value;
  }

  // xóa 1 độc giả
  async delete(id) {
    const result = await this.DocGia.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  // xóa toàn bộ độc giả
  async deleteAll() {
    const result = await this.DocGia.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = DocGiaService;
