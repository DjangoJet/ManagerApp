const mongoose = require('mongoose')

const User = require('./user')

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
  toJson: { virtuals: true },
  toObject: { virtuals: true }
})

const RootCollection = mongoose.model('RootCollection', rootcollectionSchema)

module.exports = RootCollection