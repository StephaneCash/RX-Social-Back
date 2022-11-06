const messageModel = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const { from, to, message } = req.body;
        const data = await messageModel.create({
            message: { text: message, },
            users: [from, to],
            sender: from,
        });
        if (data) {
            res.status(201).json({ message: "Message envoyé avec succès" })
        } else {
            return res.status(400).json({ message: "Message non envoyé" });
        }
    } catch (error) {
        return res.status(500).json({ errors: error })
    }
};
module.exports.getAllMessage = async (req, res, next) => {
    try {

    } catch (err) {

    }
};
