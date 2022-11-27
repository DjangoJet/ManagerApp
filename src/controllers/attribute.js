const express = require('express')

const Collection = require('../models/collection')
const Attribute = require('../models/attribute')

exports.createAttribute = async (req, res) => {
  try {
    const collection = await Collection.findOne({
      _id: req.body.parent_collection, owner: req.user._id
    })
    if (!collection) {
      return res.status(400).send({ error: `Can't find collection by given id` })
    }
    const attribute = new Attribute({
      ...req.body,
      owner: req.user._id
    })
    await attribute.save()
    res.status(201).send(attribute)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.updateAttriute = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    const attribute = await Attribute.findOne({ _id: req.params.id, owner: req.user._id })
    updates.forEach((update) => attribute[update] = req.body[update])
    await attribute.save()
    res.status(201).send(attribute)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.deleteAttribute = async (req, res) => {
  try {
    const attribute = await Attribute.findOne({ _id: req.params.id, owner: req.user._id })
    if (!attribute) {
      return res.status(400).send({ error: `Can't find attribute for delete` })
    }
    await attribute.remove()
    res.status(201).send(attribute)
  } catch (e) {
    res.status(400).send(e)
  }
}