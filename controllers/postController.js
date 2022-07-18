const postModel = require('../models/postModel');
const userModel = require('../models/userModel');
const ObjetID = require('mongoose').Types.ObjectId;

const readPost = (req, res) => {
    postModel.find((err, docs) => {
        if (!err) res.send(docs);
        else console.log('Erreur to get data : ', +err)
    })
}

const createPost = (req, res) => {
    const newPost = new postModel({
        posterId: req.body.posterId,
        message: req.body.message,
        video: req.body.video,
        likers: [],
        comments: [],
    });

    try {
        const post = newPost.save();
        return res.status(201).json(post)
    } catch (err) {
        return res.status(400).json(err)
    }
}

const updatePost = (req, res) => {

}

const deletePost = (req, res) => {

}

module.exports = {
    readPost,
    createPost,
    updatePost,
    deletePost
}