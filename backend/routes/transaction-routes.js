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
router.get("/TripTotalExpenseAmount/:tripId", transactionController.getTripTotalExpenseAmount)
//create contribution direct db
router.post("/createcontributiondirectdb/:tripId", userMiddleware, transactionController.createcontributiondirectdb)
//get user trip performance metrics
router.get("/getUserTripPerformanceMetrics/:userId", userMiddleware, transactionController.getUserTripPerformanceMetrics)
//get user profile dashboard data
router.get("/getUserProfileDashboardData/:userId", userMiddleware, transactionController.getUserProfileDashboardData)
module.exports = router