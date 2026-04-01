const express = require("express");
const router = express.Router();
const multer = require("multer");
const Paper = require("../models/paper");
const path = require("path");

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder backend/uploads/
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique name
  },
});


// Multer middleware
const upload = multer({ storage });

/* ===============================
   ADMIN: Upload Paper
================================= */
exports.uploadPaper = async (req, res) => {
  try {
    const { title, subject } = req.body;

    if (!title || !subject ||!req.file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const paper = new Paper({
      title,
      subject,
      fileUrl: `uploads/${req.file.filename}`, // Multer file path
      uploadedBy:  req.user.userId, // from JWT
    });

    console.log(req.user.userId);
    await paper.save();

    res.status(201).json({
      message: "Paper uploaded successfully",
      paper,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ===============================
   USER: Get All Papers
================================= */
exports.getAllPapers = async (req, res) => {
  try {
    const papers = await Paper.find()
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json(papers);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


/* ===============================
   ADMIN: Delete Paper
================================= */
exports.deletePaper = async (req, res) => {
  try {
    // ✅ Check admin role
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Admin only." });
    }

    const paper = await Paper.findById(req.params.id);

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    await paper.deleteOne();

    res.status(200).json({ message: "Paper deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Export Multer Middleware
exports.uploadMiddleware = upload.single("file");