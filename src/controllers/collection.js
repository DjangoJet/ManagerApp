const express = require('express')

const Collection = require('../models/collection')
const RootCollection = require('../models/rootcollection')

exports.getItems = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.params.id, owner: req.user._id
    }).populate('items')
    res.status(201).send(collection.items)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.createCollection = async (req, res) => {
  try {
    // Checking if rootcollection exists
    const rootcollection = await RootCollection.findOne({
      _id: req.body.rootcollection, owner: req.user._id
    })
    if (!rootcollection) {
      return res.status(400).send({ error: `Can't find rootcollection by given id` })
    }
    // Checking if parent collection exists
    if (req.body.parent) {
      const parent_collection = await Collection.findOne({
        _id: req.body.parent, owner: req.user._id
      })
      if (!parent_collection) {
        return res.status(400).send({ error: `Can't find parent collection by given id`})
      }
    }

    const collection = new Collection({
      ...req.body,
      owner: req.user._id
    })
    await collection.save()
    res.status(201).send(collection)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.updateCollection = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    const collection = await Collection.findOne({ _id: req.params.id, owner: req.user._id })
    updates.forEach((update) => collection[update] = req.body[update])
    await collection.save()
    res.status(201).send(collection)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.deleteCollection = async (req, res) => {
  try {
    const collection = await Collection.findOne({ _id: req.params.id, owner: req.user._id })
    if (!collection) {
      return res.status(400).send({ error: `Can't find collection for delete`})
    }
    await collection.remove()
    res.status(201).send(collection)
  } catch (e) {
    res.status(400).send(e)
  }
}