// const Transaction = require("../model/transactions");
// const User = require("../model/users");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// //create a new transaction
// const createTransaction = async (req, res, next) => {
//   try {
//     const {
//       trip, amount, description, category,
//       participants, splitType = "equal", customSplits,
//       receiptUrl, notes
//     } = req.body;

//     const paidBy = req.userId;

//     // 1. Validate mandatory input values
//     if (!trip || !amount || !description || !participants?.length) {
//       return res.status(400).json({ message: "Missing required fields or participants list." });
//     }

//     // 2. Delegate splitting logic to Service layer
//     let splitDetails = [];

//     if (splitType === "equal") {
//       splitDetails = ExpenseService.calculateEqualSplit(amount, participants);
//     } else if (splitType === "custom") {
//       try {
//         splitDetails = ExpenseService.validateAndFormatCustomSplit(amount, participants, customSplits);
//       } catch (validationError) {
//         return res.status(400).json({ message: validationError.message });
//       }
//     }

//     // 3. Persist to Database
//     const transaction = new Transaction({
//       trip,
//       paidBy,
//       amount,
//       description,
//       category: category ? category.toLowerCase() : "other",
//       participants,
//       splitType,
//       splitDetails,
//       receiptUrl,
//       notes
//     });

//     await transaction.save();

//     return res.status(201).json(transaction);
//   } catch (err) {
//     // Forward the unexpected error to your centralized Express error handling middleware
//     next(err);
//   }
// };
// // get all transactions, populate the user reference
// const getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find().populate("userid", "name email role");
//     res.json(transactions);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };
// //get a single transaction by id with populated user
// const getTransactionById = async (req, res) => {
//   const userid = req.params.id
//   try {
//     const transaction = await Transaction.find({ userid });
//     console.log(transaction)
//     if (!transaction) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }
//     res.json(transaction);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// const allcalculations = async (req, res) => {
//   try {
//     const result = await Transaction.aggregate([
//       {
//         $group: {
//           _id: null,
//           weeklypaymenttotal: {
//             $sum: "$weeklypayment"
//           },
//           weeklypaymentfinetotal: {
//             $sum: "$weeklypaymentfine"
//           },
//           lonefinetotal: {
//             $sum: "$lonefine"
//           }
//         }
//       }
//     ]);
//     const count = await User.countDocuments();
//     console.log(count);
//     const data = {
//       weeklypaymenttotal: result[0]?.weeklypaymenttotal || 0,
//       weeklypaymentfinetotal: result[0]?.weeklypaymentfinetotal || 0,
//       lonefinetotal: result[0]?.lonefinetotal || 0,
//       total: result[0]?.lonefinetotal + result[0]?.weeklypaymentfinetotal + result[0]?.weeklypaymenttotal || 0,
//       wallet: (result[0]?.lonefinetotal + result[0]?.weeklypaymentfinetotal + result[0]?.weeklypaymenttotal || 0) / count,
//       totaluser: count
//     }
//     return res.status(201).json(data);

//   }
//   catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error  at allcalculations" });
//   }
// };

// const Editpayment = async (req, res) => {
//   try {
//     const id = req.body.paymentid
//     const User_and_paymentData = req.body
//     const update = await Transaction.findByIdAndUpdate(id, {
//       weeklypayment: User_and_paymentData.weeklypayment
//     })

//     console.log(id)
//     res.status(200).json(update)
//   }
//   catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "server erro while edit payment" })
//   }
// }
// //payment with stripe

// // const paymentWithStripe = async (req, res) => {
// //   const { amount, paymentMethodId } = req.body;
// //   const paymentIntent = await stripe.paymentIntents.create({
// //     amount: amount * 100, // amount in cents
// //     currency: "inr",
// //     payment_method: paymentMethodId,
// //     confirm: true,
// //   });
// //   res.send(paymentIntent);
// // };
// // const paymentWithStripe = async (req, res) => {
// //   const { amount } = req.body;
// //   // const paymentIntent = await stripe.paymentIntents.create({
// //   //   amount: amount * 100,
// //   //   currency: "inr",
// //   // });
// //   try {
// //     const session = await stripe.checkout.sessions.create({
// //       amount: amount * 100,
// //       currency: "inr",
// //     });
// //     // res.json({
// //     //   clientSecret: paymentIntent.client_secret,
// //     // });
// //     res.json({ url: session.url });
// //   }
// //   catch (err) {
// //     console.error(err)
// //     res.status(500).json({ message: "Server error while creating Stripe session" });
// //   }
// // };
// const paymentWithStripe = async (req, res) => {
//   console.log("paymentWithStripe called with body:", req.body);
//   const { amount } = req.body;
//   try {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: "Custom Payment", // Just a simple label for the user's screen
//             },
//             unit_amount: amount * 100,
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       // Notice the ?session_id= added below!
//       success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
//       cancel_url: "http://localhost:3000/cancel",
//     });
//     res.json({ url: session.url });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error while creating Stripe session" });
//   }
// };
// module.exports = { createTransaction, getAllTransactions, getTransactionById, allcalculations, Editpayment, paymentWithStripe };
const Transaction = require("../model/transactions");
const User = require("../model/users");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Simple fallback split calculation helper if ExpenseService is not defined
const calculateEqualSplitHelper = (amount, participants) => {
  if (!participants || participants.length === 0) return [];
  const share = Number((amount / participants.length).toFixed(2));
  return participants.map(userId => ({ user: userId, share }));
};

