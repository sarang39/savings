// const express = require("express");
// const router = express.Router();
// const usercontroller = require("../controllers/user-controller")
// const userMiddleware = require("../Middleware/UserMiddleWare");

// router.post("/register",upload.single("image"), usercontroller.register)
// router.post("/login", usercontroller.login)
// // profile routes require authentication
// router.get("/profile", userMiddleware, usercontroller.getProfile)
// router.get("/getallusers", usercontroller.getAllUsers)

// module.exports = router

const express = require("express");
const router = express.Router();
const usercontroller = require("../controllers/user-controller");
const { userMiddleware, multermiddleware, adminpriority } = require("../Middleware/UserMiddleWare");





router.post("/register", multermiddleware, usercontroller.register);
router.post("/login", usercontroller.login);
router.put("/edituser/:id", adminpriority, usercontroller.edituser)
// profile routes require authentication
router.get("/profile/:id", usercontroller.getProfile);
router.get("/getallusers", usercontroller.getAllUsers);
module.exports = router;
