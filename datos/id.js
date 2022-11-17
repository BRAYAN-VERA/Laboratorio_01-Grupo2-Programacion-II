const express = require('express')
const router_1 = express.Router()
const Person = require('../model/Person')

// muestra en la ruta principal todos los ID de las personas
router_1.get('/', async(req, res) => {
    try {
        const simple_id = await Person.find({}, {_id: 1})
        res.status(200).json({success: true ,simple_id})
    } catch (error) {
        res.status(500).json({success: false , error:error })
    }
})

// muestra segun el DNI el ID de la persona
router_1.get('/:DNI', async (req, res) => {
    const DNI = Number(req.params.DNI)
    if (isNaN(DNI)) {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo numerico'})
    }
    try {
        const person = await Person.findOne({DNI: DNI})
        if (!person) {
            res.status(422).json({success: false ,msg: `No hay persona con el DNI: ${DNI}`})
            return
        }
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

router_1.get('/buscar/:ID', async (req, res) => {
    const ID = req.params.ID
    try {
        const person = await Person.findOne({_id: ID})
        if (!person) {
            res.status(422).json({success: false ,msg: `No hay usuarios con el ID: ${ID}`})
            return
        }
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
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
