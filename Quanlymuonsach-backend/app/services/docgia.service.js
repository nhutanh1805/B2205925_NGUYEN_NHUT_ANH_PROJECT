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
      Username: payload.Username,
      Password: payload.Password,
    };

    Object.keys(docGia).forEach(
      (key) => docGia[key] === undefined && delete docGia[key]
    );

    return docGia;
  }

  async create(payload) {
    const docGia = this.extractDocGiaData(payload);
    const result = await this.DocGia.insertOne(docGia);

    return {
      _id: result.insertedId,
      ...docGia,
    };
  }

  async find(filter) {
    const cursor = await this.DocGia.find(filter);
    return await cursor.toArray();
  }

  async findByName(HoTen) {
    return await this.find({
      HoTen: { $regex: new RegExp(HoTen), $options: "i" },
    });
  }

  async findById(id) {
    return await this.DocGia.findOne({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
  }

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

  async delete(id) {
    const result = await this.DocGia.findOneAndDelete({
      _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
    });
    return result.value;
  }

  async deleteAll() {
    const result = await this.DocGia.deleteMany({});
    return result.deletedCount;
  }

  async findOneByUsername(username) {
    return await this.DocGia.findOne({ Username: username });
  }

  async login(username, password) {
    return await this.DocGia.findOne({
      Username: username,
      Password: password,
    });
  }
}

module.exports = DocGiaService;
