const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// GET all users
async function getUsers(req, res) {
    try {
        const users = await User.find().select("-password");
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: "Error fetching users" });
    }
}

// CREATE user (REGISTER)
async function createUser(req, res) {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        // 🔥 Generate token immediately
        const token = jwt.sign(
            { userId: newUser._id,role: newUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        res.status(201).json({
            message: "Registration successful",
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role 
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registration failed" });
    }
}

// LOGIN user
async function loginUser(req, res) {
    try {
        const { email, password } = req.body;
        // console.log(email);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // create token
        const token = jwt.sign(
            { userId: user._id , role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // console.log(token);

        res.status(200).json({
            message: "Login successful",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role 
            }
        });

        // console.log("JWT SECRET:", process.env.JWT_SECRET);

    } catch (err) {
        res.status(500).json({ message: "Login failed" });
    }
}

module.exports = { getUsers, createUser, loginUser };