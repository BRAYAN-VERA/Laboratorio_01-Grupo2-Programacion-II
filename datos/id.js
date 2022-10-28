const express = require('express')
const router_1 = express.Router()

let { people_data } = require('../data')

router_1.get('/', (req, res) => {
    const simple_id = people_data.map((idvalue) => {
        const {id} = idvalue
        return {id}
        })
    res.status(200).json ({ success: true, data: simple_id})
})

router_1.post('/', (req,res) => {
    const {id} = req.body

    if (!id) { 
        return res
        .status(404)
        .json({success: false, msg: 'Proveer id'})
    }
    res.status(201).send( { success: true, data: [...people_data, id]})
})


router_1.put('/:DNI', (req, res) => {
    const {DNI} = req.params
    const {id} = req.body
    const person = people_data.find ((person) => person.DNI === Number(DNI))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `No hay persona con DNI: ${DNI}`})
    }
    const new_id = people_data.map(person => {
        if (person.DNI === Number(DNI)) {
            person.id = id
        }
        return person
    })
    res.status(201).send ( {success: true, data: new_id})
})

router_1.delete('/:id', (req, res) => {
    const {id} = req.params
    const id_person = people_data.find ((person) => person.id === Number(id))
    if (!id_person) {
        return res
            .status(404)
            .json({ success: false, msg: `No hay persona con id: ${id}`})
    }
    const new_id = people_data.filter(person => person.id !== Number(id))
    return res.status(200).send ( {success: true, data: new_id})
})



module.exports = router_1