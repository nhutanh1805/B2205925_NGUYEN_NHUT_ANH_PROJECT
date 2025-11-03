const express = require("express");
const nhanvien = require("../controllers/nhanvien.controller");

const router = express.Router();

/*
  /api/nhanvien
    GET    -> Lấy danh sách tất cả nhân viên
    POST   -> Thêm nhân viên mới
    DELETE -> Xóa toàn bộ nhân viên
*/
router.route("/")
  .get(nhanvien.findAll)
  .post(nhanvien.create)
  .delete(nhanvien.deleteAll);

/*
  /api/nhanvien/:id
    GET    -> Lấy thông tin 1 nhân viên theo ID
    PUT    -> Cập nhật thông tin nhân viên
    DELETE -> Xóa 1 nhân viên theo ID
*/
router.route("/:id")
  .get(nhanvien.findOne)
  .put(nhanvien.update)
  .delete(nhanvien.delete);

module.exports = router;
