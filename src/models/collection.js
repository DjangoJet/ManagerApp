const mongoose = require('mongoose')
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
  toJson: { virtuals: true },
  toObject: { virtuals: true }
})

collectionSchema.virtual('items', {
  ref: 'Item',
  localField: '_id',
  foreignField: 'parent_collection'
})

collectionSchema.pre('remove', async function (next) {
  const collection = this
  // delete children collections
  const collections = await Collection.find({
    parent: collection._id, rootcollection: collection.rootcollection
  })
  await collections.forEach(collection => collection.remove()) // is it asynchronic ?
  // delete collection items
  await Item.deleteMany({ collection: collection._id })
  next()
})

const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection