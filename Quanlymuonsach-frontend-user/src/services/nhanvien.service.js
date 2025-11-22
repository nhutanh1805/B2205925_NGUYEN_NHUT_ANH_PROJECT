import createApiClient from "./api.service";

class NhanVienService {
  constructor(baseUrl = "/api/nhanvien") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async get(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  async create(data) {
    return (await this.api.post("/", data)).data;
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

  async login(data) {
    return (await this.api.post("/login", data)).data;
  }

  async findByName(HoTenNV) {
    return (await this.api.get(`/?HoTenNV=${encodeURIComponent(HoTenNV)}`)).data;
  }
}

export default new NhanVienService();
