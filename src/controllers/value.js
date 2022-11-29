const express = require('express')

const Attribute = require('../models/attribute')
const Item = require('../models/item')
const Value = require('../models/value')

exports.createValue = async (req, res) => {
  try {
    // Check if given attribute exist
    const attribute = await Attribute.findOne({
      _id: req.body.attribute, owner: req.user._id
    })
    if (!attribute) {
      return res.status(400).send({ error: `Can't find attribute by given id` })
    }
    // Check if given item exist
    const item = await Item.findOne({
      _id: req.body.item, owner: req.user._id
    })
    if (!item) {
      return res.status(400).send({ error: `Can't find item by given id` })
    }
    // Check if exist value like given
    const exist_value = await Value.findOne({
      value: req.body.value, attribute: req.body.attribute, owner: req.user._id
    })
    if (exist_value) {
      return res.status(400).send({ error: `Given attribute have this value`})
    }
    
    const value = new Value({
      value: req.body.value,
      attribute: req.body.attribute,
      items: [ req.body.item ],
      owner: req.user._id
    })
    item.values = [ ...item.values, value._id ]
    await item.save()
    await value.save()
    res.status(201).send(value)
  } catch (e) {
    res.status(400).send(e)
  }
}

exports.updateValue = async (req, res) => {
  const updates = Object.keys(req.body)
  const allowedUpdates = ['removeItem', 'addItem']
  const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' })
  }
  try {
    // Find value for update
    const value = await Value.findOne({ _id: req.params.id, owner: req.user._id })
    var removeItem = null, addItem = null
    // Remove item from value
    if (req.body.removeItem) {
      removeItem = await Item.findOne({ _id: req.body.removeItem, owner: req.user._id }) // find removeItem
      if (!removeItem) {
        return res.status(400).send({ error: `Can't find item removed from value`})
      }
      value.items = value.items.filter(item => item != req.body.removeItem) // filter value items array
      removeItem.values = removeItem.values.filter(value_id => value_id != req.params.id) // filter item values array (don't work with value._id insted req.params.id)
    }
    // Add item to value
    if (req.body.addItem) {
      addItem = await Item.findOne({ _id: req.body.addItem, owner: req.user._id }) // find addItem
      if (!addItem) {
        return res.status(400).send({ error: `Can't find item added to value`})
      }
      await addItem.populate('values')
      const isValueWithAttribute = addItem.values.find(
        temp_value => temp_value.attribute == value.attribute.toString()
      )
      if (isValueWithAttribute) { // check if item have value belong to given value attribute
        return res.status(400).send({ error: 'Added item have value belong to given value attribute' })
      }
      value.items = [ ...value.items, req.body.addItem ] // add item to value
      addItem.values = [ ...addItem.values, value._id ] // add value to item
    }

    // Save changed objects
    if (removeItem) await removeItem.save()
    if (addItem) await addItem.save()
    if (value.items) {
      value.save()
    } else {
      value.delete()
    }

    res.status(201).send(value)
  } catch (e) {
    res.status(500).send(e)
  }
}