const User = require('./../models/User')
const Occupation = require('./../models/Occupation')

const loginRedirect = (user, next, res) => err => {
  if (err) return next(err)
  if (user.isEmployee) return res.redirect('/auth/emp/profile')
  res.redirect('/search')
}

exports.getLoginForm = (re1, res) => {
  res.render('auth/login')
}

exports.getEmployeeSignupForm = (req, res) => {
  const config = {
    facebookAction: '/auth/emp/facebook',
    isEmployee: true
  }
  res.render('auth/signup', config)
}

exports.getEmployeerSignupForm = (req, res) => {
  const config = {
    action: '/auth/signup/',
    facebookAction: '/auth/facebook'
  }
  res.render('auth/signup', config)
}

exports.createUser = async (req, res, next) => {
  const { email, firstName, lastName, password, isEmployee } = req.body
  const user = await User.register({ email, firstName, lastName, isEmployee }, password)

  req.login(user, loginRedirect(user, next, res))
}

exports.setEmployee = (req, res, next) => {
  req.app.locals.isEmployee = true
  next()
}

exports.finishSignup = (req, res, next) => async (err, user, info) => {
  if (err) return next(err)

  if (req.app.locals.isEmployee) {
    await User.findByIdAndUpdate(user.id, { isEmployee: true })
    delete req.app.locals.isEmployee
  }

  req.login(user, loginRedirect(user, next, res))
}

exports.loginUser = (req, res) => {
  const { isEmployee } = req.user

  if (isEmployee) {
    return res.redirect('/auth/emp/profile')
  }
  res.redirect('/search')
}

exports.logoutUser = (req, res) => {
  req.logout()
  res.redirect('/')
}
