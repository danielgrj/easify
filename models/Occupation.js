const { model, Schema } = require('mongoose')

const occupationSchema = new Schema(
  {
    type: {
      type: String,
      enum: ['PLUMBER', 'MECHANIC', 'ELECTRICIST', 'LOCKSMITH', 'CARETAKER']
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: true,
      ref: 'User'
    },
    raiting: Number,
    timetable: {
      start: String,
      end: String
    },
    address: {
      type: Schema.Types.ObjectId,
      ref: 'Location'
    },
    aboutMe: String,
    active: Boolean
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Occupation', occupationSchema)
