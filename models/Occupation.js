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
      unique: true
    },
    raiting: Number,
    timetable: {
      start: String,
      end: String
    },
    location: Schema.Types.ObjectId,
    aboutMe: String,
    active: Boolean
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Occupation', occupationSchema)
