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

attributeSchema.virtual('values', {
  ref: 'Value',
  localField: '_id',
  foreignField: 'attribute'
})

attributeSchema.pre('remove', async function(next) {
  const attribute = this
  await attribute.populate('values')
  for (const value of attribute.values) {
    await value.populate('items')
    for (const item of value.items) {
      item.values = item.values.filter(temp_value => temp_value != value._id.toString())
      await item.save()
    }
    await value.delete()
  }
  next()
})

const Attribute = mongoose.model('Attribute', attributeSchema)

module.exports = Attribute