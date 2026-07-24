// const Transaction = require("../model/transactions");
// const User = require("../model/users");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const mongoose = require('mongoose');

// // Simple fallback split calculation helper if ExpenseService is not defined
// const calculateEqualSplitHelper = (amount, participants) => {
//   if (!participants || participants.length === 0) return [];
//   const share = Number((amount / participants.length).toFixed(2));
//   return participants.map(userId => ({ user: userId, share }));
// };

// // 1. Create a new transaction (Offline testing method / fallback)
// const createTransaction = async (req, res, next) => {
//   try {
//     const {
//       trip, amount, description, category,
//       participants, splitType = "equal", customSplits,
//       receiptUrl, notes
//     } = req.body;
//     console.log("body in trip creation:", req.body);

//     const paidBy = req.userId; // Provided via your userMiddleware

//     // Validate mandatory fields matching your strict schema definitions
//     if (!trip || !amount) {
//       return res.status(400).json({ message: "Missing required fields or participants list." });
//     }

//     let splitDetails = [];

//     if (splitType === "equal") {
//       splitDetails = calculateEqualSplitHelper(amount, participants);
//     } else if (splitType === "custom" && customSplits) {
//       // Structure expected: customSplits = [{ user: "id", share: 50 }, ...]
//       splitDetails = customSplits;
//     } else {
//       splitDetails = calculateEqualSplitHelper(amount, participants);
//     }

//     const transaction = new Transaction({
//       trip,
//       paidBy,
//       type: "expense", // Assuming a default type; adjust as needed
//       amount: parseFloat(amount),
//       description,
//       category: category ? category.toLowerCase() : "other",
//       participants,
//       splitType,
//       splitDetails,
//       receiptUrl: receiptUrl || null,
//       notes: notes || ""
//     });

//     await transaction.save();
//     return res.status(201).json(transaction);
//   } catch (err) {
//     next(err);
//   }
// };
// const createcontributiondirectdb = async (req, res, next) => {
//   try {
//     const {
//       trip,
//       amount,
//       description,
//       category, // 💡 FIX 1: You forgot to pull category out of req.body here!
//       receiptUrl,
//       notes
//     } = req.body;

//     console.log("body in contribution creation:", req.body);

//     const paidBy = req.userId;

//     // Validate mandatory fields
//     if (!trip || !amount) {
//       return res.status(400).json({ message: "Missing required fields: trip or amount." });
//     }

//     const transaction = new Transaction({
//       trip,
//       paidBy,
//       type: "contribution",
//       amount: parseFloat(amount),
//       description: description || "Group Contribution Pool",
//       category: category ? category.toLowerCase() : "other", // This won't crash anymore
//       participants: [],
//       splitType: "equal",
//       splitDetails: [],
//       receiptUrl: receiptUrl || null,
//       notes: notes || ""
//     });

//     await transaction.save();
//     return res.status(201).json(transaction);
//   } catch (err) {
//     next(err); // Forwards any remaining execution errors out cleanly
//   }
// };

// // 2. Get all transactions - Properly populating 'paidBy' field from schema
// const getAllTransactions = async (req, res) => {
//   try {
//     const transactions = await Transaction.find({ isDeleted: false })
//       .populate("paidBy", "name email role")
//       .populate("participants", "name email");
//     res.json(transactions);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error while fetching transactions" });
//   }
// };



// // 3. Get single transaction by ID or filter by dynamic paidBy parameter
// const getTransactionById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const transaction = await Transaction.findById(id)
//       .populate("paidBy", "name email")
//       .populate("participants", "name email");

//     if (!transaction || transaction.isDeleted) {
//       return res.status(404).json({ message: "Transaction not found" });
//     }
//     res.json(transaction);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error fetching single transaction" });
//   }
// };

// // 4. Calculations matching the updated Schema parameters
// const allcalculations = async (req, res) => {
//   try {
//     const result = await Transaction.aggregate([
//       { $match: { isDeleted: false } },
//       {
//         $group: {
//           _id: null,
//           totalAmountSpent: { $sum: "$amount" },
//           transactionCount: { $sum: 1 }
//         }
//       }
//     ]);

