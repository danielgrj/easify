const router = require('express').Router()
const { isLoggedIn } = require('./../middleware')

router.get('/', (req, res) => {
  res.render('index')
})

// router.get('/client/searchClient', (req, res) => {
//   res.render('client/searchClient')
// })

// For test pourpouses only
// router.get('/test', isLoggedIn, (req, res) => {
//   res.send('Autheticade')
// })

module.exports = router
