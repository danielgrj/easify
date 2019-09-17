const { model, Schema } = require('mongoose')

const raitingSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    employeeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    content: String,
    calification: {
      type: Number,
      required: true
    },
    useful: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Raiting', raitingSchema)
