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
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Location', locationSchema)
