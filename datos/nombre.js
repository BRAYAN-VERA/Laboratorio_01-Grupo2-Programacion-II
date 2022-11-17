const express = require('express')
const router_1 = express.Router()
const Person = require('../model/Person')

// muestra en la ruta principal todos los nombres de las personas
router_1.get('/', async(req, res) => {
    try {
        const simple_nombre = await Person.find({}, {_id: 1, name: 1})
        res.status(200).json({success: true ,simple_nombre})
    } catch (error) {
        res.status(500).json({success: false , error:error })
    }
})

// muestra el nombre segun el ID
router_1.get('/:nameID', async (req, res) => {
    const nameID = req.params.nameID
    try {
        const person = await Person.findOne({_id: nameID})
        if (!person) {
            res.status(422).json({success: false ,msg: `No hay persona con id: ${nameID}`})
            return
        }
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

// muestra si hay personas con un nombre en especifico
router_1.get('/buscar/:nombre', async (req, res) => {
    const nombre = req.params.nombre
    if (isNaN(Number(nombre)) === false) {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo string'})
    }
    try {
        const person1 = await Person.findOne({name: nombre})
        if (!person1) {
            res.status(422).json({success: false ,msg: `No hay usuarios con el nombre: ${nombre}`})
            return
        }
        const person = await Person.find({name: nombre})
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

// actualiza el nombre de una persona segun el id
router_1.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {name} = req.body
    const person = {
        name,
    }
    if (typeof name !== "string") {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo string'})
    }
    try {
        const updatePerson = await Person.updateOne({_id: id}, person)
        if (updatePerson.matchedCount === 0) {
            res.status(422).json({success: false ,msg: `No hay persona con id: ${id}`})
            return
        }
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false ,error: error})
    }
})

// elimina una persona segun el ID
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
