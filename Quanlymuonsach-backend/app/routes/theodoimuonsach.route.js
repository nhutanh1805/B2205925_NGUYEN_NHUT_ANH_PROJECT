const express = require("express");
const theodoimuonsachController = require("../controllers/theodoimuonsach.controller");

const router = express.Router();

router.route("/")
  .get(theodoimuonsachController.findAll)
  .post(theodoimuonsachController.create);

router.route("/:id")
  .get(theodoimuonsachController.findOne);

router.get("/user/:MaDocGia", theodoimuonsachController.findByUser);

router.patch("/:id/duyet", theodoimuonsachController.duyetPhieuMuon);
router.patch("/:id/tra", theodoimuonsachController.traSach);

router.delete("/:id", theodoimuonsachController.delete);
router.delete("/", theodoimuonsachController.deleteAll);

module.exports = router;
