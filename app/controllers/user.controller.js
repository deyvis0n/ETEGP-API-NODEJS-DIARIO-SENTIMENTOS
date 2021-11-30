const db = require('../models')
const UserPost = db.userPost
const User = db.user

exports.recentPosts = async (req, res) => {
    const allPost = await (await UserPost.find().sort({ createOn:-1 }).limit(10).select(['username', 'userMessage', 'createOn']))

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
    await UserPost.find({ 'user': req.userId }).sort({ createOn:-1 }).select(['username', 'userMessage','createOn']).then(user => {
        
        res.status(200).send(user)

    })
}

exports.userDeletePost = (req, res) => {
    UserPost.deleteOne({ _id: req.body._id }).exec((err) => {
        if (err) {
            return res.status(500).send({ message: err })
        }

        return res.status(200).send({ message: 'Postagem apagada com sucesso!'})
    })
}