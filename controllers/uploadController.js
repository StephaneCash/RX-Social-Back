const multer = require('multer');
const UserModel = require('../models/userModel');

module.exports.uploadFile = async (req, res) => {

    let Storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "images/profil");
        },
        filename: (req, file, callback) => {
            const name = file.originalname.split(" ").join("_");
            callback(null, Date.now() + name);
        }
    });

    const upload = multer({
        storage: Storage
    }).single('file');

    upload(req, res, (err) => {
        if (err) {
            return res.status(500).json({ err })
        } else {
            res.status(201).json({ message: "Image bien téléchargée" })
        }
    })
}