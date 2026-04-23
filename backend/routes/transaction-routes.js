const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction-controller");
const { userMiddleware, adminpriority } = require("../Middleware/UserMiddleWare");
// create
router.post("/createTransaction", userMiddleware, transactionController.createTransaction);
// list
router.get("/listTransactions", transactionController.getAllTransactions);
// single
router.get("/getTransaction/:id", transactionController.getTransactionById);
//getting transaction details
router.get("/allcalculations", transactionController.allcalculations)

router.put("/editpayment/:id", adminpriority, transactionController.Editpayment)
//paymentp with stripe
router.post("/pay", transactionController.paymentWithStripe)

module.exports = router