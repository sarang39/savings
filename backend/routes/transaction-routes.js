const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction-controller");
const { userMiddleware } = require("../Middleware/UserMiddleWare");

// create
router.post("/createTransaction", userMiddleware, transactionController.createTransaction);
// list
router.get("/listTransactions", transactionController.getAllTransactions);
// single
router.get("/getTransaction/:id", transactionController.getTransactionById);
//getting transaction details
router.get("/allcalculations", transactionController.allcalculations)

router.put("/editpayment/:id", transactionController.Editpayment)

module.exports = router;