const mongoose = require('mongoose')
const Attribute = require('./attribute')
const Item = require('./item')

const collectionSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  rootcollection: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'RootCollection'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    default: null,
    ref: 'Collection'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

collectionSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'parent_collection'
})

collectionSchema.virtual('attributes', {
  ref: 'Attribute',
  localField: '_id',
  foreignField: 'parent_collection'
})

collectionSchema.pre('remove', async function (next) {
  const collection = this
  
  // delete children collections
  const collections = await Collection.find({
    parent: collection._id, rootcollection: collection.rootcollection, owner: collection.owner
  })
  await collections.forEach(collection => collection.remove()) // is it asynchronic ?

  // delete collection items
  //await Item.deleteMany({ parent_collection: collection._id })
  await collection.populate('items')
  for (const item of collection.items) {
    await item.remove()
  }

  // delete collection attribute and values
  await collection.populate('attributes')
  for (const attribute of collection.attributes) {
    await attribute.populate('values')
    for (const value of attribute.values) {
      await value.delete()
    }
    await attribute.delete()
  }

  next()
})

const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection