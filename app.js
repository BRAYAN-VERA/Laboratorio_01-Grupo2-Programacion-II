const express = require ('express')
const mongoose = require('mongoose')
const app = express ()

const PORT = 5600   // SERVER PORT

const DB_USER = 'test'
const DB_PASSWORD = 'test'

app.use(express.json())


const people = require('./datos/people')
app.use('/api/personas/general', people)

const age = require('./datos/age')
app.use('/api/personas/edad', age)

const apellidos = require('./datos/Apellidos')
app.use('/api/personas/apellidos', apellidos)

const dni = require('./datos/dni')
app.use('/api/personas/DNI', dni)

const nombre = require('./datos/nombre')
app.use('/api/personas/nombre', nombre)


const id = require('./datos/id')
app.use('/api/personas/id', id)



app.all('*', (req,res) => {
    res.status(404).send('Direccion no encontrada')
})


mongoose.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@labcluster.0s2vqmw.mongodb.net/DATA_PROYECT?retryWrites=true&w=majority`
    ).then(() => {
        console.log('Conectado al MONGODB')
        app.listen(PORT, () => console.log(`Server esta en el puerto ${PORT}...`))
    })
    .catch((err) => {
        console.log(err)
    })
