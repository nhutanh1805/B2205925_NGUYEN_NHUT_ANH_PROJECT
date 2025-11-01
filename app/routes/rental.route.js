const express = require("express");
const rentals = require("../controllers/rental.controller");

const router = express.Router();

router.route("/")
    .get(rentals.findAll)
    .post(rentals.create)
    .delete(rentals.deleteAll);

router.route("/favorite")
    .get(rentals.findAllFavorite);

router.route("/:id")
    .get(rentals.findOne)
    .put(rentals.update)
    .delete(rentals.delete);

module.exports = router;