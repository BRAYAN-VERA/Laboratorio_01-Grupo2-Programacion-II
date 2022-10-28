const express = require('express')
const router_1 = express.Router()

let { people_data } = require('../data')



router_1.get('/', (req, res) => {
    const simplename = people_data.map((nombre) => {
        const {id, name} = nombre
        return {id, name}
        })
    res.status(200).json ({ success: true, data: simplename})
})

router_1.get('/:nameID', (req, res) => {
    console.log(req.params)
    const {nameID} = req.params
    const singlename = people_data.find(
        name => name.id === Number(nameID))
    if (!singlename) {
        return res.status(404).send('Nombre no encontrado')
    }
    res.json(singlename)
})


router_1.post('/', (req,res) => {
    const {name} = req.body

    if (!name) { 
        return res
        .status(404)
        .json({success: false, msg: 'Proveer nombre'})
    }
    res.status(201).send( { success: true, data: [...people_data, name]})
})


router_1.put('/:id', (req, res) => {
    const {id} = req.params
    const {name} = req.body
    const person = people_data.find ((person) => person.id === Number(id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `No hay persona con id: ${id}`})
    }
    const new_name = people_data.map(person => {
        if (person.id === Number(id)) {
            person.name = name
        }
        return person
    })
    res.status(201).send ( {success: true, data: new_name})
})

router_1.delete('/:id', (req, res) => {
    const {id} = req.params
    const person = people_data.find ((person) => person.id === Number(id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `No hay persona con id: ${id}`})
    }
    const new_name = people_data.filter(person => person.id !== Number(id))
    return res.status(200).send ( {success: true, data: new_name})
})



module.exports = router_1