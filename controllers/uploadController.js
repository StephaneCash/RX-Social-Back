const multer = require('multer');
const UserModel = require('../models/userModel');

const uploadFile = (req, res) => {
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

    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ err })
        } else {
            try {
                await UserModel.findByIdAndUpdate(
                    req.body.userId,
                    { $set: { picture: "../images/profil/" + Date.now() + req.file.originalname.split(" ").join("_") } },
                    { new: true, upsert: true, setDefaultsOnInsert: true }
                )
                    .then(response => {
                        res.status(201).json({ message: "Image bien téléchargée", response });
                    })
                    .catch(error => {
                        return res.status(500).json(error);
                    })
            }
            catch (errors) {
                return res.status(500).json(errors);
            }
        }
    });
};

module.exports = {
    uploadFile
}