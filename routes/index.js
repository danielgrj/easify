const router = require('express').Router()
const { isLoggedIn } = require('./../middleware')

router.get('/', (req, res) => {
  res.render('index')
})

// For test pourpouses only
// router.get('/test', isLoggedIn, (req, res) => {
//   res.send('Autheticade')
// })

module.exports = router
