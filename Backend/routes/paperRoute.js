const express = require("express");
const router = express.Router();

const {
  uploadPaper,
  getAllPapers,
  deletePaper,uploadMiddleware 
} = require("../controllers/paperController");

const authMiddleware = require("../middleware/auth");
const adminOnly = require("../middleware/adminMw");


/* ===============================
   ADMIN: Upload Paper
   POST /api/papers/upload
================================= */
router.post(
  "/upload",
  authMiddleware,
  adminOnly,
  uploadMiddleware,
  uploadPaper
);


/* ===============================
   USER + ADMIN: Get All Papers
   GET /api/papers
================================= */
router.get(
  "/",
  authMiddleware,
  getAllPapers
);


/* ===============================
   ADMIN: Delete Paper
   DELETE /api/papers/:id
================================= */
router.delete(
  "/:id",
  authMiddleware,
  adminOnly,
  deletePaper
);


module.exports = router;