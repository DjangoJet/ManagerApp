const express = require('express')

const collectionController = require('../controllers/collection')
const router = new express.Router()
const auth = require('../middleware/auth')

router.post('/collections', auth, collectionController.createCollection)

router.patch('/collections/:id', auth, collectionController.updateCollection)

router.delete('/collections/:id', auth, collectionController.deleteCollection)

module.exports = router