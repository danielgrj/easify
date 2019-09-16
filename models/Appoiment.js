const { model, Schema } = require('mongoose')

const appoimentSchema = new Schema(
  {
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    clientId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    locationId: {
      type: Schema.Types.ObjectId,
      required: true
    },
    date: Date
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Appoiment', appoimentSchema)
