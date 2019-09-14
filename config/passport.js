const passport = require('passport')
const User = require('./../models/User')
const FacebookStrategy = require('passport-facebook')

passport.use(User.createStrategy())

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: 'http://localhost:3000/auth/facebook/callback',
      profileFields: ['id', 'displayName', 'photos', 'email']
    },
    async (accessToken, refreshToken, profile, cb) => {
      const { id: facebookId, displayName: name, emails } = profile
      const user = await User.findOne({ facebookId })

      if (user) return cb(null, user)
      const newUser = await User.create({ name, email: emails ? emails[0] : undefined })
      cb(null, newUser)
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

module.exports = passport
