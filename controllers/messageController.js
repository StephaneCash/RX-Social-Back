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
        return res.status(500).json({ errors: error });
    }
};
module.exports.getAllMessage = async (req, res, next) => {
    try {
        const { from, to } = req.body;

        const messages = await messageModel.find({
            users: {
                $all: [from, to]
            },
        }).sort({ updatedAt: 1 });

        const messagesProject = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text
            };
        });
        res.status(200).json(messagesProject);
    } catch (err) {
        return res.status(500).json({ errors: err });
    }
};
