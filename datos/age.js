const express = require('express')
const router_1 = express.Router()

let { people_data } = require('../data')

router_1.get('/', (req, res) => {
    const simple_edad = people_data.map((edad) => {
        const {id, age} = edad
        return {id, age}
        })
    res.status(200).json ({ success: true, data: simple_edad})
})

router_1.get('/:egeID', (req, res) => {
    console.log(req.params)
    const {egeID} = req.params
    const single_ege = people_data.find(
        surna => surna.id === Number(egeID))
    if (!single_ege) {
        return res.status(404).send('Edad no encontrada')
    }
    res.json(single_ege)
})


router_1.post('/', (req,res) => {
    const {age} = req.body

    if (!age) { 
        return res
        .status(404)
        .json({success: false, msg: 'Proveer edad'})
    }
    res.status(201).send( { success: true, data: [...people_data, age]})
})


router_1.put('/:id', (req, res) => {
    const {id} = req.params
    const {age} = req.body
    const person = people_data.find ((person) => person.id === Number(id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `No hay persona con id: ${id}`})
    }
    const new_age = people_data.map(person => {
        if (person.id === Number(id)) {
            person.age = age
        }
        return person
    })
    res.status(201).send ( {success: true, data: new_age})
})

router_1.delete('/:id', (req, res) => {
    const {id} = req.params
    const person = people_data.find ((person) => person.id === Number(id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `No hay persona con id: ${id}`})
    }
    const new_surname = people_data.filter(person => person.id !== Number(id))
    return res.status(200).send ( {success: true, data: new_surname})
})




module.exports = router_1