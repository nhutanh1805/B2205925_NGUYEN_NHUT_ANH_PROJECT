const express = require("express");
const rentals = require("../controllers/rental.controller");

const router = express.Router();

/*
  🔹 /api/rentals
    GET    -> Lấy tất cả phiếu mượn
    POST   -> Thêm phiếu mượn mới
    DELETE -> Xóa tất cả phiếu mượn
*/
router.route("/")
  .get(rentals.findAll)
  .post(rentals.create)
  .delete(rentals.deleteAll);

/*
  🔹 /api/rentals/:id
    GET    -> Lấy 1 phiếu mượn theo id
    PUT    -> Cập nhật phiếu mượn
    DELETE -> Xóa phiếu mượn theo id
*/
router.route("/:id")
  .get(rentals.findOne)
  .put(rentals.update)
  .delete(rentals.delete);

module.exports = router;
