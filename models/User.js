const { model, Schema } = require('mongoose')
const pml = require('passport-local-mongoose')

const userSchema = new Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      sparse: true
    },
    facebookId: String,
    googleId: String,
    avatar: String,
    isEmployee: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

userSchema.plugin(pml, { usernameField: 'email' })

module.exports = model('User', userSchema)
