const multer = require('multer');
const UserModel = require('../models/userModel');

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif"
};

const nameFile = {}

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images/profil");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        nameFile.name = name;
        callback(null, Date.now() + name);
    }
});

console.log(nameFile)

module.exports = multer({ storage }).single("file");