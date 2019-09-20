const router = require('express').Router()
const { catchErrors, isLoggedIn } = require('../middleware')
const {
  createAppoiment,
  editAppoiment,
  getAllAppoiments,
  getOneAppoiment,
  deleteAppoiment,
  confirmAppoinment
} = require('../controllers/appoiments.controller')

router.get('/', catchErrors(getAllAppoiments('client')))
router.get('/emp', catchErrors(getAllAppoiments('employee')))
router.post('/user/:id', catchErrors(createAppoiment))

router.get('/:id', catchErrors(getOneAppoiment))
router.patch('/:id/confirm', catchErrors(confirmAppoinment))
router.patch('/:id', catchErrors(editAppoiment))
router.post('/:id', catchErrors(editAppoiment))
router.delete('/:id', catchErrors(deleteAppoiment))

module.exports = router
