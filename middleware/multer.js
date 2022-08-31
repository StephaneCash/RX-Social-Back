const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(" ").json("_");
        const extension = MIME_TYPE[file.mimetype];

        callback(null, name + '_' + Date.now() + extension);
    }
})

module.exports = multer();