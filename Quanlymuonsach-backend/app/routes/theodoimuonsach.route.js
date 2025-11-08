const express = require("express");
const theodoimuonsach = require("../controllers/theodoimuonsach.controller");

const router = express.Router();

/*
  /api/theodoimuonsach
    GET    -> Lấy tất cả phiếu mượn
    POST   -> Thêm phiếu mượn mới
    DELETE -> Xóa tất cả phiếu mượn
*/
router.route("/")
  .get(theodoimuonsach.findAll)
  .post(theodoimuonsach.create)
  .delete(theodoimuonsach.deleteAll);

/*
  /api/theodoimuonsach/:id
    GET    -> Lấy 1 phiếu mượn theo ID
    PUT    -> Cập nhật phiếu mượn
    DELETE -> Xóa phiếu mượn theo ID
*/
router.route("/:id")
  .get(theodoimuonsach.findOne)
  .put(theodoimuonsach.update)
  .delete(theodoimuonsach.delete);

module.exports = router;
