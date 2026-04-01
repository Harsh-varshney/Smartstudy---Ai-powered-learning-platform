const express = require("express");
const router = express.Router();

const userController = require("../controllers/user");

// GET all users
router.get("/", userController.getUsers);

// REGISTER
router.post("/register", userController.createUser);

// LOGIN
router.post("/login", userController.loginUser);

module.exports = router;