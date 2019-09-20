const router = require('express').Router()
const { isLoggedOut } = require('./../middleware')

router.get('/', isLoggedOut, (req, res) => {
  res.render('index')
})

router.get('*', (req, res) => {
  res.render('404')
})

module.exports = router
