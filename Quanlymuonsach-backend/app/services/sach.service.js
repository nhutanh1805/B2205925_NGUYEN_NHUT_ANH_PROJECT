const { ObjectId } = require("mongodb");

class SachService {
  constructor(client) {
    this.Sachs = client.db().collection("sach");
  }

  extractSachData(payload) {
    const sach = {
      MaSach: payload.MaSach,
      TenSach: payload.TenSach,
      TacGia: payload.TacGia,
      DonGia: payload.DonGia,
      SoQuyen: payload.SoQuyen,
      NamXuatBan: payload.NamXuatBan,
      MaNXB: payload.MaNXB,
      TheLoai: payload.TheLoai,
    };

    Object.keys(sach).forEach(
      (key) => sach[key] === undefined && delete sach[key]
    );

    return sach;
  }

  async create(payload) {
    const sach = this.extractSachData(payload);
    const result = await this.Sachs.insertOne(sach);
    return { _id: result.insertedId, ...sach };
  }

  async find(filter) {
    const cursor = await this.Sachs.find(filter);
    return await cursor.toArray();
  }

  async findByName(TenSach) {
    return await this.find({
      TenSach: { $regex: new RegExp(TenSach), $options: "i" },
    });
  }

  async findById(id) {
    return await this.Sachs.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

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

  async delete(id) {
    const result = await this.Sachs.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async deleteAll() {
    const result = await this.Sachs.deleteMany({});
    return result.deletedCount;
  }

  async countByNXB() {
    return await this.Sachs.aggregate([
      {
        $group: {
          _id: "$MaNXB",
          SoLuongSach: { $sum: 1 }
        }
      },
      {
        $project: {
          _id: 0,
          MaNXB: "$_id",
          SoLuongSach: 1
        }
      }
    ]).toArray();
  }
}

module.exports = SachService;
