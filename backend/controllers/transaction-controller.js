const Transaction = require("../model/transactions");
const User = require("../model/users");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
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
//payment with stripe

// const paymentWithStripe = async (req, res) => {
//   const { amount, paymentMethodId } = req.body;

//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: amount * 100, // amount in cents
//     currency: "inr",
//     payment_method: paymentMethodId,
//     confirm: true,
//   });

//   res.send(paymentIntent);
// };
// const paymentWithStripe = async (req, res) => {
//   const { amount } = req.body;

//   // const paymentIntent = await stripe.paymentIntents.create({
//   //   amount: amount * 100,
//   //   currency: "inr",
//   // });
//   try {
//     const session = await stripe.checkout.sessions.create({
//       amount: amount * 100,
//       currency: "inr",
//     });

//     // res.json({
//     //   clientSecret: paymentIntent.client_secret,
//     // });
//     res.json({ url: session.url });
//   }
//   catch (err) {
//     console.error(err)
//     res.status(500).json({ message: "Server error while creating Stripe session" });
//   }
// };
const paymentWithStripe = async (req, res) => {
  console.log("paymentWithStripe called with body:", req.body);
  const { amount } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: "Custom Payment", // Just a simple label for the user's screen
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      // Notice the ?session_id= added below!
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while creating Stripe session" });
  }
};
module.exports = { createTransaction, getAllTransactions, getTransactionById, allcalculations, Editpayment, paymentWithStripe };
