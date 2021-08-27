const express = require("express");
const router = express.Router();

// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");

// controller
const {
  create,
  read,
  update,
  remove,
  list,
} = require("../controllers/year");

// routes
router.post("/year", authCheck, adminCheck, create);
router.get("/years", list);
router.get("/year/:slug", read);
router.put("/year/:slug", authCheck, adminCheck, update);
router.delete("/year/:slug", authCheck, adminCheck, remove);

module.exports = router;
