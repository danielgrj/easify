const User = require('./../models/User')
const Appoiment = require('./../models/Appoiment')
const Raiting = require('./../models/Rating')
const Occupation = require('./../models/Occupation')
const Locations = require('./../models/Location')

exports.getPrivateProfile = async (req, res) => {
  const { id } = req.user
  const user = await User.findById(id)
  const occupation = await Occupation.findOne({ userId: id })
  const locations = await Locations.find({ userId: id })
  const appoiments = await Appoiment.find({ employeeId: id }).populate('clientId')
  const ratings = await Raiting.find({ employeeId: id })

  console.log(appoiments)

  res.render('employee/private-perfil.hbs', { user, occupation, locations, appoiments, ratings })
}
