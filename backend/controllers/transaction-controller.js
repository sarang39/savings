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
//edit payment
// const Editpayment = async (req, res) => {
//   const transactionid = req.params.id
//   const newdata = req.body.data
//   try {
//     const transaction = await Transaction.findOneAndUpdate(transactionid,
//       { $set: newdata },         // update
//       { new: true }              // return updated doc
//     );

//     console.log(transaction)
//     if (!transaction) {
//       return res.status(200).json({ message: "Transaction not found" });
//     }
//     res.json(transaction);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }

// }
const Editpayment = async (req, res) => {
  try {
    const id = req.params.id
    const User_and_paymentData = req.body
    const update = await Transaction.findByIdAndUpdate(id, {
      weeklypayment: User_and_paymentData.weeklypayment
    })

    console.log(id)
    res.status(200).json(update)
  }
  catch (err) {
    console.error(err)
    res.status(500).json({ message: "server erro while edit payment" })
  }
}
module.exports = { createTransaction, getAllTransactions, getTransactionById, allcalculations, Editpayment };
