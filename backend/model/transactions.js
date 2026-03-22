const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({
    // store a reference to the User document so we can populate later
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    weeklypayment: {
        type: Number,
        default: 0
    },
    weeklypaymentfine: {
        type: Number,
        default: 0
    },

    loan: {
        type: Number,
        default: 0
    },
    loanFine: {
        type: Number,
        default: 0
    }
});
const Transaction = mongoose.model("transaction", transactionSchema)

module.exports = Transaction;