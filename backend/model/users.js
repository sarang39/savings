const mongoose = require('mongoose');
const Transaction = require('./transactions');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    Transaction: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Transaction
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    joined: {
        type: Date,
        default: Date.now
    },
    savings: {
        type: Number,
        default: 0
    },
    photo: {
        type: String,
        default: null

    }
});
const User = mongoose.model("user", userSchema)
module.exports = User;