// 1. Create a new transaction (Offline testing method / fallback)
const createTransaction = async (req, res, next) => {
  try {
    const {
      trip, amount, description, category,
      participants, splitType = "equal", customSplits,
      receiptUrl, notes
    } = req.body;
    console.log("body in trip creation:", req.body);

    const paidBy = req.userId; // Provided via your userMiddleware

    // Validate mandatory fields matching your strict schema definitions
    if (!trip || !amount) {
      return res.status(400).json({ message: "Missing required fields or participants list." });
    }

    let splitDetails = [];

    if (splitType === "equal") {
      splitDetails = calculateEqualSplitHelper(amount, participants);
    } else if (splitType === "custom" && customSplits) {
      // Structure expected: customSplits = [{ user: "id", share: 50 }, ...]
      splitDetails = customSplits;
    } else {
      splitDetails = calculateEqualSplitHelper(amount, participants);
    }

    const transaction = new Transaction({
      trip,
      paidBy,
      amount: parseFloat(amount),
      description,
      category: category ? category.toLowerCase() : "other",
      participants,
      splitType,
      splitDetails,
      receiptUrl: receiptUrl || null,
      notes: notes || ""
    });

    await transaction.save();
    return res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};

// 2. Get all transactions - Properly populating 'paidBy' field from schema
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ isDeleted: false })
      .populate("paidBy", "name email role")
      .populate("participants", "name email");
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching transactions" });
  }
};

// 3. Get single transaction by ID or filter by dynamic paidBy parameter
const getTransactionById = async (req, res) => {
  const { id } = req.params;
  try {
    const transaction = await Transaction.findById(id)
      .populate("paidBy", "name email")
      .populate("participants", "name email");

    if (!transaction || transaction.isDeleted) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching single transaction" });
  }
};

// 4. Calculations matching the updated Schema parameters
const allcalculations = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $group: {
          _id: null,
          totalAmountSpent: { $sum: "$amount" },
          transactionCount: { $sum: 1 }
        }
      }
    ]);

    const userCount = await User.countDocuments();

    const totalSpent = result[0]?.totalAmountSpent || 0;
    const data = {
      totalTripExpense: totalSpent,
      averagePerUserWallet: userCount > 0 ? Number((totalSpent / userCount).toFixed(2)) : 0,
      totalUsersCount: userCount,
      totalTransactionsRecorded: result[0]?.transactionCount || 0
    };

    return res.status(200).json(data);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error at transaction calculations" });
  }
};

// 5. Safely updates transactional parameters based on schema keys
const Editpayment = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, description, category } = req.body;

    const updatedTransaction = await Transaction.findByIdAndUpdate(
      id,
      {
        ...(amount && { amount: parseFloat(amount) }),
        ...(description && { description }),
        ...(category && { category: category.toLowerCase() })
      },
      { new: true }
    );

    if (!updatedTransaction) {
      return res.status(404).json({ message: "Transaction target reference missing." });
    }

    res.status(200).json(updatedTransaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while editing transaction entry" });
  }
};

// 6. Stripe Checkout Session Integration with custom metadata mapping
const paymentWithStripe = async (req, res) => {
  console.log("paymentWithStripe triggered:", req.body);
  const { amount, tripId, description, category, participants } = req.body;

  try {
    if (!amount || !tripId) {
      return res.status(400).json({ message: "Amount and trip identity parameters are required." });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: description || "Trip Group Shared Payment",
              description: `Category: ${category || 'other'}`
            },
            unit_amount: Math.round(Number(amount) * 100), // convert rupees to cents safely
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Stashing matching context directly into metadata for post-checkout processing hook
      metadata: {
        tripId,
        description: description || "Stripe Online Payment",
        category: category || "other",
        participants: JSON.stringify(participants || [])
      },
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while creating Stripe session" });
  }
};

const getTripTotalAmount = async (req, res) => {
  try {
    const { tripId } = req.params;

    const result = await Transaction.aggregate([
      {
        $match: {
          // Uses the model's base mongoose instance directly
          trip: new Transaction.base.Types.ObjectId(tripId),
          isDeleted: false
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: "$amount" }
        }
      }
    ]);

    const totalAmount = result[0]?.totalAmount || 0;
    return res.status(200).json({ totalAmount });
  } catch (err) {
    console.error("Error in getTripTotalAmount:", err);
    return res.status(500).json({ message: "Server error while calculating trip total" });
  }
};

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  allcalculations,
  Editpayment,
  paymentWithStripe,
  getTripTotalAmount
};