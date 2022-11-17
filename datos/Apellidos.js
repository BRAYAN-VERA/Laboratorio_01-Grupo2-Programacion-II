const express = require('express')
const router_1 = express.Router()
const Person = require('../model/Person')

// muestra en la ruta principal todos los apellidos de las personas
router_1.get('/', async(req, res) => {
    try {
        const simple_apellido = await Person.find({}, {_id: 1, surname: 1})
        res.status(200).json({success: true ,simple_apellido})
    } catch (error) {
        res.status(500).json({success: false , error:error })
    }
})

// muestra segun el ID el apellido de una persona
router_1.get('/:surnameID', async (req, res) => {
    const surnameID = req.params.surnameID
    try {
        const person = await Person.findOne({_id: surnameID})
        if (!person) {
            res.status(422).json({success: false ,msg: `No hay persona con id: ${surnameID}`})
            return
        }
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

// muestra si hay personas con un apellido en especifico
router_1.get('/buscar/:apellido', async (req, res) => {
    const apellido = req.params.apellido
    if (isNaN(Number(apellido)) === false) {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo string'})
    }
    try {
        const person1 = await Person.findOne({surname: apellido})
        if (!person1) {
            res.status(422).json({success: false ,msg: `No hay usuarios con el apellido: ${apellido}`})
            return
        }
        const person = await Person.find({surname: apellido})
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

// actualiza el apellido de una persona segun el ID
router_1.patch('/:id', async (req, res) => {
    const id = req.params.id
    const {surname} = req.body
    const person = {
        surname,
    }
    if (typeof surname !== "string") {
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
    }``
})

// elimina un usuario segun el id
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
