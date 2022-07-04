const userModel = require('../models/userModel');

const signUp = async (req, res) => {
    const { pseudo, email, password } = req.body;

    try {
        const user = await userModel.create({ pseudo, email, password });
        res.status(201).json({ user: user.id });
    }
    catch (err) {
        res.status(500).json({ err: err });
    }
} 

module.exports = {
    signUp
} 