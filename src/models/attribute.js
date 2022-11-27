const mongoose = require('mongoose')

const attributeSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  parent_collection: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Collection'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

const Attribute = mongoose.model('Attribute', attributeSchema)

module.exports = Attribute