const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../model/users");
const cloudinary = require("../config/cloudinaryconfig");

const register = async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const existing = await User.findOne({ email });

        if (existing) {
            return res.status(400).json({ message: "User already exists" });
        }
        console.log(req.body);
        console.log(req.file);
        const hashedPassword = await bcrypt.hash(password, 10);
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "savings-app",
                use_filename: true
            });
        }
        const userData = {
            name,
            email,
            role,
            password: hashedPassword,
            photo: req.file ? result.secure_url : null
        };
        const user = new User(userData);
        await user.save();
        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (err) {

        console.error("Register error:", err);

        res.status(500).json({
            message: "Server error"
        });
    }
};
const login = async (req, res) => {
    const JWT_SECRET = "jwtSecret";
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        const AuthToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "1h" })
        console.log("in login function")
        if (!user) {
            console.log("invalid credentials")
            return res.status(400).json({ message: "Invalid credentials" })
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }
        if (user) {
            if (isMatch) {
                return res.status(200).json({ message: "Login successful", success: true, AuthToken, user })

            }
        }
        // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" })
        // res.json({ token })
        console.log("login successful")
        // console.log(token)
    } catch (err) {
        res.status(500).json({ message: "Server error" })
        console.log("error", err)
    }
}
const getProfile = async (req, res) => {
    try {
        // middleware puts the id into req.userId
        const userid = req.params.id
        const user = await User.findById(userid).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
const getAllUsers = async (req, res) => {

    try {
        const users = await User.find().select("-password");
        res.json(users);

    } catch (err) {
        res.status(500).json({ message: "Server error" });
    }
}
//Admin privileges
const edituser = async (req, res) => {
    try {
        const userid = req.params.id;
        const newdata = req.body;
        const update = await User.findByIdAndUpdate(userid, newdata)
        if (update) {
            res.status(200).json({ message: "updated successfully" })
        }
        if (!update) {
            res.status(404).json({ message: "updated successfully" })
        }
    }
    catch (err) {
        res.status(500).json({ message: "Server error" })
    }
}
module.exports = { register, login, getProfile, getAllUsers, edituser };
