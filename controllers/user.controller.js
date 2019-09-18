const User = require('./../models/User')
const Appoiment = require('./../models/Appoiment')
const Raiting = require('./../models/Rating')
const Occupation = require('./../models/Occupation')
const Locations = require('./../models/Location')

exports.getEmpPrivateProfile = async (req, res) => {
  const { id } = req.user
  const user = await User.findById(id)
  const occupation = await Occupation.findOne({ userId: id })
  const locations = await Locations.find({ userId: id })
  const appoiments = await Appoiment.find({ employeeId: id }).populate('clientId')
  const ratings = await Raiting.find({ employeeId: id })

  res.render('user/emp-private-profile.hbs', { user, occupation, locations, appoiments, ratings })
}

exports.getPrivateProfile = async (req, res) => {
  const { id } = req.user
  const user = await User.findById(id)
  const locations = await Locations.find({ userId: id })
  const appoiments = await Appoiment.find({ clientId: id }).populate('employeeId')
  const ratings = await Raiting.find({ userId: id })

  res.render('user/private-profile', { user, locations, appoiments, ratings })
}

exports.getEmpPublicProfile = async (req, res) => {
  const { id } = req.params
  const { user } = req
  const employee = await User.findById(id)
  const occupation = await Occupation.findOne({ userId: id })
  const rating = await Raiting.findOne({ userId: user.id })
  const ratings = await Raiting.find({ employeeId: id }).populate('userId')
  const locations = await Locations.find({ userId: user.id })
  const locationsData = {
    locations,
    areLocations: !!locations.length
  }

  ratings.forEach(rating => {
    const stars = []

    if (rating) {
      for (let i = 0; i < rating.calification; i++) {
        stars.push('')
      }
    }

    rating.stars = stars
  })

  res.render('user/emp-public-profile', { user, employee, occupation, ratings, locationsData })
}

exports.uploadProfileImage = async (req, res) => {
  const { url: avatar } = req.file
  const { id } = req.user
  const user = await User.findByIdAndUpdate(id, { avatar })

  res.redirect('back')
}