//     const userCount = await User.countDocuments();

//     const totalSpent = result[0]?.totalAmountSpent || 0;
//     const data = {
//       totalTripExpense: totalSpent,
//       averagePerUserWallet: userCount > 0 ? Number((totalSpent / userCount).toFixed(2)) : 0,
//       totalUsersCount: userCount,
//       totalTransactionsRecorded: result[0]?.transactionCount || 0
//     };

//     return res.status(200).json(data);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Server error at transaction calculations" });
//   }
// };

// // 5. Safely updates transactional parameters based on schema keys
// const Editpayment = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { amount, description, category } = req.body;

//     const updatedTransaction = await Transaction.findByIdAndUpdate(
//       id,
//       {
//         ...(amount && { amount: parseFloat(amount) }),
//         ...(description && { description }),
//         ...(category && { category: category.toLowerCase() })
//       },
//       { new: true }
//     );

//     if (!updatedTransaction) {
//       return res.status(404).json({ message: "Transaction target reference missing." });
//     }

//     res.status(200).json(updatedTransaction);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error while editing transaction entry" });
//   }
// };

// // 6. Stripe Checkout Session Integration with custom metadata mapping
// const paymentWithStripe = async (req, res) => {
//   console.log("paymentWithStripe triggered:", req.body);
//   const { amount, tripId, description, category, participants } = req.body;

//   try {
//     if (!amount || !tripId) {
//       return res.status(400).json({ message: "Amount and trip identity parameters are required." });
//     }

//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price_data: {
//             currency: "inr",
//             product_data: {
//               name: description || "Trip Group Shared Payment",
//               description: `Category: ${category || 'other'}`
//             },
//             unit_amount: Math.round(Number(amount) * 100), // convert rupees to cents safely
//           },
//           quantity: 1,
//         },
//       ],
//       mode: "payment",
//       // Stashing matching context directly into metadata for post-checkout processing hook
//       metadata: {
//         tripId,
//         description: description || "Stripe Online Payment",
//         category: category || "other",
//         participants: JSON.stringify(participants || [])
//       },
//       success_url: "https://savings-vnq5.vercel.app/success?session_id={CHECKOUT_SESSION_ID}",
//       cancel_url: "https://savings-vnq5.vercel.app/cancel",
//     });

//     res.status(200).json({ url: session.url });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error while creating Stripe session" });
//   }
// };
// const getTripTotalExpenseAmount = async (req, res) => {
//   try {
//     const { tripId } = req.params;

//     const result = await Transaction.aggregate([
//       {
//         $match: {
//           trip: new mongoose.Types.ObjectId(tripId),
//           isDeleted: false
//         }
//       },
//       {
//         $facet: {
//           // Total Expenses
//           expenses: [
//             { $match: { type: "expense" } },
//             {
//               $group: {
//                 _id: null,
//                 totalAmount: { $sum: "$amount" }
//               }
//             }
//           ],

//           // Total Contributions
//           contributions: [
//             { $match: { type: "contribution" } },
//             {
//               $group: {
//                 _id: null,
//                 totalAmount: { $sum: "$amount" }
//               }
//             }
//           ],

//           // Contribution amount paid by each member
//           memberContributions: [
//             {
//               $match: {
//                 type: "contribution",
//                 paidBy: { $ne: null }
//               }
//             },
//             {
//               $group: {
//                 _id: "$paidBy",
//                 contribution: { $sum: "$amount" }
//               }
//             }
//           ],

//           // Expense amount paid by each member
//           memberExpenses: [
//             {
//               $match: {
//                 type: "expense",
//                 paidBy: { $ne: null }
//               }
//             },
//             {
//               $group: {
//                 _id: "$paidBy",
//                 expensePaid: { $sum: "$amount" }
//               }
//             }
//           ],

