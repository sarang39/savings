const mongoose = require('mongoose');
const tripDetailsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    destination: {
        type: String,
        required: true
    },
    leader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },

            status: {
                type: String,
                enum: ["pending", "approved", "rejected"],
                default: "pending"
            }
        }
    ],
    date: {
        type: Date,
        required: true
    },
    budget: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    inviteCode: {
        type: String,
        required: true,
        default: "test"
    }

});
module.exports = mongoose.model('tripdetails', tripDetailsSchema);