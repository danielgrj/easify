const Location = require('./../models/Location')

exports.createLocation = async (req, res) => {
  const { address, lat, lng } = req.body
  await Location.create({ address, coordinates: { lat, lng }, userId: req.user.id })
  res.status(201).send()
}

exports.getOneLocation = async (req, res) => {
  const location = await Location.findOne({ _id: req.params.id, userId: req.user.id })

  res.status(200).send(location)
}

exports.getAllLocations = async (req, res) => {
  const locations = await Location.find({ userId: req.user.id })

  res.status(200).send(locations)
}

exports.editLocation = async (req, res) => {
  const update = {}
  for (key in req.body) {
    update[key] = req.body[key]
  }

  await Location.findByIdAndUpdate(req.params.id, update)
  res.status(200).send()
}

exports.deleteLocation = async (req, res) => {
  await Location.findByIdAndDelete(req.params.id)
  res.status(200).send()
}
