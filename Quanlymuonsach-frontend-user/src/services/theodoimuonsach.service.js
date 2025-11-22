import createApiClient from "./api.service";

class TheoDoiMuonSachService {
  constructor(baseUrl = "/api/theodoimuonsach") {
    this.api = createApiClient(baseUrl);
  }

  getAll() {
    return this.api.get("/").then(res => res.data);
  }

  get(id) {
    return this.api.get(`/${id}`).then(res => res.data);
  }

  create(data) {
    return this.api.post("/", data).then(res => res.data);
  }

  update(id, data) {
    return this.api.put(`/${id}`, data).then(res => res.data);
  }

  delete(id) {
    return this.api.delete(`/${id}`).then(res => res.data);
  }

  // lấy phiếu mượn của 1 user
  getByUser(MaDocGia) {
    return this.api.get(`/user/${MaDocGia}`).then(res => res.data);
  }
}

export default new TheoDoiMuonSachService();
