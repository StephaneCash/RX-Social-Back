const messageModel = require("../models/messageModel");

module.exports.addMessage = async (req, res, next) => {

    if (req.files) {
        try {
            const file = req.files.file;
            file.mv("../front/public/" + file.name)
            const { from, to, message } = req.body;
            const data = await messageModel.create({
                message: { text: message, },
                users: [from, to],
                sender: from,
                videoUrl: "./" + file.name
            });
            if (data) {
                res.status(201).json({ message: "Message envoyé avec succès" })
            } else {
                return res.status(400).json({ message: "Message non envoyé" });
            }
        } catch (err) {
            return res.status(500).json({ errors: err });
        }
    } else {
        try {
            const { from, to, message } = req.body;
            const data = await messageModel.create({
                message: { text: message, },
                users: [from, to],
                sender: from,
                videoUrl: ""
            });
            if (data) {
                res.status(201).json({ message: "Message envoyé avec succès" })
            } else {
                return res.status(400).json({ message: "Message non envoyé" });
            }
        } catch (err) {
            return res.status(500).json({ errors: err });
        }
    }
}

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
