const express = require('express')
const router_1 = express.Router()

let { people_data } = require('../data')



router_1.get('/', (req, res) => {
    res.status(200).json ({ success: true, data: people_data})
})

router_1.get('/:peopleID', (req, res) => {
    console.log(req.params)
    const {peopleID} = req.params
    const singlePerson = people_data.find(
        person => person.id === Number(peopleID))
    if (!singlePerson) {
        return res.status(404).send('Persona no encontrada')
    }
    res.json(singlePerson)
})



router_1.delete('/:id', (req, res) => {
    const {id} = req.params
    const person = people_data.find ((person) => person.id === Number(id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `No hay persona con id: ${id}`})
    }
    const newpeople = people_data.filter(person => person.id !== Number(id))
    return res.status(200).send ( {success: true, data: newpeople})
})


module.exports = router_1