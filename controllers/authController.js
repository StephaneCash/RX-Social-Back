const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({ id }, process.env.TOKEN_SECRET, { expiresIn: maxAge })
}

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
  
const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.login(email, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge });
        res.status(200).json({ "message ": 'Utilisateur connecté avec succès', user: user._id })
    } catch (err) {
        return res.status(500).json({ err: 'Email ou Password incorrect' });
    }
} 

const deconnexion = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    return res.json({ Logout: true })
} 

module.exports = {
    signUp,
    signIn,
    deconnexion
}    