const db = require('../models')
const UserPost = db.userPost
const User = db.user

exports.recentPosts = async (req, res) => {
    const allPost = await (await UserPost.find().select(['username', 'userMessage', 'createOn'])).reverse()

    res.status(200).send(allPost)
}

exports.userPost = (req, res) => {
    const userPost = new UserPost({
        user: req.userId,
        username: req.body.username,
        userMessage: req.body.userMessage,
        createOn: new Date()
    })

    userPost.save((err) => {
        if(err) {
            res.status(500).send({ message: err })
            return;
        }
        res.status(201).send({ message: "Postado com sucesso!"})
    })
}

exports.userGetPost = async (req, res) => {
    const userValue = (await UserPost.find({ 'user': req.userId }).select(['username', 'userMessage','createOn'])).reverse()

    res.status(200).send(userValue)
}

exports.userDeletePost = (req, res) => {
    UserPost.deleteOne({ _id: req.body._id }).exec((err) => {
        if (err) {
            return res.status(500).send({ message: err })
        }

        return res.status(200).send({ message: 'Postagem apagada com sucesso!'})
    })
}