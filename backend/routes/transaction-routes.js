const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transaction-controller");
const { userMiddleware, adminpriority } = require("../Middleware/UserMiddleWare");
// create
router.post("/createTransaction/:id", userMiddleware, transactionController.createTransaction);
// list
router.get("/listTransactions", transactionController.getAllTransactions);
// single
router.get("/getTransaction/:id", transactionController.getTransactionById);
//getting transaction details
router.get("/allcalculations", transactionController.allcalculations)

router.put("/editpayment/:id", adminpriority, transactionController.Editpayment)
//paymentp with stripe
router.post("/pay", transactionController.paymentWithStripe)
//get trip total by id
router.get("/TripTotalAmount/:tripId", transactionController.getTripTotalAmount)

module.exports = router