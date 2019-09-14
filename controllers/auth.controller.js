const User = require('./../models/User')
const Occupation = require('./../models/Occupation')

exports.getLoginForm = (re1, res) => {
  const config = {
    action: '/auth/signup/'
  }
  res.render('auth/login', config)
}

exports.getEmployeeSignupForm = (req, res) => {
  const config = {
    action: '/auth/emp/signup/',
    isEmployee: true
  }
  res.render('auth/signup', config)
}

exports.getEmployeerSignupForm = (req, res) => {
  res.render('auth/signup')
}

exports.createUser = async (req, res, next) => {
  const { email, firstName, lastName, password, isEmployee } = req.body
  const user = await User.register({ email, firstName, lastName, isEmployee }, password)

  req.login(user, err => {
    if (err) return next(err)
    if (user.isEmployee) return res.redirect('/auth/emp/profile')
    res.redirect('/search')
  })
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
