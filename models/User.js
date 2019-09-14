const { model, Schema } = require('mongoose')
const pml = require('passport-local-mongoose')

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    require: true
  },
  avatar: String,
  isEmployee: {
    type: Boolean,
    default: false
  },
  occupationId: {
    type: Schema.Types.ObjectId,
    ref: 'Occupation'
  }
})

userSchema.plugin(pml, { usernameField: 'email' })

module.exports = model('User', userSchema)
