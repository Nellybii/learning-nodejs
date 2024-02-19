const asyncHandler = require('express-async-Handler');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400).json({ message: "Email already exists" });
        return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    });
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    } else {
        res.status(400).json({ message: "User data is not valid" });
    }
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ message: "All fields are required" });
        return;
    }
    const user = await User.findOne({ email });
    if (user && bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.username,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '15m' }
        );
        res.status(201).json({ accessToken });
    } else {
        res.status(401).json({ message: "Invalid credentials" });
    }
});

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };
