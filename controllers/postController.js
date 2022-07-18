const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
const ObjectID = require('mongoose').Types.ObjectId;

const readPost = (req, res) => {
    postModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Erreur to get data : ', +err)
    })
}

const createPost = async (req, res) => {
    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = await newPost.save();
        return res.status(201).json(post)
    } catch (err) {
        return res.status(400).send(err)
    }
}

const updatePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id)
    } else {
        const updatePosted = {
            message: req.body.message,
        }
        postModel.findByIdAndUpdate(
            req.params.id,
            { $set: updatePosted },
            { new: true },
        )
            .then((docs) => { return res.status(200).send(docs) })
            .catch((err) => { return res.status(500).send({ message: err }) })
    }
}

const deletePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id)
    } else {
        postModel.findByIdAndRemove(req.params.id,)
            .then((docs) => {
                return res.status(200).send({
                    message: 'Post supprimé avec succès',
                    data: docs
                })
            })
            .catch((err) => { return res.status(500).send({ message: err }) })
    }
}

const likePost = (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id)
    } else {
        try {
            postModel.findByIdAndUpdate(req.params.id,
                { $addToSet: { likers: req.body.id } },
                { new: true }
            )
                .then((docs) => { res.status(200).send(docs) })
                .catch((err) => { return res.status(400).send({ message: err }) })

            userModel.findByIdAndUpdate(req.body.id,
                { $addToSet: { likes: req.params.id } },
                { new: true }
            )
                .then((docs) => { res.status(200).send(docs) })
                .catch((err) => { return res.status(400).send({ message: err }) })
        } catch (err) {
            return res.status(400).send({ message: err })
        }
    }
}

const unlikePost = async (req, res) => {
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).send('ID inconnu : ' + req.params.id)
    } else {

    }
}

module.exports = {
    readPost,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost
}