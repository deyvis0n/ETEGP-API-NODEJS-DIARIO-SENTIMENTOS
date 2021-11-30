const express = require('express')
const cors = require('cors')
const app = express()

require('dotenv-safe').config()

var corsOptions = {
    origin: process.env.ORIGIN_URL
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const db = require('./app/data/database')
db.connect()

app.get('/', (req, res) => {
    res.send({ message: 'API funcionando sem problemas.' })
})

require('./app/routes/auth.routes')(app)
require('./app/routes/user.routes')(app)

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`)
})