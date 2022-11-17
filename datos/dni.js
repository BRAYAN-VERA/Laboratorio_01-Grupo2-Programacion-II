const express = require('express')
const router_1 = express.Router()
const Person = require('../model/Person')

// muestra los DNI de las personas
router_1.get('/', async(req, res) => {
    try {
        const simple_DNI = await Person.find({}, {_id: 1, DNI: 1})
        res.status(200).json({success: true ,simple_DNI})
    } catch (error) {
        res.status(500).json({success: false , error:error })
    }
})

// muestra la informacion de una persona segun el ID
router_1.get('/:DNI_ID', async (req, res) => {
    const DNI_ID = req.params.DNI_ID
    try {
        const person = await Person.findOne({_id: DNI_ID})
        if (!person) {
            res.status(422).json({success: false ,msg: `No hay persona con id: ${DNI_ID}`})
            return
        }
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

// muestra la informacion de una persona segun el DNI
router_1.get('/buscar/:DNI', async (req, res) => {
    const DNI = Number(req.params.DNI)
    if (isNaN(DNI)) {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo numerico'})
    }
    try {
        const person = await Person.findOne({DNI: DNI})
        if (!person) {
            res.status(422).json({success: false ,msg: `No hay usuarios con el DNI: ${DNI}`})
            return
        }
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

// actualiza el DNI de una persona segun el id
router_1.patch('/:DNI_ID', async (req, res) => {
    const DNI_ID = req.params.DNI_ID
    const {DNI} = req.body
    const person = {
        DNI,
    }
    if (typeof DNI !== "number") {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo numerico'})
    }
    const updatePerson = await Person.updateOne({DNI: DNI}, person)
        //console.log(updatePerson)
    if (updatePerson.matchedCount === 1) {
        res.status(422).json({success: false ,msg: `Ya existe una persona con el DNI: ${DNI}`})
        return
    }
    try {
        const updatePerson = await Person.updateOne({_id: DNI_ID}, person)
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

// elimina una persona segun el DNI
router_1.delete('/:DNI', async (req, res) => {
    const DNI = req.params.DNI
    const person = await Person.findOne({ DNI: DNI })
    if (!person) { 
        res.status(422).json({ success: false, msg: `No hay persona con el DNI: ${DNI}`})
        return
    }
    try {
        await Person.deleteOne({DNI: DNI})
        res.status(200).json({success: true ,msg: 'Usuario removido'})
    } catch (error) {
        res.status(500).json({ success: false, error: error })
    }
})

module.exports = router_1
