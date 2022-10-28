const express = require ('express')
const app = express ()

//let {people} = require ('./data')
app.use(express.json())  //required


const people = require('./datos/people')
app.use('/api/personas/general', people)


const id = require('./datos/id')
app.use('/api/personas/id', id)

const nombre = require('./datos/nombre')
app.use('/api/personas/nombre', nombre)

const apellidos = require('./datos/Apellidos')
app.use('/api/personas/apellidos', apellidos)

const dni = require('./datos/dni')
app.use('/api/personas/dni', dni)

const age = require('./datos/age')
app.use('/api/personas/edad', age)


app.listen(5600, () => {
    console.log('Server esta en el puerto 5600...')
})