const mongoose = require('mongoose')

const Person = mongoose.model('Person', {
    name: String,
    surname: String,
    DNI: Number,
    age: Number,
})



module.exports = Person