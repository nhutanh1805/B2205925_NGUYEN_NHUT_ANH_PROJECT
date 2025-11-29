import createApiClient from "./api.service";
import NhaXuatBanService from "./nhaxuatban.service";

class SachService {
  constructor(baseUrl = "/api/sach") {
    this.api = createApiClient(baseUrl);
  }

  async getAll() {
    return (await this.api.get("/")).data;
  }

  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  async deleteAll() {
    return (await this.api.delete("/")).data;
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

  async getNXBList() {
    return await NhaXuatBanService.getDropdown();
  }
async getStatisticsByNXB() {
    return (await this.api.get("/thongke/nxb")).data;
  }

}

export default new SachService();
