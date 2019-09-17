const router = require('express').Router()
const { catchErrors } = require('./../middleware')
const {
  createRaiting,
  getOneRaiting,
  getAllRaitings,
  editRaiting,
  deleteRaiting
} = require('./../controllers/raitings.controller')

router.get('/:id', catchErrors(getAllRaitings))
router.get('/:id', catchErrors(createRaiting))

router.post('/:id/:raitingId', catchErrors(getOneRaiting))

router.patch('/:id/:raitingId', catchErrors(editRaiting))

router.delete('/:id/:raitingId', catchErrors(deleteRaiting))

module.exports = router
