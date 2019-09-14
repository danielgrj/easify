const router = require('express').Router()
const passport = require('./../config/passport')
const {
  getLoginForm,
  getEmployeeSignupForm,
  getEmployeerSignupForm,
  createUser,
  finishSignup,
  loginUser,
  logoutUser,
  setEmployee
} = require('./../controllers/auth.controller')
const { catchErrors, isLoggedIn } = require('./../middleware')

router.get('/signup', getEmployeerSignupForm)
router.post('/signup', catchErrors(createUser))

router.get('/emp/signup', getEmployeeSignupForm)

router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }))
router.get('/emp/facebook/', setEmployee, passport.authenticate('facebook', { scope: ['email'] }))
router.get(
  '/facebook/callback',
  (req, res, next) => passport.authenticate('facebook', finishSignup(req, res, next))(req, res, next),
  loginUser
)

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/emp/google/', setEmployee, passport.authenticate('google', { scope: ['profile'] }))
router.get(
  '/google/callback',
  (req, res, next) => passport.authenticate('google', finishSignup(req, res, next))(req, res, next),
  loginUser
)

router.get('/login', getLoginForm)
router.post('/login', passport.authenticate('local'), loginUser)

module.exports = router
