const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../model/users");
const cloudinary = require("../config/cloudinary");
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
        let imageUrl = null; // ✅ define outside
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "savings-app",
                use_filename: true
            });
            imageUrl = result.secure_url; // ✅ assign here
        }
        const userData = {
            name,
            email,
            role,
            password: hashedPassword,
            photo: imageUrl // ✅ use variable
        };

        const user = new User(userData);
        await user.save();

        res.status(201).json({
            message: "User registered successfully",
            user
        });

    } catch (err) {
        console.error("Register error:", err);
        res.status(500).json({ message: "Server error" });
    }
};


//user approval by admin
// const approveUser = async (req, res) => {
//     try {
//         const userid = req.data.id;
//         const data = req.data;
//         const update = await User.findByIdAndUpdate(userid, { status: data.status }, { new: true });
//         if (!update) {
//             return res.status(404).json({ message: "User not found" });
//         }
//         res.status(200).json({ message: "User approved / rejected successfully", user: update });
//     } catch (err) {
//         console.error("Approve user error:", err);
//         res.status(500).json({ message: "Server error" });
//     }
// };
// const approveUser = async (req, res) => {
//     try {
//         const { status } = req.body.status;
//         const { ruserid } = req.body.id;

//         if (!['approved', 'rejected', 'pending'].includes(status)) {
//             return res.status(400).json({ message: 'Invalid status value' });
//         }

//         const update = await User.findByIdAndUpdate(
//             ruserid,
//             { status: status },
//             { new: true }
//         );

//         if (!update) {
//             return res.status(404).json({ message: "User not found" });
//         }

//         res.status(200).json({
//             message: `User ${status} successfully`,
//             user: update
//         });

//     } catch (err) {
//         console.error("Approve user error:", err);

//         res.status(500).json({
//             message: "Server error"
//         });
//     }
// };
const approveUser = async (req, res) => {
    try {

        const status = req.body.status;
        const ruserid = req.body.userid;

        if (!['approved', 'rejected', 'pending'].includes(status)) {
            return res.status(400).json({
                message: 'Invalid status value'
            });
        }

        const update = await User.findByIdAndUpdate(
            ruserid,
            { status: status },
            { new: true }
        );

        if (!update) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: `User ${status} successfully`,
            user: update
        });

    } catch (err) {

        console.error("Approve user error:", err);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const login = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    const { email, password } = req.body
    try {
        const user = await User.findOne({ email })
        const AuthToken = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, { expiresIn: "90d" })
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
const testgetProfile = async (req, res) => {
    try {
        // middleware puts the id into req.userId
        const userid = req.userId
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
module.exports = { register, login, getProfile, getAllUsers, edituser, testgetProfile, approveUser };