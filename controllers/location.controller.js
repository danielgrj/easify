const Location = require('./../models/Location')

exports.createLocation = async (req, res) => {
  const { address, lat, lng } = req.body
  await Location.create({ address, coordinates: { lat, lng }, userId: req.user.id })
  res.status(201).send(location)
}

exports.getOneLocation = async (req, res) => {
  const location = await Location.findOne({ _id: req.params.id, userId: req.user.id })

  if (!location) res.status(404).send(location)
  res.status(200).send(location)
}

exports.getAllLocations = async (req, res) => {
  const locations = await Location.find({ userId: req.user.id })

  res.status(200).send(locations)
}

exports.editLocation = async (req, res) => {
  const { id: _id } = req.params
  const { id: userId } = req.user
  const update = {}
  for (key in req.body) {
    update[key] = req.body[key]
  }

  const location = await Location.findOneAndUpdate({ _id, userId }, update)

  if (!location) return res.status(404).send()
  res.status(200).send(location)
}

exports.deleteLocation = async (req, res) => {
  const { id: _id } = req.params
  const { id: userId } = req.user
  const location = await Location.findOneAndDelete({ _id, userId })

  if (!location) return res.status(404).send()
  res.status(200).send()
}