//           // Total split amount assigned to each member
//           memberSplits: [
//             {
//               $match: {
//                 type: "expense"
//               }
//             },
//             {
//               $unwind: "$splitDetails"
//             },
//             {
//               $match: {
//                 "splitDetails.user": { $ne: null }
//               }
//             },
//             {
//               $group: {
//                 _id: "$splitDetails.user",
//                 splitAmount: {
//                   $sum: "$splitDetails.share"
//                 }
//               }
//             }
//           ]
//         }
//       }
//     ]);

//     const data = result[0] || {};

//     const totalAmount =
//       data.expenses?.[0]?.totalAmount || 0;

//     const contributionAmount =
//       data.contributions?.[0]?.totalAmount || 0;

//     const trippbalance = contributionAmount - totalAmount;

//     const contributionMap = {};
//     const expenseMap = {};
//     const splitMap = {};

//     (data.memberContributions || []).forEach(item => {
//       if (!item._id) return;
//       contributionMap[item._id.toString()] = item.contribution;
//     });

//     (data.memberExpenses || []).forEach(item => {
//       if (!item._id) return;
//       expenseMap[item._id.toString()] = item.expensePaid;
//     });

//     (data.memberSplits || []).forEach(item => {
//       if (!item._id) return;
//       splitMap[item._id.toString()] = item.splitAmount;
//     });

//     const userIds = new Set([
//       ...Object.keys(contributionMap),
//       ...Object.keys(expenseMap),
//       ...Object.keys(splitMap)
//     ]);

//     const memberBalances = [...userIds].map(userId => {
//       const contribution = contributionMap[userId] || 0;
//       const expensePaid = expenseMap[userId] || 0;
//       const splitAmount = splitMap[userId] || 0;
//       const tripBalance = contribution - expensePaid;

//       return {
//         userId,
//         contribution,
//         expensePaid,
//         splitAmount,
//         tripBalance,
//         netBalance: contribution + expensePaid - splitAmount
//       };
//     });

//     return res.status(200).json({
//       totalAmount,
//       contributionAmount,
//       memberBalances,
//       tripBalance: trippbalance
//     });

//   } catch (err) {
//     console.error("Error in getTripTotalExpenseAmount:", err);

//     return res.status(500).json({
//       message: "Server error while calculating trip details"
//     });
//   }
// };
// module.exports = {
//   createTransaction,
//   getAllTransactions,
//   getTransactionById,
//   allcalculations,
//   Editpayment,
//   paymentWithStripe,
//   getTripTotalExpenseAmount,
//   createcontributiondirectdb
// };
const Transaction = require("../model/transactions");
const User = require("../model/users");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const mongoose = require('mongoose');

const calculateEqualSplitHelper = (amount, participants = []) => {
  if (participants.length === 0) return [];

  const total = parseFloat(amount);
  const baseShare = Math.floor((total / participants.length) * 100) / 100;
  let remaining = total;

  return participants.map((userId, index) => {
    const share =
      index === participants.length - 1
        ? Number(remaining.toFixed(2))
        : baseShare;

    remaining -= share;

    return {
      user: userId,
      share
    };
  });
};

// Create Transaction (Expense / Contribution)
const createTransaction = async (req, res, next) => {
  try {
    const {
      trip,
      amount,
      description,
      category,
      participants = [],
      splitType = "equal",
      customSplits = [],
      receiptUrl,
      notes,
      type = "expense"
    } = req.body;

    const paidBy = req.userId;

    if (!trip || !amount) {
      return res.status(400).json({
        message: "Trip and amount are required."
      });
    }

    let splitDetails = [];

    // Split calculation is only needed for expenses
    if (type === "expense") {
      if (splitType === "equal") {
        splitDetails = calculateEqualSplitHelper(amount, participants);
      } else if (splitType === "custom") {
        const totalCustomShare = customSplits.reduce(
          (sum, item) => sum + Number(item.share || 0),
          0
        );

        if (Math.abs(totalCustomShare - Number(amount)) > 0.01) {
          return res.status(400).json({
            message: "Custom split total must equal the expense amount."
          });
        }

        splitDetails = customSplits;
      }
    }

    const transaction = await Transaction.create({
      trip,
      paidBy,
      type,
      amount: Number(amount),
      description:
        description ||
        (type === "contribution"
          ? "Group Contribution Pool"
          : "Trip Expense"),
      category: category?.toLowerCase() || "other",
      participants: type === "expense" ? participants : [],
      splitType: type === "expense" ? splitType : null,
      splitDetails,
      receiptUrl: receiptUrl || null,
      notes: notes || ""
    });

    return res.status(201).json(transaction);
  } catch (err) {
    next(err);
  }
};

