const mongoose = require('mongoose');
const transactionSchema = new mongoose.Schema({

    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Trip",
        required: true,
        index: true
    },

    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    amount: {
        type: Number,
        required: true,
        min: 0
    },

    description: {
        type: String,
        required: true,
        trim: true
    },

    category: {
        type: String,
        enum: [
            "food",
            "travel",
            "hotel",
            "fuel",
            "shopping",
            "activity",
            "other"
        ],
        default: "other"
    },

    participants: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

    splitType: {
        type: String,
        enum: ["equal", "custom"],
        default: "equal"
    },

    splitDetails: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },

        share: {
            type: Number,
            min: 0
        }
    }],

    receiptUrl: {
        type: String,
        default: null
    },

    notes: {
        type: String,
        default: ""
    },

    isDeleted: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    });
const Transaction = mongoose.model("transaction", transactionSchema)

module.exports = Transaction;


//     // store a reference to the User document so we can populate later
//     userid: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user',
//         required: true
//     },
//     date: {
//         type: Date,
//         default: Date.now
//     },
//     weeklypayment: {
//         type: Number,
//         default: 0
//     },
//     weeklypaymentfine: {
//         type: Number,
//         default: 0
//     },

//     loan: {
//         type: Number,
//         default: 0
//     },
//     loanFine: {
//         type: Number,
//         default: 0
//     }
// });