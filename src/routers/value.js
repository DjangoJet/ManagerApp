const express = require('express')

const valueController = require('../controllers/value')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/values', auth, valueController.createValue)

router.patch('/values/:id', auth, valueController.updateValue)

module.exports = router