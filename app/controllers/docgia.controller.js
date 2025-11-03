const NhaXuatBanService = require("../services/nhaxuatban.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// 🟢 Thêm nhà xuất bản mới
exports.create = async (req, res, next) => {
  if (!req.body?.MaNXB || !req.body?.TenNXB) {
    return next(new ApiError(400, "Mã NXB và Tên NXB không được để trống"));
  }

  try {
    const nxbService = new NhaXuatBanService(MongoDB.client);
    const document = await nxbService.create(req.body);

    return res.status(201).json({
      message: "Thêm nhà xuất bản mới thành công",
      data: document,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi thêm nhà xuất bản"));
  }
};

// 🟡 Lấy danh sách nhà xuất bản hoặc tìm theo tên (?TenNXB=...)
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const nxbService = new NhaXuatBanService(MongoDB.client);
    const { TenNXB } = req.query;

    if (TenNXB) {
      documents = await nxbService.findByName(TenNXB);
    } else {
      documents = await nxbService.find({});
    }

    return res.status(200).json(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi truy xuất danh sách nhà xuất bản"));
  }
};

// 🔵 Lấy thông tin 1 nhà xuất bản theo ID
exports.findOne = async (req, res, next) => {
  try {
    const nxbService = new NhaXuatBanService(MongoDB.client);
    const document = await nxbService.findById(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản"));
    }

    return res.status(200).json(document);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi truy xuất nhà xuất bản id=${req.params.id}`)
    );
  }
};

// 🟠 Cập nhật thông tin nhà xuất bản
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
  }

  try {
    const nxbService = new NhaXuatBanService(MongoDB.client);
    const document = await nxbService.update(req.params.id, req.body);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản để cập nhật"));
    }

    return res.status(200).json({ message: "Cập nhật nhà xuất bản thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật nhà xuất bản id=${req.params.id}`)
    );
  }
};

// 🔴 Xóa nhà xuất bản theo ID
exports.delete = async (req, res, next) => {
  try {
    const nxbService = new NhaXuatBanService(MongoDB.client);
    const document = await nxbService.delete(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhà xuất bản để xóa"));
    }

    return res.status(200).json({ message: "Xóa nhà xuất bản thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa nhà xuất bản id=${req.params.id}`)
    );
  }
};

// ⚫ Xóa toàn bộ nhà xuất bản
exports.deleteAll = async (_req, res, next) => {
  try {
    const nxbService = new NhaXuatBanService(MongoDB.client);
    const deletedCount = await nxbService.deleteAll();

    return res.status(200).json({
      message: `${deletedCount} nhà xuất bản đã được xóa thành công`,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả nhà xuất bản"));
  }
};
