const mongoose = require('mongoose')

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
})

collectionSchema.pre('remove', async function (next) {
  const collection = this
  const collections = await Collection.find({
    parent: collection._id, rootcollection: collection.rootcollection
  })
  await collections.forEach(collection => collection.remove()) // is it asynchronic ?
  next()
})

const Collection = mongoose.model('Collection', collectionSchema)

module.exports = Collection