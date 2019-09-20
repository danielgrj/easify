const router = require('express').Router()
const uploadCloud = require('./../config/multer')
const { checkRole } = require('./../middleware')
const {
  getEmpPublicProfile,
  getEmpPrivateProfile,
  getPrivateProfile,
  uploadProfileImage
} = require('../controllers/user.controller')

router.get('/profile', getPrivateProfile)
router.post('/profile/edit/avatar', uploadCloud.single('avatar'), uploadProfileImage)

router.get('/emp/profile', checkRole, getEmpPrivateProfile)
router.get('/emp/:id', getEmpPublicProfile)

module.exports = router
