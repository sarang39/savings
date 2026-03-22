const Transaction = require("../model/transactions");
const User = require("../model/users");
//create a new transaction
const createTransaction = async (req, res) => {
  const { weeklypayment, loan, loanFine } = req.body;
  let weeklypaymentfine = 0
  const userid = req.userId;
  try {
    if (weeklypayment === 0) {
      weeklypaymentfine = 10
    }
    const transaction = new Transaction({
      userid,
      weeklypayment,
      weeklypaymentfine,
      loan,
      loanFine,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
// get all transactions, populate the user reference
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().populate("userid", "name email role");
    res.json(transactions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
//get a single transaction by id with populated user
const getTransactionById = async (req, res) => {
  const userid = req.params.id
  try {
    const transaction = await Transaction.find({ userid });
    console.log("id ", req.params.id)
    console.log(transaction)
    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }
    res.json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

const allcalculations = async (req, res) => {
  try {
    const result = await Transaction.aggregate([
      {
        $group: {
          _id: null,
          weeklypaymenttotal: {
            $sum: "$weeklypayment"
          },
          weeklypaymentfinetotal: {
            $sum: "$weeklypaymentfine"
          },
          lonefinetotal: {
            $sum: "$lonefine"
          }
        }
      }
    ]);
    const count = await User.countDocuments();
    console.log(count);
    const data = {
      weeklypaymenttotal: result[0]?.weeklypaymenttotal || 0,
      weeklypaymentfinetotal: result[0]?.weeklypaymentfinetotal || 0,
      lonefinetotal: result[0]?.lonefinetotal || 0,
      total: result[0]?.lonefinetotal + result[0]?.weeklypaymentfinetotal + result[0]?.weeklypaymenttotal || 0,
      wallet: (result[0]?.lonefinetotal + result[0]?.weeklypaymentfinetotal + result[0]?.weeklypaymenttotal || 0) / count

    }
    return res.status(201).json(data);

  }
  catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error  at allcalculations" });
  }
};

module.exports = { createTransaction, getAllTransactions, getTransactionById, allcalculations };















































