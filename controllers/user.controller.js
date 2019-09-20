const User = require('./../models/User')
const Appoiment = require('./../models/Appoiment')
const Raiting = require('./../models/Rating')
const Occupation = require('./../models/Occupation')
const Locations = require('./../models/Location')
const moment = require('moment')

exports.getEmpPrivateProfile = async (req, res) => {
  const { id } = req.user
  const user = await User.findById(id)
  const occupation = await Occupation.findOne({ userId: id })
  const locations = await Locations.find({ userId: id })
  const appoiments = await Appoiment.find({ employeeId: id }).populate('clientId')
  const ratings = await Raiting.find({ employeeId: id })
  const defaultLocation = await Locations.findOne({ userId: id, default: true })

  const today = moment().format('YYYY-MM-DD')

  const currentMonthAppoinment = appoiments.filter(({ date }) =>
    moment(date).isBetween(moment().startOf('month'), moment().endOf('month'))
  )

  const uniqueDays = currentMonthAppoinment.reduce((accum, { date }) => {
    if (!accum.includes(moment(date).format('DD'))) accum.push(moment(date).format('DD'))
    return accum
  }, [])

  const appoinmentsPerDay = uniqueDays.map(day => {
    return currentMonthAppoinment.filter(({ date }) => moment(date).format('DD') == day).length
  })

  const activeAppoiments = appoiments.filter(({ date }) => moment(date).isAfter(moment()))

  activeAppoiments.forEach(appoiment => {
    appoiment.humanDate = moment().to(appoiment.date)
  })

  activeAppoiments.sort((a, b) => moment(a.date).valueOf() - moment(b.date).valueOf())

  if (defaultLocation) user.defaultAddress = defaultLocation.address

  const locationsData = {
    locations,
    areLocations: !!locations.length
  }

  res.render('user/emp-private-profile.hbs', {
    user,
    occupation,
    locationsData,
    locations,
    appoiments: activeAppoiments,
    ratings,
    today,
    uniqueDays,
    appoinmentsPerDay
  })
}

exports.getPrivateProfile = async (req, res) => {
  const { id } = req.user
  const user = await User.findById(id)
  const locations = await Locations.find({ userId: id })
  const appoiments = await Appoiment.find({ clientId: id }).populate('employeeId')
  const ratings = await Raiting.find({ userId: id })
  const defaultLocation = await Locations.findOne({ userId: id, default: true })

  const activeAppoiments = appoiments.filter(({ date }) => moment(date).isAfter(moment()))

  const today = moment().format('YYYY-MM-DD')

  activeAppoiments.sort((a, b) => moment(b).valueOf() - moment(a).valueOf())

  activeAppoiments.forEach(appoiment => {
    appoiment.humanDate = moment().to(appoiment.date)
  })

  if (defaultLocation) user.defaultAddress = defaultLocation.address

  const locationsData = {
    locations,
    areLocations: !!locations.length
  }

  res.render('user/private-profile', { user, locationsData, appoiments, ratings, appoiments: activeAppoiments, today })
}

exports.getEmpPublicProfile = async (req, res) => {
  const { id } = req.params
  const { user } = req
  const employee = await User.findById(id)
  const occupation = await Occupation.findOne({ userId: id })
  const rating = await Raiting.findOne({ userId: user.id })
  const ratings = await Raiting.find({ employeeId: id }).populate('userId')
  const locations = await Locations.find({ userId: user.id })
  const appoiments = await Appoiment.find({ employeeId: id })
  const time = moment(occupation.createdAt).fromNow(true)
  const appoimentsTimes = appoiments.length
  const today = moment().format('YYYY-MM-DD')
  const defaultLocation = await Locations.findOne({ userId: id, default: true })
  const defaultClientLocation = await Locations.findOne({ userId: user.id, default: true })

  const locationsData = {
    today,
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

  res.render('user/emp-public-profile', {
    user,
    employee,
    occupation,
    ratings,
    locationsData,
    time,
    appoimentsTimes,
    defaultLocation,
    defaultClientLocation
  })
}

exports.uploadProfileImage = async (req, res) => {
  const { url: avatar } = req.file
  const { id } = req.user
  const user = await User.findByIdAndUpdate(id, { avatar })

  res.redirect('back')
}
