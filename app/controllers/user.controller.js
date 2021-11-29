const db = require('../models')
const UserPost = db.userPost
const User = db.user

exports.allAccess = (req, res) => {
    res.status(200).send('Conteudo Publico')
}

exports.userPost = (req, res) => {
    const userPost = new UserPost({
        user: req.userId,
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
    userValue = (await UserPost.find({ 'user': req.userId }).select(['user', 'userMessage','createOn'])).reverse()

    res.status(200).send(userValue)
}