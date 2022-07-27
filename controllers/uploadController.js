const UserModel = require('../models/userModel');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const errorsUtiles = require('../utils/errorsUtiles');

module.exports.uploadProfil = async (req, res) => {
    try {
        if (
            req.file.detectedMimeType !== "image/jpg" &&
            req.file.detectedMimeType !== "image/png" &&
            req.file.detectedMimeType !== "image/jpeg"
        )
            throw Error("invalid file");

        if (req.file.size > 1000000) throw Error('max size');
    } catch (err) {
        const errors = errorsUtiles.uploadErrors(err);
        const file = req.file;
        return res.status(400).json({ errors });
    }

    const fileName = req.body.name + ".jpg";

    await pipeline(
        req.file.stream,
        fs.createWriteStream(
            `${__dirname}/../client/public/uploads/profil/${fileName}`
        )
    );
};