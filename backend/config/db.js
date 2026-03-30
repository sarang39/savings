const mongoose = require("mongoose");

const connectDB = () => {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
        throw new Error('MONGO_URI is not defined. Set it in .env or environment variables.');
    }

    return mongoose.connect(mongoUri)
        .then(() => console.log("MongoDB connected"))
        .catch(err => {
            console.error(err);
            throw err;
        });
};

module.exports = connectDB