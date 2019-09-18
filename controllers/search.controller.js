const Occupation = require('./../models/Occupation')
const Appointment = require('./../models/Appoiment')
const Location = require('./../models/Location')
const moment = require('moment')

exports.filterOccupations = async (req, res, next) => {
  // const

  const {
    occupation: type,
    lng = [],
    lat = [],
    rating = 0,
    dateStart = moment(),
    dateEnd = moment().endOf('month'),
    page = 1,
    limit = 10,
    sort = 'raiting'
  } = req.query

  const [lngMinBound, lngMaxBound] = lng
  const [latMinBound, latMaxBound] = lat

  // location: {
  //   coordinates: {
  //     lng: {
  //       $and: [{ $gte: lngMinBound }, { $lte: lngMaxBound }]
  //     },
  //     lat: {
  //       $and: [{ $gte: latMinBound }, { $lte: latMaxBound }]
  //     }
  //   }
  // }

  const queries = {
    rating: {
      $gte: rating
    }
  }

  if (type) queries.type = type

  const occupations = await Occupation.find(queries)
    .limit(limit)
    .skip(limit * (page - 1))
    .sort(sort)

  req.occupations = occupations
  next()
}

exports.getSearchPage = (req, res) => {
  res.render('search', { occupations: req.occupations })
}

exports.getOccupations = (req, res) => {
  res.status(200).send(req.occupations)
}
