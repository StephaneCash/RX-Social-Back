const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
    {
        message: {
            text: {
                type: String,
                required: true
            },
        },
        users: Array,
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        },
        file: {
            type: String,
        },
        dateNow: {
            type: Number
        },
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('messages', messageSchema);