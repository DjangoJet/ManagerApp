const express = require('express')

const attributeController = require('../controllers/attribute')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/attributes', auth, attributeController.createAttribute)

router.patch('/attributes/:id', auth, attributeController.updateAttriute)

router.delete('/attributes/:id', auth, attributeController.deleteAttribute)

module.exports = router