const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const filepath = Path.join("uploads", file.originalname)
        if (fs.existsSync(filepath))
            return cb(new Error("file already exist!"), file.originalname);
    }
})
const upload = multer({ storage: storage });
