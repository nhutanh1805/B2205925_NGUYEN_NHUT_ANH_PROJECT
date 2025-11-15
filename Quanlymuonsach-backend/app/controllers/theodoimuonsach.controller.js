const TheodoimuonsachService = require("../services/theodoimuonsach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.MaDocGia || !req.body?.MaSach) {
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
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
  }

  try {
    const service = new TheodoimuonsachService(MongoDB.client);
    const document = await service.update(req.params.id, req.body);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy phiếu mượn để cập nhật"));
    }

    return res.status(200).json({
      message: "Cập nhật phiếu mượn thành công",
      data: document,
    });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi cập nhật phiếu mượn"));
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
