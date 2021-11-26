const mongoose = require('mongoose')
const MONGODB = process.env.MONGODB_URL

const connect = () => {
    mongoose.connect(MONGODB, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(console.log('Sucesso ao conectar-se ao MongoDB.'))
    .catch(err => {
        console.error("Erro ao conectar-se ao MongoDb", err)
    })
}

module.exports = { connect }