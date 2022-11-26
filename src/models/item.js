const mongoose = require('mongoose')

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  parent_collection: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true,
  toJson: { virtuals: true },
  toObject: { virtuals: true }
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item