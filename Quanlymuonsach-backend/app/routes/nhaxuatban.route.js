const express = require("express");
const nhaxuatbans = require("../controllers/nhaxuatban.controller");

const router = express.Router();

/*
  /api/nhaxuatban
    GET    -> Lấy danh sách tất cả nhà xuất bản
    POST   -> Thêm nhà xuất bản mới
    DELETE -> Xóa toàn bộ nhà xuất bản
*/
router.route("/")
  .get(nhaxuatbans.findAll)
  .post(nhaxuatbans.create)
  .delete(nhaxuatbans.deleteAll);

/*
  /api/nhaxuatban/:id
    GET    -> Lấy thông tin 1 nhà xuất bản theo ID
    PUT    -> Cập nhật thông tin nhà xuất bản
    DELETE -> Xóa 1 nhà xuất bản theo ID
*/
router.route("/:id")
  .get(nhaxuatbans.findOne)
  .put(nhaxuatbans.update)
  .delete(nhaxuatbans.delete);

/*
  /api/nhaxuatban/list
    GET -> Lấy danh sách nhà xuất bản dạng dropdown (MaNXB, TenNXB)
*/
router.get("/list", nhaxuatbans.getNXBList);

module.exports = router;
