exports.catchErrors = fn => {
  return (req, res, next) => {
    return fn(req, res, next).catch(next)
  }
}

exports.isLoggedIn = (req, res, next) => {
  if (req.isAuthenticated()) return next()
  res.redirect('/auth/login')
}

exports.isLoggedOut = (req, res, next) => {
  if (!req.isAuthenticated()) return next()
  if (req.user.isEmployee) return res.redirect('/user/emp/profile')
  res.redirect('/search')
}

exports.checkRole = (req, res, next) => {
  if (req.user.isEmployee) return next()
  res.redirect('/user/profile')
}
