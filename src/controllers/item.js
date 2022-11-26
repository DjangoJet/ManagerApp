const express = require('express')

const Collection = require('../models/collection')
const Item = require('../models/item')

exports.createItem = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.body.parent_collection, owner: req.user._id
    })
    if (!collection) {
      return res.status(400).send({ error: `Can't find collection by given id` })
    }
    const item = new Item({
      ...req.body,
      owner: req.user._id
    })
    await item.save()
    res.status(201).send(item)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.updateItem = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    const item = await Item.findOne({ _id: req.params.id, owner: req.user._id })
    updates.forEach((update) => item[update] = req.body[update])
    await item.save()
    res.status(201).send(item)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.deleteItem = async (req, res) => {
  try {
    const item = await Item.findOne({ _id: req.params.id, owner: req.user._id })
    if (!item) {
      return res.status(400).send({ error: `Can't find item for delete` })
    }
    await item.remove()
    res.status(201).send(item)
  } catch (e) {
    res.status(400).send(e)
  }
}