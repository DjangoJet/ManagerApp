const mongoose = require('mongoose')

const valueSchema = new mongoose.Schema({
  value: {
    type: String,
    require: true,
    trim: true
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  attribute: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'Attribute'
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Item'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

const Value = mongoose.model('Value', valueSchema)

module.exports = Value