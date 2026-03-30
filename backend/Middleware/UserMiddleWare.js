const jwt = require("jsonwebtoken")

const JWT_SECRET = "jwtSecret"

const multer = require("multer")
const fs = require("fs")

const userMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" })
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }
}
const multermiddleware = (req, res, next) => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, "uploads/")
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname)
        }
    })
    const upload = multer({ storage: storage }).single("photo")
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ message: "Multer error occurred" })
        } else if (err) {
            return res.status(500).json({ message: "Server error" })
        }
        next()
    })
}

const adminpriority = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.status(401).json({ message: "No token provided" })
        }
        const token = authHeader.split(" ")[1]
        const decoded = jwt.verify(token, JWT_SECRET)
        req.userId = decoded.userId
        console.log("passing next==", req.params.id)
        console.log("passing next==", decoded.role)
        if (req.params.id === decoded.userId || decoded.role === "admin") {
            console.log("passing next")
            return next()
        }
        return res.status(403).json({ message: "Access denied" });
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" })
    }


}
module.exports = { userMiddleware, multermiddleware, adminpriority }