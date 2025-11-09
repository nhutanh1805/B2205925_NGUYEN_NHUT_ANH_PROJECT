const DocGiaService = require("../services/docgia.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

// thêm độc giả mới
exports.create = async (req, res, next) => {
  if (!req.body?.MaDocGia || !req.body?.HoLot || !req.body?.Ten) {
    return next(new ApiError(400, "Mã độc giả, Họ lót và Tên không được để trống"));
  }

  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const document = await docGiaService.create(req.body);
    return res.status(201).json({
      message: "Thêm độc giả mới thành công",
      data: document,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi thêm độc giả"));
  }
};

// lấy danh sách độc giả hoặc tìm theo tên (?HoTen=...)
exports.findAll = async (req, res, next) => {
  let documents = [];

  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const { HoTen } = req.query;

    if (HoTen) {
      documents = await docGiaService.findByName(HoTen);
    } else {
      documents = await docGiaService.find({});
    }

    return res.status(200).json(documents);
  } catch (error) {
    return next(new ApiError(500, "Lỗi khi truy xuất danh sách độc giả"));
  }
};

// lấy thông tin 1 độc giả theo ID
exports.findOne = async (req, res, next) => {
  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const document = await docGiaService.findById(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy độc giả"));
    }

    return res.status(200).json(document);
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi truy xuất độc giả id=${req.params.id}`)
    );
  }
};

// cập nhật thông tin độc giả
exports.update = async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return next(new ApiError(400, "Dữ liệu cập nhật không được để trống"));
  }

  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const document = await docGiaService.update(req.params.id, req.body);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy độc giả để cập nhật"));
    }

    return res.status(200).json({ message: "Cập nhật độc giả thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Lỗi khi cập nhật độc giả id=${req.params.id}`)
    );
  }
};

// zóa độc giả theo ID
exports.delete = async (req, res, next) => {
  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const document = await docGiaService.delete(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy độc giả để xóa"));
    }

    return res.status(200).json({ message: "Xóa độc giả thành công" });
  } catch (error) {
    return next(
      new ApiError(500, `Không thể xóa độc giả id=${req.params.id}`)
    );
  }
};

// xóa toàn bộ độc giả
exports.deleteAll = async (_req, res, next) => {
  try {
    const docGiaService = new DocGiaService(MongoDB.client);
    const deletedCount = await docGiaService.deleteAll();

    return res.status(200).json({
      message: `${deletedCount} độc giả đã được xóa thành công`,
    });
  } catch (error) {
    return next(new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả độc giả"));
  }
};