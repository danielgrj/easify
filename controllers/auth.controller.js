const User = require('./../models/User')
const Occupation = require('./../models/Occupation')

const signupRedirect = (req, res, next) => async err => {
  const { id: userId } = req.user
  const occupation = await Occupation.findOne({ userId })

  if (err) return next(err)

  req.app.locals.currentUser = req.user

  if (req.user.isEmployee && !occupation.active) {
    return res.redirect('/auth/emp/comp')
  } else if (req.user.isEmployee) {
    return res.redirect('/user/emp/profile')
  }

  res.redirect('/search')
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

exports.editUser = async (req, res) => {
  const enabledUpdates = [email, name]
  const updates = {}
  for (const key in req.body) {
    if (enabledUpdates.includes(key)) updates[key] = req.body[key]
  }

  await User.findByIdAndUpdate(req.user.id, updates)
  if (req.body.password) await User.setPassword(req.body.password)

  res.redirect('/user/profile')
}

exports.editEmp = async (req, res) => {
  const { id: userId } = req.user
  const enabledUpdatesUser = ['email', 'name']
  const enabledUpdatesOccupations = ['aboutMe', 'type']
  const updatesOccupations = {}
  const updatesUser = {}

  for (const key in req.body) {
    if (enabledUpdatesUser.includes(key)) updatesUser[key] = req.body[key]
    if (enabledUpdatesOccupations.includes(key)) updatesOccupations[key] = req.body[key]
  }

  await User.findByIdAndUpdate(userId, updatesUser)
  if (req.body.password) await User.setPassword(req.body.password)

  await Occupation.findOneAndUpdate({ userId }, updatesOccupations)

  res.redirect('/user/emp/profile')
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

  if ((type, start, end, aboutMe, location)) {
    active = true
  }

  await Occupation.findOneAndUpdate({ userId: req.user.id }, { type, timetable: { start, end }, aboutMe, active })

  res.redirect('/user/emp/profile')
}

exports.loginUser = (req, res) => {
  const { isEmployee } = req.user
  req.app.locals.currentUser = req.user
  if (isEmployee) {
    return res.redirect('/user/emp/profile')
  }
  res.redirect('/search')
}

exports.logoutUser = (req, res) => {
  req.logout()
  res.redirect('/')
}
