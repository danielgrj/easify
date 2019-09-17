const router = require('express').Router()
const { getPrivateProfile } = require('./../controllers/employee.controller')

router.get('/user/emp/perfil', getPrivateProfile)

module.exports = router
