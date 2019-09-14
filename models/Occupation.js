const { model, Schema } = require('mongoose')

const occupationSchema = new Schema(
  {
    type: {
      type: String,
      require: true,
      enum: ['PLUMBER', 'MECHANIC', 'ELECTRICIST', 'LOCKSMITH', 'CARETAKER']
    },
    raiting: Number,
    timetable: {
      start: String,
      end: String
    },
    aboutMe: String
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Occupation', occupationSchema)
