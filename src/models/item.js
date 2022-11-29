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
  },
  values: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Value'
  }]
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
})

itemSchema.pre('remove', async function (next) {
  const item = this
  await item.populate('values')
  for (const value of item.values) {
    value.items = value.items.filter(item_id => item_id != item._id.toString())
    if (value.items.length > 0) {
      await value.save()
    } else {
      await value.delete()
    }
  }
  next()
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Item