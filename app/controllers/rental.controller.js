const RentalService = require("../services/rental.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// tạo mới một phiếu mượn
exports.create = async (req, res, next) => {
  if (!req.body?.MaDocGia || !req.body?.MaSach) {
    return next(new ApiError(400, "MaDocGia và MaSach không được để trống"));
  }

  try {
    const rentalService = new RentalService(MongoDB.client);
    const document = await rentalService.create(req.body);
    return res.status(201).json({
      message: "Thêm phiếu mượn thành công",
      data: document,
    });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi thêm phiếu mượn"));
  }
};

// lấy danh sách tất cả phiếu mượn
exports.findAll = async (req, res, next) => {
  try {
    const rentalService = new RentalService(MongoDB.client);
    const documents = await rentalService.find({});
    return res.status(200).json(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi lấy danh sách phiếu mượn"));
  }
};

// lấy thông tin một phiếu mượn theo ID
exports.findOne = async (req, res, next) => {
  try {
    const rentalService = new RentalService(MongoDB.client);
    const document = await rentalService.findById(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy phiếu mượn"));
    }

    return res.status(200).json(document);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi tìm phiếu mượn"));
  }
};

// cập nhật phiếu mượn
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
  }

  try {
    const rentalService = new RentalService(MongoDB.client);
    const document = await rentalService.update(req.params.id, req.body);

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

// xóa một phiếu mượn
exports.delete = async (req, res, next) => {
  try {
    const rentalService = new RentalService(MongoDB.client);
    const document = await rentalService.delete(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy phiếu mượn để xóa"));
    }

    return res.status(200).json({ message: "Xóa phiếu mượn thành công" });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa phiếu mượn"));
  }
};

// xóa toàn bộ phiếu mượn
exports.deleteAll = async (_req, res, next) => {
  try {
    const rentalService = new RentalService(MongoDB.client);
    const deletedCount = await rentalService.deleteAll();

    return res.status(200).json({
      message: `${deletedCount} phiếu mượn đã được xóa`,
    });
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi xóa tất cả phiếu mượn"));
  }
};
