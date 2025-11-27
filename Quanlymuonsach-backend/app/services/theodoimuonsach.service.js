const { ObjectId } = require("mongodb");

class TheodoimuonsachService {
  constructor(client) {
    this.Theodoimuonsach = client.db().collection("theodoimuonsach");
    this.Sach = client.db().collection("sach");
  }

  extractData(payload) {
    const record = {
      MaPhieuMuon: payload.MaPhieuMuon,
      MaDocGia: payload.MaDocGia,
      TenDocGia: payload.TenDocGia,
      MaSach: payload.MaSach,
      TenSach: payload.TenSach,
      SoLuong: payload.SoLuong,
      NgayMuon: payload.NgayMuon,
      HanTra: payload.HanTra,
      NgayTra: payload.NgayTra,
      TrangThai: payload.TrangThai ?? false,
      GhiChu: payload.GhiChu,
    };

    Object.keys(record).forEach(
      (key) => record[key] === undefined && delete record[key]
    );

    return record;
  }

  async traSach(id) {
    try {
      const phieuMuon = await this.Theodoimuonsach.findOne({
        _id: new ObjectId(id)
      });

      if (!phieuMuon) {
        throw new Error("Không tìm thấy phiếu mượn");
      }

      if (phieuMuon.TrangThai === true) {
        throw new Error("Phiếu mượn đã được trả rồi");
      }

      const now = new Date();
      const updatePhieu = await this.Theodoimuonsach.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { 
          $set: { 
            TrangThai: true,
            NgayTra: now,
            GhiChu: phieuMuon.GhiChu || "Đã trả"
          } 
        },
        { returnDocument: "after" }
      );

      await this.Sach.findOneAndUpdate(
        { MaSach: phieuMuon.MaSach },
        { $inc: { SoQuyen: phieuMuon.SoLuong } },
        { upsert: true }
      );

      return {
        message: "Trả sách thành công!",
        phieuMuon: updatePhieu.value,
        soLuongTra: phieuMuon.SoLuong
      };
    } catch (error) {
      throw error;
    }
  }

  async create(payload) {
    const record = this.extractData(payload);
    const result = await this.Theodoimuonsach.insertOne(record);
    return { _id: result.insertedId, ...record };
  }

  async find(filter) {
    const cursor = await this.Theodoimuonsach.find(filter);
    return await cursor.toArray();
  }

  async findById(id) {
    return await this.Theodoimuonsach.findOne({
      _id: new ObjectId(id)
    });
  }

  async update(id, payload) {
    const filter = { _id: new ObjectId(id) };
    const update = this.extractData(payload);
    const result = await this.Theodoimuonsach.findOneAndUpdate(
      filter,
      { $set: update },
      { returnDocument: "after" }
    );
    return result.value;
  }

  async delete(id) {
    const result = await this.Theodoimuonsach.findOneAndDelete({
      _id: new ObjectId(id)
    });
    return result.value;
  }

  async deleteAll() {
    const result = await this.Theodoimuonsach.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = TheodoimuonsachService;