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
    avatar: {
      type: String,
      default: 'http://chrisalensula.org/wp-content/plugins/all-in-one-seo-pack/images/default-user-image.png'
    },
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
