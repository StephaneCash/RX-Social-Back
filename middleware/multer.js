const multer = require('multer');

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif"
};

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images/profil");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").join("_");
        
        callback(null, Date.now() + name);
    }
});

module.exports = multer({ storage }).single("file");