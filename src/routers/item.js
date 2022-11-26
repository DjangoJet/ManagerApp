const express = require('express')

const itemController = require('../controllers/item')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/items', auth, itemController.createItem)

router.patch('/items/:id', auth, itemController.updateItem)

router.delete('/items/:id', auth, itemController.deleteItem)

module.exports = router