const express = require('express')

const rootcollectionController = require('../controllers/rootcollection')
const router = new express.Router()
const auth = require('../middleware/auth')

router.get('/rootcollections', auth, rootcollectionController.getRootCollections)

router.get('/rootcollections/:id', auth, rootcollectionController.getRootCollection)

router.get('/rootcollections/collections/:id', auth, rootcollectionController.getCollections)

router.get('/rootcollections/collections/main/:id', auth, rootcollectionController.getCollectionsMain)

router.post('/rootcollections', auth, rootcollectionController.createRootCollection)

router.patch('/rootcollections/:id', auth, rootcollectionController.updateRootCollection)

router.delete('/rootcollections/:id', auth, rootcollectionController.deleteRootCollection)

module.exports = router