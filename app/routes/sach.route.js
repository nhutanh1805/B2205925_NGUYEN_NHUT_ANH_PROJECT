const express = require("express");
const sachs = require("../controllers/sach.controller");

const router = express.Router();

/*
  /api/sach
    GET    -> Lấy danh sách tất cả sách
    POST   -> Thêm sách mới
    DELETE -> Xóa toàn bộ sách
*/
router.route("/")
  .get(sachs.findAll)
  .post(sachs.create)
  .delete(sachs.deleteAll);

/*
  /api/sach/:id
    GET    -> Lấy thông tin 1 sách theo ID
    PUT    -> Cập nhật thông tin sách
    DELETE -> Xóa 1 sách theo ID
*/
router.route("/:id")
  .get(sachs.findOne)
  .put(sachs.update)
  .delete(sachs.delete);

module.exports = router;
