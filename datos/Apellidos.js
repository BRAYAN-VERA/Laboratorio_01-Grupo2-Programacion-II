const express = require('express')
const router_1 = express.Router()

let { people_data } = require('../data')


router_1.get('/', (req, res) => {
    const simplesurname = people_data.map((surna) => {
        const {id, surname} = surna
        return {id, surname}
        })
    res.status(200).json ({ success: true, data: simplesurname})
})

router_1.get('/:surnameID', (req, res) => {
    console.log(req.params)
    const {surnameID} = req.params
    const singlesurname = people_data.find(
        surna => surna.id === Number(surnameID))
    if (!singlesurname) {
        return res.status(404).send('Apellido no encontrado')
    }
    res.json(singlesurname)
})


router_1.post('/', (req,res) => {
    const {surname} = req.body

    if (!surname) { 
        return res
        .status(404)
        .json({success: false, msg: 'Proveer apellido'})
    }
    res.status(201).send( { success: true, data: [...people_data, surname]})
})


router_1.put('/:id', (req, res) => {
    const {id} = req.params
    const {surname} = req.body
    const person = people_data.find ((person) => person.id === Number(id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `No hay persona con id: ${id}`})
    }
    const new_surname = people_data.map(person => {
        if (person.id === Number(id)) {
            person.surname = surname
        }
        return person
    })
    res.status(201).send ( {success: true, data: new_surname})
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