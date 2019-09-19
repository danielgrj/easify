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
  setEmployee,
  getOccupationForm,
  fillOccupation,
  editEmp,
  editUser
} = require('./../controllers/auth.controller')
const { catchErrors, isLoggedIn, isLoggedOut } = require('./../middleware')

router.get('/signup', isLoggedOut, getEmployeerSignupForm)
router.post('/signup', isLoggedOut, catchErrors(createUser))

router.get('/emp/signup', isLoggedOut, getEmployeeSignupForm)

router.get('/facebook', isLoggedOut, passport.authenticate('facebook', { scope: ['email'] }))
router.get('/emp/facebook/', isLoggedOut, setEmployee, passport.authenticate('facebook', { scope: ['email'] }))
router.get('/facebook/callback', isLoggedOut, (req, res, next) =>
  passport.authenticate('facebook', finishSignup(req, res, next))(req, res, next)
)

router.get('/google', isLoggedOut, passport.authenticate('google', { scope: ['profile', 'email'] }))
router.get('/emp/google/', isLoggedOut, setEmployee, passport.authenticate('google', { scope: ['profile'] }))
router.get('/google/callback', isLoggedOut, (req, res, next) =>
  passport.authenticate('google', finishSignup(req, res, next))(req, res, next)
)

router.get('/login', isLoggedOut, getLoginForm)
router.post('/login', isLoggedOut, passport.authenticate('local'), loginUser)

router.get('/emp/comp', getOccupationForm)
router.post('/emp/comp', catchErrors(fillOccupation))

router.post('/edit', catchErrors(editUser))
router.post('/emp/edit', catchErrors(editEmp))

router.get('/logout', isLoggedIn, logoutUser)

module.exports = router
