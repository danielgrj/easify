const router = require('express').Router()
const { isLoggedIn, isLoggedOut } = require('./../middleware')
const { filterOccupations, getSearchPage, getOccupations } = require('./../controllers/search.controller')

router.get('/search', isLoggedIn, filterOccupations, getSearchPage)
router.get('/search/api', isLoggedIn, filterOccupations, getOccupations)

module.exports = router
