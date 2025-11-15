const express = require("express");
const docgias = require("../controllers/docgia.controller");

const router = express.Router();

/*
  /api/docgias
    GET    -> Lấy danh sách tất cả độc giả
    POST   -> Đăng ký / thêm độc giả mới
    DELETE -> Xóa toàn bộ độc giả
*/
router.route("/")
  .get(docgias.findAll)
  .post(docgias.create)
  .delete(docgias.deleteAll);

/*
  /api/docgias/login
    POST   -> Đăng nhập độc giả
*/
router.post("/login", docgias.login);

/*
  /api/docgias/:id
    GET    -> Lấy thông tin 1 độc giả theo ID
    PUT    -> Cập nhật thông tin độc giả
    DELETE -> Xóa 1 độc giả theo ID
*/
router.route("/:id")
  .get(docgias.findOne)
  .put(docgias.update)
  .delete(docgias.delete);

module.exports = router;
