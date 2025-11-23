const { ObjectId } = require("mongodb");

class NhaXuatBanService {
  constructor(client) {
    this.NhaXuatBan = client.db().collection("nhaxuatban");
  }

  extractNhaXuatBanData(payload) {
    const nxb = {
      MaNXB: payload.MaNXB,
      TenNXB: payload.TenNXB,
      DiaChi: payload.DiaChi,
      SoDienThoai: payload.SoDienThoai,
      Email: payload.Email,
    };

    Object.keys(nxb).forEach(
      (key) => nxb[key] === undefined && delete nxb[key]
    );

    return nxb;
  }

  async create(payload) {
    const nxb = this.extractNhaXuatBanData(payload);
    const result = await this.NhaXuatBan.insertOne(nxb);

    return {
      _id: result.insertedId,
      ...nxb,
    };
  }

  async find(filter) {
    const cursor = await this.NhaXuatBan.find(filter);
    return await cursor.toArray();
  }

  async findByName(TenNXB) {
    return await this.find({
      TenNXB: { $regex: new RegExp(TenNXB), $options: "i" },
    });
  }

  async findById(id) {
    return await this.NhaXuatBan.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

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

  async delete(id) {
    const result = await this.NhaXuatBan.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async deleteAll() {
    const result = await this.NhaXuatBan.deleteMany({});
    return result.deletedCount;
  }

  async getDropdown() {
    const docs = await this.find({});
    return docs.map(nxb => ({ MaNXB: nxb.MaNXB, TenNXB: nxb.TenNXB }));
  }
}

module.exports = NhaXuatBanService;
