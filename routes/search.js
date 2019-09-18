const router = require('express').Router()
const { filterOccupations, getSearchPage, getOccupations } = require('./../controllers/search.controller')

router.get('/search', filterOccupations, getSearchPage)
router.get('/search/api', filterOccupations, getOccupations)

module.exports = router
