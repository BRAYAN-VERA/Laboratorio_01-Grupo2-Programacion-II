const express = require('express')
const router_1 = express.Router()
const Person = require('../model/Person')

// muestra en la ruta principal todas las edades de las personas
router_1.get('/', async(req, res) => {
    try {
        const simple_edad = await Person.find({}, {_id: 1, age: 1})
        res.status(200).json({success: true ,simple_edad})
    } catch (error) {
        res.status(500).json({success: false , error:error })
    }
})

// muestra la edad segun el ID
router_1.get('/:ageID', async (req, res) => {
    const ageID = req.params.ageID
    try {
        const person = await Person.findOne({_id: ageID})
        if (!person) {
            res.status(422).json({success: false ,msg: `No hay persona con id: ${id}`})
            return
        }
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})
//FILTRO DE EDAD
router_1.get('/buscar/:edad', async (req, res) => {
    const edad = Number(req.params.edad)
    if (isNaN(edad)) {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo numerico'})
    }
    try {
        const person1 = await Person.findOne({age: edad})
        if (!person1) {
            res.status(422).json({success: false ,msg: `No hay usuarios con edad: ${edad}`})
            return
        }
        const person = await Person.find({age: edad})
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

router_1.get('/buscar/mayor/:edad', async (req, res) => {
    const edad = Number(req.params.edad)
    if (isNaN(edad)) {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo numerico'})
    }
    try {
        const person1 = await Person.findOne({age: {$gt: edad}})
        if (!person1) {
            res.status(422).json({success: false ,msg: `No hay usuarios con edad mayor e igual a: ${edad}`})
            return
        }
        const person = await Person.find({age: {$gt: edad}})
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

router_1.get('/buscar/mayor_igual/:edad', async (req, res) => {
    const edad = Number(req.params.edad)
    if (isNaN(edad)) {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo numerico'})
    }
    try {
        const person1 = await Person.findOne({age: {$gte: edad}})
        if (!person1) {
            res.status(422).json({success: false ,msg: `No hay usuarios con edad mayor e igual a: ${edad}`})
            return
        }
        const person = await Person.find({age: {$gte: edad}})
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

router_1.get('/buscar/menor/:edad', async (req, res) => {
    const edad = Number(req.params.edad)
    if (isNaN(edad)) {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo numerico'})
    }
    try {
        const person1 = await Person.findOne({age: {$lt: edad}})
        if (!person1) {
            res.status(422).json({success: false ,msg: `No hay usuarios con edad menor e igual a: ${edad}`})
            return
        }
        const person = await Person.find({age: {$lt: edad}})
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

router_1.get('/buscar/menor_igual/:edad', async (req, res) => {
    const edad = Number(req.params.edad)    
    if (isNaN(edad)) {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo numerico'})
    }
    try {
        const person1 = await Person.findOne({age: {$lte: edad}})
        if (!person1) {
            res.status(422).json({success: false ,msg: `No hay usuarios con edad menor e igual a: ${edad}`})
            return
        }
        const person = await Person.find({age: {$lte: edad}})
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

// actualiza la edad de una persona segun el ID
router_1.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {age} = req.body
    const person = {
        age,
    }
    if (typeof age !== "number") {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo numerico'})
    }
    try {
        const updatePerson = await Person.updateOne({_id: id}, person)
        //console.log(updatePerson)
        if (updatePerson.matchedCount === 0) {
            res.status(422).json({success: false ,msg: `No hay persona con id: ${id}`})
            return
        }
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false ,error: error})
    }
    
})

// elimina una persona segun el id
router_1.delete('/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({ _id: id })
    if (!person) { 
        res.status(422).json({ success: false, msg: `No hay persona con id: ${id}`})
        return
    }
    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({success: true ,msg: 'Usuario removido'})
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
})


module.exports = router_1
