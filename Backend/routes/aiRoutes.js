const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");

const { askAI,generateNotes,analyzePaperFile  } = require("../controllers/aiController");

router.post("/ask", askAI);
router.post("/generate-notes", generateNotes);
router.post("/paper-analyze", upload.single("paper"), analyzePaperFile);

module.exports = router;