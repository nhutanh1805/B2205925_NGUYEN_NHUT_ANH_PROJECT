const TheodoimuonsachService = require("../services/theodoimuonsach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const isEmptyObject = (obj) => {
  return !obj || Object.keys(obj ?? {}).length === 0;
};

exports.create = async (req, res, next) => {
  if (isEmptyObject(req.body)) {
    return next(new ApiError(400, "Dữ liệu không được để trống"));
  }

  const requiredFields = ["MaDocGia", "TenDocGia", "MaSach", "TenSach", "SoLuong"];
  const missing = requiredFields.filter(field => !req.body[field]);
  if (missing.length > 0) {
    return next(new ApiError(400, `Thiếu các trường: ${missing.join(", ")}`));
  }

  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const document = await service.create(req.body);

    return res.status(201).json({
      message: "Tạo phiếu mượn thành công (đang chờ duyệt)",
      data: document,
    });
  } catch (error) {
    console.error("Lỗi tạo phiếu mượn:", error);
    return next(new ApiError(500, error.message || "Lỗi khi tạo phiếu mượn"));
  }
};

exports.duyetPhieuMuon = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ApiError(400, "ID phiếu mượn không hợp lệ"));
  }

  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const result = await service.duyetPhieuMuon(id);

    return res.status(200).json({
      message: result.message,
      data: result.phieuMuon,
    });
  } catch (error) {
    console.error("Lỗi duyệt phiếu:", error.message);
    return next(new ApiError(400, error.message || "Không thể duyệt phiếu mượn"));
  }
};

exports.traSach = async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new ApiError(400, "ID phiếu mượn không hợp lệ"));
  }

  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const result = await service.traSach(id);

    return res.status(200).json({
      message: result.message,
      data: result.phieuMuon,
      soLuongTra: result.soLuongTra,
    });
  } catch (error) {
    console.error("Lỗi trả sách:", error.message);
    return next(new ApiError(400, error.message || "Không thể trả sách"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const { trangThai, maDocGia } = req.query;

    const filter = {};
    if (trangThai !== undefined) filter.TrangThai = Number(trangThai);
    if (maDocGia) filter.MaDocGia = maDocGia;

    const documents = await service.find(filter);

    return res.status(200).json(documents);
  } catch (error) {
    console.error("Lỗi lấy danh sách phiếu mượn:", error);
    return next(new ApiError(500, "Lỗi khi lấy danh sách phiếu mượn"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const document = await service.findById(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy phiếu mượn"));
    }

    return res.status(200).json(document);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi tìm phiếu mượn"));
  }
};

exports.findByUser = async (req, res, next) => {
  const { MaDocGia } = req.params;

  if (!MaDocGia) {
    return next(new ApiError(400, "Mã độc giả không được để trống"));
  }

  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const documents = await service.find({ MaDocGia });

    return res.status(200).json(documents);
  } catch (error) {
    console.error("Lỗi lấy phiếu theo độc giả:", error);
    return next(new ApiError(500, "Lỗi khi lấy phiếu mượn của độc giả"));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const document = await service.delete(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy phiếu mượn để xóa"));
    }

    return res.status(200).json({
      message: "Xóa phiếu mượn thành công",
      data: document,
    });
  } catch (error) {
    console.error("Lỗi xóa phiếu:", error);
    return next(new ApiError(500, "Lỗi khi xóa phiếu mượn"));
  }
};

exports.deleteAll = async (req, res, next) => {
  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const deletedCount = await service.deleteAll();

    return res.status(200).json({
      message: `Đã xóa ${deletedCount} phiếu mượn`,
    });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa tất cả phiếu mượn"));
  }
};
