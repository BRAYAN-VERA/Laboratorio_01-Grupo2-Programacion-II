const express = require('express')
const router_1 = express.Router()
const Person = require('../model/Person')

// muestra toda la informacion de la base de datos
router_1.get('/', async (req, res) => {
    try {
        const people = await Person.find()
        res.status(200).json({success: true ,people})
    } catch (error) {
        res.status(500).json({success: false , error:error })
    }
})

// muestra toda la informacion de una persona segun el ID
router_1.get('/ID/:peopleID', async (req, res) => {
    const peopleID = req.params.peopleID
    try {
        const person = await Person.findOne({_id: peopleID})
        if (!person) {
            res.status(422).json({success: false ,msg: `No hay persona con id: ${surnameID}`})
            return
        }
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

// muestra toda la informacion de una persona segun el DNI
router_1.get('/DNI/:peopleDNI', async (req, res) => {
    const peopleDNI = Number(req.params.peopleDNI)
    if (isNaN(peopleDNI)) {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo de dato erroneo, ingrese un dato tipo numerico'})
    }
    try {
        const person = await Person.findOne({DNI: peopleDNI})
        if (!person) {
            res.status(422).json({success: false ,msg: `No hay persona con el DNI: ${peopleDNI}`})
            return
        }
        res.status(200).json({success: true, person})
    } catch (error) {
        res.status(500).json({success: false , error: error})
    }
})

// crea una nueva persona, se requiere nombre, apellido, DNI e ID
router_1.post('/', async(req, res) => {
    const {name, surname, DNI, age } = req.body
    if (!name) {
        return res
            .status(400)
            .json({ success: false, msg: 'Proveer nombre'})
    }
    if (!surname) {
        return res
            .status(400)
            .json({ success: false, msg: 'Proveer apellido'})
    }
    if (!DNI) {
        return res
            .status(400)
            .json({ success: false, msg: 'Proveer DNI'})
    }
    if (!age) {
        return res
            .status(400)
            .json({ success: false, msg: 'Proveer edad'})
    }
    
    if (typeof name !== "string" || typeof surname !== "string" || typeof DNI !== "number"|| typeof age !== "number") {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo(s) de dato(s) erroneo(s)'})
    }
    const person = {
        name,
        surname,
        DNI,
        age,
    }

    //console.log(person1);
    const updatePerson = await Person.updateOne({DNI: DNI}, person)
        //console.log(updatePerson)
    if (updatePerson.matchedCount === 1) {
        res.status(422).json({success: false ,msg: `Ya existe una persona con el DNI: ${DNI}`})
        return
    }

    try {
        await Person.create(person)
        res.status(201).json({success: true ,message: 'Persona es definida'})
    } catch (error) {
        res.status(500).json({success: false ,error: error})  
    }
    
})

// actualiza la informacion de una persona segun el ID
router_1.patch('/:id', async (req, res) => {
    const id = req.params.id
    const { name, surname, DNI, age} = req.body
    const person = {
        name,
        surname,
        DNI,
        age,
    }
    if (!name || !surname || !DNI || !age) {
        return res
            .status(400)
            .json({ success: false, msg: 'Ingresar todos los datos (name, surname, DNI, age)'})
    }
    if (typeof name !== "string" || typeof surname !== "string" || typeof DNI !== "number"|| typeof age !== "number") {
        return res
            .status(400)
            .json({ success: false, msg: 'Tipo(s) de dato(s) erroneo(s)'})
    }
    const updatePerson = await Person.updateOne({DNI: DNI}, person)
        //console.log(updatePerson)
    if (updatePerson.matchedCount === 1) {
        res.status(422).json({success: false ,msg: `Ya existe una persona con el DNI: ${DNI}`})
        return
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

//elimina una persona segun el ID
router_1.delete('/:id', async (req, res) => {
    const id = req.params.id
    const person = await Person.findOne({ _id: id })
    if (!person) { 
        res.status(422).json({ success: false, msg: `No hay persona con id: ${id}`})
        return
    }
    try {
        await Person.deleteOne({_id: id})
        res.status(200).json({success: true ,message: 'Usuario removido'})
    } catch (error) {
        res.status(500).json({success: false , error: error })
    }
})


module.exports = router_1
