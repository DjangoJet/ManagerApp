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
  await Collection.deleteMany({ rootcollection: rootcollection._id })
  next()
})

const RootCollection = mongoose.model('RootCollection', rootcollectionSchema)

module.exports = RootCollection