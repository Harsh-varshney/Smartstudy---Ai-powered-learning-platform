const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const noteController = require("../controllers/notes");

router.post("/", auth , noteController.createNote);
router.get("/", auth , noteController.getNotes);
router.put("/:id", auth , noteController.updateNote);
router.delete("/:id",auth , noteController.deleteNote);
router.patch("/:id/pin", auth, noteController.togglePinNote);

module.exports = router;