const SachService = require("../services/sach.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.MaSach || !req.body?.TenSach) {
    return next(new ApiError(400, "Mã sách và Tên sách không được để trống"));
  }

  try {
    const sachService = new SachService(MongoDB.client);
    const document = await sachService.create(req.body);
    return res.status(201).json({
      message: "Thêm sách mới thành công",
      data: document,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi thêm sách"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    const { TenSach } = req.query;
    const documents = TenSach
      ? await sachService.findByName(TenSach)
      : await sachService.find({});
    return res.status(200).json(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi truy xuất danh sách sách"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    const document = await sachService.findById(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách"));
    }
    return res.status(200).json(document);
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi truy xuất sách id=${req.params.id}`));
  }
};

exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
  }

  try {
    const sachService = new SachService(MongoDB.client);
    const document = await sachService.update(req.params.id, req.body);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách để cập nhật"));
    }
    return res.status(200).json({ message: "Cập nhật sách thành công" });
  } catch (error) {
    return next(new ApiError(500, `Lỗi khi cập nhật sách id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    const document = await sachService.delete(req.params.id);
    if (!document) {
      return next(new ApiError(404, "Không tìm thấy sách để xóa"));
    }
    return res.status(200).json({ message: "Xóa sách thành công" });
  } catch (error) {
    return next(new ApiError(500, `Không thể xóa sách id=${req.params.id}`));
  }
};

exports.deleteAll = async (_req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    const deletedCount = await sachService.deleteAll();
    return res.status(200).json({ message: `${deletedCount} sách đã được xóa thành công` });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả sách"));
  }
};

exports.countByNXB = async (req, res, next) => {
  try {
    const sachService = new SachService(MongoDB.client);
    const data = await sachService.countByNXB();
    return res.status(200).json(data);
  } catch (error) {
    return next(new ApiError(500, "Lỗi thống kê số lượng sách theo NXB"));
  }
};
