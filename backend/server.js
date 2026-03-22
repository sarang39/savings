const express = require('express');
const connectDB = require("./config/db");
const cors = require("cors");
const userRoutes = require("./routes/user-routes");
const transactionRoutes = require("./routes/transaction-routes");
const fs = require('fs');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 5000;

if (!fs.existsSync("uploads")) {
    fs.mkdirSync("uploads")
}
// multer setup
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads")
//     },
//     filename: (req, file, cb) => {
//         const uniqueName = Date.now() + "-" + file.originalname
//         cb(null, uniqueName)
//     }
// })

// const upload = multer({ storage })

// app.use("/uploads", express.static("uploads"))
connectDB()
app.use(cors())
app.use(express.json())
app.use("/api/users", userRoutes);
app.use('/uploads', express.static('uploads'));
app.use("/api/transactions", transactionRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})