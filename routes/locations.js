const router = require('express').Router()
const { catchErrors } = require('./../middleware')
const {
  getAllLocations,
  getOneLocation,
  createLocation,
  deleteLocation,
  editLocation,
  setDefault
} = require('./../controllers/location.controller')

router.get('/', catchErrors(getAllLocations))
router.post('/', catchErrors(createLocation))

router.get('/:id', catchErrors(getOneLocation))

router.delete('/:id', catchErrors(deleteLocation))
router.patch('/:id', catchErrors(editLocation))
router.patch('/:id/default', catchErrors(setDefault))

module.exports = router
