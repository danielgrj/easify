const router = require('express').Router()
const passport = require('./../config/passport')
const {
  getLoginForm,
  getEmployeeSignupForm,
  getEmployeerSignupForm,
  createUser,
  loginUser,
  logoutUser
} = require('./../controllers/auth.controller')
const { catchErrors, isLoggedIn } = require('./../middleware')

router.get('/signup', getEmployeerSignupForm)
router.post('/signup', catchErrors(createUser))

router.get('/emp/signup', getEmployeeSignupForm)
router.post('/emp/signup', catchErrors(createUser))

router.get('/login', getLoginForm)
router.post('/login', passport.authenticate('local'), loginUser)

router.get('/logout', isLoggedIn, logoutUser)

module.exports = router
