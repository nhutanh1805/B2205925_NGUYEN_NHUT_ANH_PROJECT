const NhanVienService = require("../services/nhanvien.service");
const MongoDB = require("../utils/mongodb.util");
const ApiError = require("../api-error");

exports.create = async (req, res, next) => {
  if (!req.body?.MSNV || !req.body?.HoTenNV) {
    return next(new ApiError(400, "MSNV và Họ tên nhân viên không được để trống"));
  }

  try {
    const nhanVienService = new NhanVienService(MongoDB.client);

    const existed = await nhanVienService.findOneByMSNV(req.body.MSNV);
    if (existed) {
      return res.status(400).json({ message: "MSNV đã tồn tại" });
    }

    const document = await nhanVienService.create(req.body);

    return res.status(201).json({
      message: "Thêm nhân viên mới thành công",
      data: document,
    });
  } catch (error) {
    console.error("Lỗi tạo nhân viên:", error);
    return next(new ApiError(500, "Đã xảy ra lỗi khi thêm nhân viên"));
  }
};

exports.findAll = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const { HoTenNV } = req.query;

    let documents = [];

    if (HoTenNV) {
      documents = await nhanVienService.findByName(HoTenNV);
    } else {
      documents = await nhanVienService.find({});
    }

    return res.status(200).json(documents);
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, "Lỗi khi truy xuất danh sách nhân viên"));
  }
};

exports.findOne = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.findById(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhân viên"));
    }

    return res.status(200).json(document);
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, `Lỗi khi truy xuất nhân viên id=${req.params.id}`));
  }
};

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
    console.error(error);
    return next(new ApiError(500, `Lỗi khi cập nhật nhân viên id=${req.params.id}`));
  }
};

exports.delete = async (req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const document = await nhanVienService.delete(req.params.id);

    if (!document) {
      return next(new ApiError(404, "Không tìm thấy nhân viên để xóa"));
    }

    return res.status(200).json({ message: "Xóa nhân viên thành công" });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, `Không thể xóa nhân viên id=${req.params.id}`));
  }
};

exports.deleteAll = async (_req, res, next) => {
  try {
    const nhanVienService = new NhanVienService(MongoDB.client);
    const deletedCount = await nhanVienService.deleteAll();

    return res.status(200).json({
      message: `${deletedCount} nhân viên đã được xóa thành công`,
    });
  } catch (error) {
    console.error(error);
    return next(new ApiError(500, "Đã xảy ra lỗi khi xóa tất cả nhân viên"));
  }
};

exports.login = async (req, res, next) => {
  const { MSNV, Password } = req.body;

  if (!MSNV || !Password) {
    return next(new ApiError(400, "MSNV và mật khẩu không được để trống"));
  }

  try {
    const nhanVienService = new NhanVienService(MongoDB.client);

    const user = await nhanVienService.findOneByMSNV(MSNV);

    if (!user) {
      return res.status(400).json({ message: "Tài khoản không tồn tại" });
    }

    if (user.Password !== Password) {
      return res.status(400).json({ message: "Mật khẩu không chính xác" });
    }

    return res.status(200).json({
      message: "Đăng nhập thành công",
      user: {
        _id: user._id,
        MSNV: user.MSNV,
        HoTenNV: user.HoTenNV,
        ChucVu: user.ChucVu,
        DiaChi: user.DiaChi,
        SoDienThoai: user.SoDienThoai,
      },
    });
  } catch (error) {
    console.error("Lỗi login nhân viên:", error);
    return next(new ApiError(500, "Lỗi khi đăng nhập nhân viên"));
  }
};
