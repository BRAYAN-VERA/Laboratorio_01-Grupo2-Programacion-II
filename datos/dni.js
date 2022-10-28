const express = require('express')
const router_1 = express.Router()

let { people_data } = require('../data')


router_1.get('/', (req, res) => {
    const simpleDNI = people_data.map((surna) => {
        const {id, DNI} = surna
        return {id, DNI}
        })
    res.status(200).json ({ success: true, data: simpleDNI})
})

router_1.get('/:dniID', (req, res) => {
    console.log(req.params)
    const {dniID} = req.params
    const singleDNI = people_data.find(
        surna => surna.id === Number(dniID))
    if (!singleDNI) {
        return res.status(404).send('DNI no encontrado')
    }
    res.json(singleDNI)
})


router_1.post('/', (req,res) => {
    const {DNI} = req.body

    if (!DNI) { 
        return res
        .status(404)
        .json({success: false, msg: 'Proveer DNI'})
    }
    res.status(201).send( { success: true, data: [...people_data, DNI]})
})


router_1.put('/:id', (req, res) => {
    const {id} = req.params
    const {DNI} = req.body
    const person = people_data.find ((person) => person.id === Number(id))
    if (!person) {
        return res
            .status(404)
            .json({ success: false, msg: `No hay persona con id: ${id}`})
    }
    const new_DNI = people_data.map(person => {
        if (person.id === Number(id)) {
            person.DNI = DNI
        }
        return person
    })
    res.status(201).send ( {success: true, data: new_DNI})
})

router_1.delete('/:id', (req, res) => {
    const {id} = req.params
    const DNI_person = people_data.find ((person) => person.id === Number(id))
    if (!DNI_person) {
        return res
            .status(404)
            .json({ success: false, msg: `No hay persona con id: ${id}`})
    }
    const new_DNI = people_data.filter(person => person.id !== Number(id))
    return res.status(200).send ( {success: true, data: new_DNI})
})



module.exports = router_1