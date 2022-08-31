const multer = require('multer');

const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif"
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").json("_");
        const extension = MIME_TYPES[file.mimetype];

        callback(null, name + '_' + Date.now() + extension);
    }
})

module.exports = multer({ storage }).single("image");