import createApiClient from "./api.service";

class NhaXuatBanService {
  constructor(baseUrl = "/api/nhaxuatban") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  async getDropdown() {
    const list = await this.getAll();
    return list.map(nxb => ({ MaNXB: nxb.MaNXB, TenNXB: nxb.TenNXB }));
  }
}

export default new NhaXuatBanService();
