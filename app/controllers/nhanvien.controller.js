const NhanVienService = require("../services/nhanvien.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// thêm nhân viên mới
exports.create = async (req, res, next) => {
  if (!req.body?.MaNV || !req.body?.TenNV) {
    return next(new ApiError(400, "Mã nhân viên và Tên nhân viên không được để trống"));
  }

  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.create(req.body);
    return res.status(201).json({
      message: "Thêm nhân viên mới thành công",
      data: document,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi thêm nhân viên"));
  }
};

// lấy danh sách nhân viên
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const { TenNV } = req.query;

    if (TenNV) {
      documents = await nhanVienService.findByName(TenNV);
    } else {
      documents = await nhanVienService.find({});
    }

    return res.status(200).json(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi truy xuất danh sách nhân viên"));
  }
};

// lấy 1 nhân viên theo ID
exports.findOne = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.findById(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhân viên"));
    }

    return res.status(200).json(document);
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi truy xuất nhân viên id=${req.params.id}`));
  }
};

// cập nhật nhân viên
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
  }

  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.update(req.params.id, req.body);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhân viên để cập nhật"));
    }

    return res.status(200).json({ message: "Cập nhật nhân viên thành công" });
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi cập nhật nhân viên id=${req.params.id}`));
  }
};

// xóa nhân viên theo ID
exports.delete = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.delete(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhân viên để xóa"));
    }

    return res.status(200).json({ message: "Xóa nhân viên thành công" });
  } catch (error) {
    return next(new ApiError(500, `Không thể xóa nhân viên id=${req.params.id}`));
  }
};

// xóa toàn bộ nhân viên
exports.deleteAll = async (_req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const deletedCount = await nhanVienService.deleteAll();

    return res.status(200).json({
      message: `${deletedCount} nhân viên đã được xóa thành công`,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả nhân viên"));
  }
};
