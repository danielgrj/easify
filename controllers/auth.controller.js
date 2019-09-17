const User = require('./../models/User')
const Occupation = require('./../models/Occupation')

const signupRedirect = (req, res, next) => err => {
  if (err) return next(err)
  if (req.user.isEmployee) return res.redirect('/auth/emp/comp')
   res.redirect('/search')
  // res.redirect('/client/searchClient')
}

exports.getLoginForm = (re1, res) => {
  res.render('auth/login')
}

exports.getEmployeeSignupForm = (req, res) => {
  const config = {
    facebookAction: '/auth/emp/facebook',
    googleAction: '/auth/emp/google',
    isEmployee: true
  }
  res.render('auth/signup', config)
}

exports.getEmployeerSignupForm = (req, res) => {
  const config = {
    action: '/auth/signup/',
    facebookAction: '/auth/facebook',
    googleAction: '/auth/google'
  }
  res.render('auth/signup', config)
}

exports.createUser = async (req, res, next) => {
  const { email, name, password, isEmployee } = req.body
  const user = await User.register({ email, name, isEmployee }, password)

  if (isEmployee) {
    await Occupation.create({ userId: user._id })
  }

  req.login(user, signupRedirect(req, res, next))
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
    user.isEmployee = true

    const occupation = await Occupation.findOne({ userId: user._id })
    if (!occupation) {
      await Occupation.create({ userId: user._id })
    }
  }

  req.login(user, signupRedirect(req, res, next))
}

exports.getOccupationForm = async (req, res) => {
  res.render('auth/signup-emp')
}

exports.fillOccupation = async (req, res) => {
  const { type, start, end, aboutMe, location } = req.body
  let active = false

  console.log(req.body)

  if ((type, start, end, aboutMe, location)) {
    active = true
  }

  await Occupation.findOneAndUpdate({ userId: req.user.id }, { type, timetable: { start, end }, aboutMe, active })

  res.redirect('/user/emp/profile')
}

exports.loginUser = (req, res) => {
  const { isEmployee } = req.user
  console.log(req.user.name)
  if (isEmployee) {
    return res.redirect('/user/emp/profile')
  }
  res.redirect('/search')
  // res.redirect('/client/searchClient')
}

exports.logoutUser = (req, res) => {
  req.logout()
  res.redirect('/')
}
