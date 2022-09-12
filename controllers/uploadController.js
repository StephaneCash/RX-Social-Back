const multer = require('multer');
const UserModel = require('../models/userModel');

const uploadFile = (req, res) => {
    let Storage = multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, "../front/public/images/profil");
        },
        filename: (req, file, callback) => {

            const MIME_TYPES = {
                "image/jpg": "jpg",
                "image/png": "png",
                "image/jpeg": "jpg",
                "image/gif": "gif"
            };

            const extension = MIME_TYPES[file.mimetype];

            if (extension) {
                callback(null, file.originalname ? file.originalname : req.body.file);
            } else {
                return
            }

        }
    });

    const upload = multer({
        storage: Storage
    }).single('file');

    upload(req, res, async (err) => {
        console.log(req.file)
        if (err) {
            return res.status(500).json({ err })
        } else {
            try {
                const MIME_TYPES = {
                    "image/jpg": "jpg",
                    "image/png": "png",
                    "image/jpeg": "jpg",
                    "image/gif": "gif"
                };

                const extension = MIME_TYPES[req.file.mimetype];

                if (extension) {
                    await UserModel.findByIdAndUpdate(
                        req.body.userId,
                        { $set: { picture: "./images/profil/" + req.file.originalname } },
                        { new: true, upsert: true, setDefaultsOnInsert: true }
                    )
                        .then(response => {
                            res.status(201).json({ message: "Image bien téléchargée", response });
                        })
                        .catch(error => {
                            return res.status(500).json({ err: error });
                        })
                } else {
                    return res.status(400).json({ error: "Format non pris en charge" });
                }
            }
            catch (errors) {
                return res.status(500).json({ error: errors });
            }
        }
    });
};

module.exports = {
    uploadFile
}