const { model, Schema } = require('mongoose')

const appoimentSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    clientId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    locationId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Location'
    },
    date: Date,
    active: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Appoiment', appoimentSchema)