// Create Expense
const createExpense = (req, res, next) => {
  req.body.type = "expense";
  return createTransaction(req, res, next);
};

// Create Contribution
const createcontributiondirectdb = (req, res, next) => {
  req.body.type = "contribution";
  return createTransaction(req, res, next);
};

// 2. Get all transactions
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

// 3. Get single transaction by ID
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

// 4. Calculations
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

// 5. Edit Transaction Parameters
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

// 6. Stripe Checkout Session Integration supporting both configuration workflows
const paymentWithStripe = async (req, res) => {
  console.log("paymentWithStripe triggered:", req.body);
  const { amount, tripId, description, category, participants, type = "expense", splitType = "equal", customSplits } = req.body;

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
              name: description || (type === "contribution" ? "Trip Savings Contribution Pool" : "Trip Group Shared Expense Payment"),
              description: `Category: ${category || 'other'} (${type})`
            },
            unit_amount: Math.round(Number(amount) * 100),
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      metadata: {
        tripId,
        type,
        splitType,
        description: description || `Stripe ${type}`,
        category: category || "other",
        participants: JSON.stringify(participants || []),
        customSplits: customSplits ? JSON.stringify(customSplits) : JSON.stringify([])
      },
      success_url: "https://savings-vnq5.vercel.app/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://savings-vnq5.vercel.app/cancel",
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while creating Stripe session" });
  }
};
const getTripTotalExpenseAmount = async (req, res) => {
  try {
    const { tripId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(tripId)) {
      return res.status(400).json({ message: "Invalid system Trip Identifier provided." });
    }

    const result = await Transaction.aggregate([
      {
        $match: {
          trip: new mongoose.Types.ObjectId(tripId),
          isDeleted: false
        }
      },
      {
        $facet: {
          expenses: [
            { $match: { type: "expense" } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
          ],
          contributions: [
            { $match: { type: "contribution" } },
            { $group: { _id: null, totalAmount: { $sum: "$amount" } } }
          ],
          memberContributions: [
            { $match: { type: "contribution", paidBy: { $ne: null } } },
            { $group: { _id: "$paidBy", contribution: { $sum: "$amount" } } }
          ],
          memberExpenses: [
            { $match: { type: "expense", paidBy: { $ne: null } } },
            {
              $group: {
                _id: "$paidBy",
                expensePaid: { $sum: "$amount" },
                items: {
                  $push: {
                    description: "$description",
                    amount: "$amount",
                    createdAt: "$createdAt"
                  }
                }
              }
            }
          ],
          memberSplits: [
            { $match: { type: "expense" } },
            { $unwind: "$splitDetails" },
            { $match: { "splitDetails.user": { $ne: null } } },
            {
              $group: {
                _id: "$splitDetails.user",
                splitAmount: { $sum: "$splitDetails.share" },
                items: {
                  $push: {
                    description: "$description",
                    share: "$splitDetails.share",
                    createdAt: "$createdAt"
                  }
                }
              }
            }
          ],
          historyList: [
            { $sort: { createdAt: -1 } },
            { $limit: 30 }, // Guard block preventing excessive payload transport over networks
            {
              $lookup: {
                from: "users",
                localField: "paidBy",
                foreignField: "_id",
                as: "paidByDetails"
              }
            },
            { $unwind: { path: "$paidByDetails", preserveNullAndEmptyArrays: true } },
            {
              $project: {
                _id: 1,
                amount: 1,
                type: 1,
                description: 1,
                createdAt: 1,
                "paidBy.name": "$paidByDetails.name",
                "paidBy._id": "$paidByDetails._id"
              }
            }
          ]
        }
      }
    ]);

    const data = result[0] || {};
    const totalAmount = data.expenses?.[0]?.totalAmount || 0;
    const contributionAmount = data.contributions?.[0]?.totalAmount || 0;
    const tripBalance = contributionAmount - totalAmount;

    const contributionMap = {};
    const expenseMap = {};
    const splitMap = {};

    (data.memberContributions || []).forEach(item => {
      if (item._id) contributionMap[item._id.toString()] = { amount: item.contribution };
    });

    (data.memberExpenses || []).forEach(item => {
      if (item._id) expenseMap[item._id.toString()] = { amount: item.expensePaid, items: item.items };
    });

    (data.memberSplits || []).forEach(item => {
      if (item._id) splitMap[item._id.toString()] = { amount: item.splitAmount, items: item.items };
    });

    // Create array containing all distinct users involved in transactions
    const userIds = new Set([
      ...Object.keys(contributionMap),
      ...Object.keys(expenseMap),
      ...Object.keys(splitMap)
    ]);

    const memberBalances = [...userIds].map(userId => {
      const contribution = contributionMap[userId]?.amount || 0;
      const expensePaid = expenseMap[userId]?.amount || 0;
      const splitAmount = splitMap[userId]?.amount || 0;

      return {
        userId,
        contribution,
        expensePaid,
        splitAmount,
        tripBalance: contribution - expensePaid,
        // Formula mapping actual net cash impact for a person:
        // What they paid overall minus their personal individual liability share cost
        netBalance: (contribution + expensePaid) - splitAmount,
        paidExpensesList: expenseMap[userId]?.items || [],
        consumedSplitsList: splitMap[userId]?.items || []
      };
    });

    return res.status(200).json({
      totalAmount,
      contributionAmount,
      memberBalances,
      tripBalance,
      transactionHistory: data.historyList || []
    });

  } catch (err) {
    console.error("Aggregation Error in getTripTotalExpenseAmount:", err);
    return res.status(500).json({ message: "Server error while compiling account balances." });
  }
};
// Get aggregated trip expenses, contributions, and settlements for a specific user profile
const getUserTripPerformanceMetrics = async (req, res) => {
  try {
    const userId = req.params.id || req.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid system User Identifier." });
    }

    const targetUser = new mongoose.Types.ObjectId(userId);

    const metrics = await Transaction.aggregate([
      {
        $match: {
          isDeleted: false
        }
      },
      {
        $facet: {
          // Total pool contributions deposited by this specific user
          personalContributions: [
            { $match: { type: "contribution", paidBy: targetUser } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
          ],
          // Out-of-pocket cash advanced for group expenses by this specific user
          personalExpensesAdvanced: [
            { $match: { type: "expense", paidBy: targetUser } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
          ],
          // Individual split liability shares assigned to this user across all expenses
          personalSplitLiabilities: [
            { $match: { type: "expense" } },
            { $unwind: "$splitDetails" },
            { $match: { "splitDetails.user": targetUser } },
            { $group: { _id: null, total: { $sum: "$splitDetails.share" } } }
          ],
          // Categorized expenses to feed the Recharts Donut Pie component dynamically
          categoryBreakdown: [
            { $match: { type: "expense", participants: targetUser } },
            { $unwind: "$splitDetails" },
            { $match: { "splitDetails.user": targetUser } },
            {
              $group: {
                _id: "$category",
                value: { $sum: "$splitDetails.share" }
              }
            }
          ]
        }
      }
    ]);

    const data = metrics[0] || {};
    const totalContributions = data.personalContributions?.[0]?.total || 0;
    const totalAdvanced = data.personalExpensesAdvanced?.[0]?.total || 0;
    const totalOwedShare = data.personalSplitLiabilities?.[0]?.total || 0;

    // Total cash physically spent out of their wallet
    const overallInvested = totalContributions + totalAdvanced;
    // Net status formula: (Pool Contributions + Expenses Advanced) - Target Split Liability
    const netBalanceStatus = overallInvested - totalOwedShare;

    // Format the category breakdown list for Recharts
    const chartData = (data.categoryBreakdown || []).map(item => ({
      name: item._id ? item._id.charAt(0).toUpperCase() + item._id.slice(1) : "Other",
      value: Number(item.value.toFixed(2))
    }));

    // Fallback static structural values if no specific categories are hit yet
    const structuredChart = chartData.length > 0 ? chartData : [
      { name: "No Liabilities Assigned", value: 0 }
    ];

    return res.status(200).json({
      walletBalance: totalContributions, // Total accumulated savings pool
      totalTripExpensesAdvanced: totalAdvanced,
      totalOwedLiabilityShare: totalOwedShare,
      netBalanceStatus,
      overallInvested,
      categoryChartData: structuredChart
    });

  } catch (err) {
    console.error("Profile Aggregation Engine Error:", err);
    return res.status(500).json({ message: "Server error compiling profile dashboard statistics." });
  }
};

// Remember to append this function to your module.exports exports block!
// Fetch all transaction metrics and itemized history log for a specific user profile
const getUserProfileDashboardData = async (req, res) => {
  try {
    const userId = req.params.id || req.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid system User Identifier." });
    }

    const targetUser = new mongoose.Types.ObjectId(userId);

    // 1. Compile Aggregated Metrics (Using your working logic)
    const metrics = await Transaction.aggregate([
      { $match: { isDeleted: false } },
      {
        $facet: {
          personalContributions: [
            { $match: { type: "contribution", paidBy: targetUser } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
          ],
          personalExpensesAdvanced: [
            { $match: { type: "expense", paidBy: targetUser } },
            { $group: { _id: null, total: { $sum: "$amount" } } }
          ],
          personalSplitLiabilities: [
            { $match: { type: "expense" } },
            { $unwind: "$splitDetails" },
            { $match: { "splitDetails.user": targetUser } },
            { $group: { _id: null, total: { $sum: "$splitDetails.share" } } }
          ]
        }
      }
    ]);

    const data = metrics[0] || {};
    const totalContributions = data.personalContributions?.[0]?.total || 0;
    const totalAdvanced = data.personalExpensesAdvanced?.[0]?.total || 0;
    const totalOwedShare = data.personalSplitLiabilities?.[0]?.total || 0;

    // Net status formula: (Pool Contributions + Expenses Advanced) - Target Split Liability
    const netBalanceStatus = (totalContributions + totalAdvanced) - totalOwedShare;

    // 2. Fetch Individual Transaction Logs involving this user
    const historyLogs = await Transaction.find({
      isDeleted: false,
      $or: [
        { paidBy: targetUser },
        { participants: targetUser },
        { "splitDetails.user": targetUser }
      ]
    })
      .sort({ createdAt: -1 })
      .lean();

    return res.status(200).json({
      walletBalance: totalContributions,
      expensePaid: totalAdvanced,
      splitAmount: totalOwedShare,
      netBalance: netBalanceStatus,
      surplus: netBalanceStatus > 0 ? netBalanceStatus : 0,
      deficit: netBalanceStatus < 0 ? Math.abs(netBalanceStatus) : 0,
      historyLogs
    });

  } catch (err) {
    console.error("Dashboard Engine Error:", err);
    return res.status(500).json({ message: "Server error compiling dashboard details." });
  }
};

// Remember to append 'getUserProfileDashboardData' to your module.exports block!

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  getUserProfileDashboardData,
  allcalculations,
  Editpayment,
  paymentWithStripe,
  getTripTotalExpenseAmount,
  createcontributiondirectdb,
  getUserTripPerformanceMetrics
};