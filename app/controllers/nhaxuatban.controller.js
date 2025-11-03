const NhaXuatBanService = require("../services/nhaxuatban.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// tạo mới nhà xuất bản
exports.create = async (req, res, next) => {
  if (!req.body?.MaNXB || !req.body?.TenNXB) {
    return next(new ApiError(400, "Thiếu thông tin bắt buộc (MaNXB, TenNXB)"));
  }

  try {
    const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
    const document = await nhaxuatbanService.create(req.body);

    return res.status(201).json({
      message: "Thêm nhà xuất bản mới thành công",
      data: document,
    });
  } catch (error) {
    console.error("Lỗi khi thêm nhà xuất bản:", error);
    return next(new ApiError(500, "Không thể thêm nhà xuất bản"));
  }
};

// lấy tất cả nhà xuất bản
exports.findAll = async (req, res, next) => {
  try {
    const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
    const documents = await nhaxuatbanService.find({});

    return res.status(200).json(documents);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách NXB:", error);
    return next(new ApiError(500, "Không thể lấy danh sách nhà xuất bản"));
  }
};

// lấy nhà xuất bản theo ID
exports.findOne = async (req, res, next) => {
  try {
    const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
    const document = await nhaxuatbanService.findById(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }

    return res.status(200).json(document);
  } catch (error) {
    console.error("Lỗi khi lấy nhà xuất bản:", error);
    return next(new ApiError(500, "Không thể lấy thông tin nhà xuất bản"));
  }
};

// cập nhật thông tin nhà xuất bản
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
  }

  try {
    const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
    const document = await nhaxuatbanService.update(req.params.id, req.body);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản để cập nhật"));
    }

    return res.status(200).json({ message: "Cập nhật nhà xuất bản thành công" });
  } catch (error) {
    console.error("Lỗi khi cập nhật NXB:", error);
    return next(new ApiError(500, "Không thể cập nhật nhà xuất bản"));
  }
};

// xóa nhà xuất bản theo ID
exports.delete = async (req, res, next) => {
  try {
    const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
    const document = await nhaxuatbanService.delete(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản để xóa"));
    }

    return res.status(200).json({ message: "Xóa nhà xuất bản thành công" });
  } catch (error) {
    console.error("Lỗi khi xóa NXB:", error);
    return next(new ApiError(500, "Không thể xóa nhà xuất bản"));
  }
};

// xóa toàn bộ nhà xuất bản
exports.deleteAll = async (_req, res, next) => {
  try {
    const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
    const deletedCount = await nhaxuatbanService.deleteAll();

    return res.status(200).json({
      message: `${deletedCount} nhà xuất bản đã được xóa thành công`,
    });
  } catch (error) {
    console.error("Lỗi khi xóa tất cả NXB:", error);
    return next(new ApiError(500, "Không thể xóa toàn bộ nhà xuất bản"));
  }
};
