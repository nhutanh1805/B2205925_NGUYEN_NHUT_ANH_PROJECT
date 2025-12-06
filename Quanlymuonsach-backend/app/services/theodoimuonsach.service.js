const { ObjectId } = require("mongodb");

class TheodoimuonsachService {
  constructor(client) {
    this.Theodoimuonsach = client.db().collection("theodoimuonsach");
    this.Sach = client.db().collection("sach");
  }

  static TRANG_THAI = {
    CHO_DUYET: 0,
    DANG_MUON: 1,
    DA_TRA: 2,
  };

  static getTenTrangThai(trangThai) {
    const map = {
      0: "Chờ duyệt",
      1: "Đang mượn",
      2: "Đã trả",
    };
    return map[trangThai] || "Không xác định";
  }

  extractData(payload) {
    const record = {
      MaPhieuMuon: payload.MaPhieuMuon?.trim(),
      MaDocGia: payload.MaDocGia?.trim(),
      TenDocGia: payload.TenDocGia?.trim(),
      MaSach: payload.MaSach?.trim(),
      TenSach: payload.TenSach?.trim(),
      SoLuong: payload.SoLuong ? Number(payload.SoLuong) : 1,
      NgayMuon: payload.NgayMuon ? new Date(payload.NgayMuon) : null,
      HanTra: payload.HanTra ? new Date(payload.HanTra) : null,
      NgayTra: payload.NgayTra ? new Date(payload.NgayTra) : null,
      TrangThai:
        payload.TrangThai !== undefined
          ? Number(payload.TrangThai)
          : this.constructor.TRANG_THAI.CHO_DUYET,
      GhiChu: payload.GhiChu?.trim() || "",
      DaTruKho: false,
    };

    Object.keys(record).forEach((key) => {
      if (record[key] === undefined || record[key] === "") delete record[key];
    });

    return record;
  }

  async create(payload) {
    const record = this.extractData(payload);
    const sach = await this.Sach.findOne({ MaSach: record.MaSach });
    if (!sach || sach.SoQuyen < record.SoLuong) {
      throw new Error("Sách không đủ số lượng để mượn");
    }

    await this.Sach.updateOne(
      { MaSach: record.MaSach },
      { $inc: { SoQuyen: -record.SoLuong } }
    );
    record.DaTruKho = true;

    const result = await this.Theodoimuonsach.insertOne(record);
    return { _id: result.insertedId, ...record };
  }

  async duyetPhieuMuon(id) {
    const phieu = await this.findById(id);
    if (!phieu) throw new Error("Không tìm thấy phiếu mượn");
    if (phieu.TrangThai !== this.constructor.TRANG_THAI.CHO_DUYET) {
      throw new Error("Chỉ được duyệt phiếu đang ở trạng thái 'Chờ duyệt'");
    }

    const now = new Date();
    const updated = await this.Theodoimuonsach.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          TrangThai: this.constructor.TRANG_THAI.DANG_MUON,
          NgayMuon: now,
          GhiChu: phieu.GhiChu
            ? `${phieu.GhiChu} | Duyệt: ${now.toLocaleString()}`
            : `Duyệt lúc ${now.toLocaleString()}`,
        },
      },
      { returnDocument: "after" }
    );

    return {
      message: "Duyệt phiếu mượn thành công!",
      phieuMuon: updated.value,
    };
  }

  async traSach(id) {
    const phieu = await this.findById(id);
    if (!phieu) throw new Error("Không tìm thấy phiếu mượn");
    if (phieu.TrangThai !== this.constructor.TRANG_THAI.DANG_MUON) {
      throw new Error("Chỉ được trả sách khi đang ở trạng thái 'Đang mượn'");
    }

    const now = new Date();
    const updated = await this.Theodoimuonsach.findOneAndUpdate(
      { _id: new ObjectId(id) },
      {
        $set: {
          TrangThai: this.constructor.TRANG_THAI.DA_TRA,
          NgayTra: now,
          GhiChu: phieu.GhiChu
            ? `${phieu.GhiChu} | Trả: ${now.toLocaleString()}`
            : `Đã trả lúc ${now.toLocaleString()}`,
        },
      },
      { returnDocument: "after" }
    );

    await this.Sach.updateOne(
      { MaSach: phieu.MaSach },
      { $inc: { SoQuyen: +phieu.SoLuong } }
    );

    return {
      message: "Trả sách thành công!",
      phieuMuon: updated.value,
      soLuongTra: phieu.SoLuong,
    };
  }

  async find(filter = {}) {
    return await this.Theodoimuonsach.find(filter).sort({ NgayMuon: -1 }).toArray();
  }

  async findById(id) {
    return await this.Theodoimuonsach.findOne({ _id: new ObjectId(id) });
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
    const phieu = await this.findById(id);
    if (!phieu) return null;

    if (phieu.DaTruKho && phieu.TrangThai === this.constructor.TRANG_THAI.CHO_DUYET) {
      await this.Sach.updateOne(
        { MaSach: phieu.MaSach },
        { $inc: { SoQuyen: +phieu.SoLuong } }
      );
    }

    const result = await this.Theodoimuonsach.findOneAndDelete({ _id: new ObjectId(id) });
    return result.value;
  }

  async deleteAll() {
    const result = await this.Theodoimuonsach.deleteMany({});
    return result.deletedCount;
  }
}

module.exports = TheodoimuonsachService;
