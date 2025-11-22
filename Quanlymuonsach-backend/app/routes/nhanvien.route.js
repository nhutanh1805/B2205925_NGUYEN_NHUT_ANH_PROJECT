const express = require("express");
const router = express.Router();
const nhanvien = require("../controllers/nhanvien.controller");

router.post("/", nhanvien.create);
router.get("/", nhanvien.findAll);
router.get("/:id", nhanvien.findOne);
router.put("/:id", nhanvien.update);
router.delete("/:id", nhanvien.delete);
router.delete("/", nhanvien.deleteAll);
router.post("/login", nhanvien.login);

module.exports = router;
