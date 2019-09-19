const { model, Schema } = require('mongoose')

const locationSchema = new Schema(
  {
    address: String,
    coordinates: {
      lat: Number,
      lng: Number
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    default: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Location', locationSchema)
