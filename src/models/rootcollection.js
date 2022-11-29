const mongoose = require('mongoose')

const User = require('./user')
const Collection = require('./collection')

const rootcollectionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

rootcollectionSchema.virtual('collections', {
  ref: 'Collection',
  localField: '_id',
  foreignField: 'rootCollection'
})

rootcollectionSchema.pre('remove', async function (next) {
  const rootcollection = this
  const collections = await Collection.find({ rootcollection: rootcollection._id })
  for (const collection of collections) {
    await collection.populate('items')
    await collection.populate('attributes')
    for (const attribute of collection.attributes) {
      await attribute.populate('values')
      for (const value of attribute.values) {
        await value.delete()
      }
      await attribute.delete()
    }
    for (const item of collection.items) {
      await item.delete()
    }
    await collection.delete()
  }
  next()
})

const RootCollection = mongoose.model('RootCollection', rootcollectionSchema)

module.exports = RootCollection