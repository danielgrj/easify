const router = require('express').Router()
const uploadCloud = require('./../config/multer')
const { checkRole } = require('./../middleware')
const { getEmpPublicProfile, getEmpPrivateProfile, getPrivateProfile } = require('../controllers/user.controller')

router.get('/profile', getPrivateProfile)
router.post('/profile/edit/avatar', uploadCloud.single('avatar'))

router.get('/emp/profile', getEmpPrivateProfile)
router.get('/emp/:id', getEmpPublicProfile)

module.exports = router
