const express = require('express')

const RootCollection = require('../models/rootcollection')
const Collection = require('../models/collection')

exports.getRootCollections = async (req, res) => {
  try {
    await req.user.populate('rootcollections')
    res.status(201).send(req.user.rootcollections)
  } catch (e) {
    res.status(400).send({ error: e.message })
  }
}

exports.getRootCollection = async (req, res) => {
  try {
    const rootcollection = await RootCollection.findOne({ _id: req.params.id, owner: req.user._id })
    if (!rootcollection) {
      return res.status(400).send({ error: `Can't find rootcollection by given id` })
    }
    res.status(201).send(rootcollection)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.getCollections = async (req, res) => {
  try {
    const rootcollection = await RootCollection.findOne({
      _id: req.params.id, owner: req.user._id
    }).populate('collections')
    res.status(201).send(rootcollection.collections)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.getCollectionsMain = async (req, res) => {
  try {
    const rootcollection = await RootCollection.findOne({
      _id: req.params.id, owner: req.user._id
    }).populate({ path: 'collections', match: { parent: null } })
    res.status(201).send(rootcollection.collections)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.createRootCollection = async (req, res) => {
  const rootcollection = new RootCollection({
    ...req.body,
    owner: req.user._id
  })
  try {
    await rootcollection.save()
    await req.user.save()
    res.status(201).send(rootcollection)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.updateRootCollection = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['name']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    const rootCollection = await RootCollection.findOne({ _id: req.params.id, owner: req.user._id })
    updates.forEach((update) => rootCollection[update] = req.body[update])
    await rootCollection.save()
    res.status(201).send(rootCollection)
  } catch (e) {
    res.status(500).send(e)
  }
}

exports.deleteRootCollection = async (req, res) => {
  try {
    const rootcollection = await RootCollection.findOne({ _id: req.params.id, owner: req.user._id })
    if (!rootcollection) {
      return res.status(400).send({ error: `Can't find rootcollection for delete` })
    }
    await rootcollection.remove()
    res.status(201).send(rootcollection)
  } catch (e) {
    res.status(400).send(e)
  }
}