const express = require("express");
const router = express.Router();
const multer = require("multer");

const {
  quizFromTopic,
  quizFromQuestion,
  quizFromPDF
} = require("../controllers/quizController");

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/topic", quizFromTopic);
router.post("/question", quizFromQuestion);
router.post("/pdf", upload.single("pdf"), quizFromPDF);

module.exports = router;