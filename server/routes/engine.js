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
} = require("../controllers/engine");

// routes
router.post("/engine", authCheck, adminCheck, create);
router.get("/engines", list);
router.get("/engine/:slug", read);
router.put("/engine/:slug", authCheck, adminCheck, update);
router.delete("/engine/:slug", authCheck, adminCheck, remove);

module.exports = router;
