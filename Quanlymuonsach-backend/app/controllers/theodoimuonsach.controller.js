const TheodoimuonsachService = require("../services/theodoimuonsach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

const isEmptyObject = (obj) => {
  return !obj || Object.keys(obj ?? {}).length === 0;
};

exports.create = async (req, res, next) => {
  if (isEmptyObject(req.body) || !req.body?.MaDocGia || !req.body?.MaSach) {
    return next(new ApiError(400, "MaDocGia và MaSach không được để trống"));
  }

  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const document = await service.create(req.body);
    return res.status(201).json({
      message: "Thêm phiếu mượn thành công",
      data: document,
    });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi thêm phiếu mượn"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const documents = await service.find({});
    return res.status(200).json(documents);
  } catch (error) {
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

exports.update = async (req, res, next) => {
  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const result = await service.traSach(req.params.id);

    return res.status(200).json({
      message: result.message,
      data: result.phieuMuon,
      soLuongTra: result.soLuongTra
    });
  } catch (error) {
    console.error("Lỗi trả sách:", error.message);
    return next(new ApiError(400, error.message || "Lỗi khi trả sách"));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const document = await service.delete(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy phiếu mượn để xóa"));
    }

    return res.status(200).json({ message: "Xóa phiếu mượn thành công" });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa phiếu mượn"));
  }
};

exports.deleteAll = async (_req, res, next) => {
  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const deletedCount = await service.deleteAll();

    return res.status(200).json({
      message: `${deletedCount} phiếu mượn đã được xóa`,
    });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa tất cả phiếu mượn"));
  }
};

exports.findByUser = async (req, res, next) => {
  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const MaDocGia = req.params.MaDocGia; 
    const documents = await service.find({ MaDocGia }); 
    return res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, "Lỗi khi lấy phiếu mượn của người dùng"));
  }
};