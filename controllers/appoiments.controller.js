const Appoiment = require('./../models/Appoiment')
const Location = require('./../models/Location')
const moment = require('moment')
const transport = require('./../config/sendMail')

exports.createAppoiment = async (req, res) => {
  const { locationId, date: dateString } = req.body
  const { id: employeeId } = req.params
  const { id: clientId } = req.user

  const date = moment(dateString)

  if (employeeId === clientId) return res.status(403).send()
  const appoiment = await Appoiment.create({ locationId, employeeId, clientId, date })

  res.status(200).send(appoiment)
}

exports.getAllAppoiments = user => async (req, res) => {
  const { id } = req.user
  let appoiments

  if (user === 'employee') {
    appoiments = await Appoiment.find({ employeeId: id })
  } else if (user === 'client') {
    appoiments = await Appoiment.find({ clientId: id })
  }

  res.status(200).send(appoiments)
}

exports.getOneAppoiment = async (req, res) => {
  const { id } = req.user
  const { id: _id } = req.params
  const appoiment = await Appoiment.findOne({ _id, $or: [{ clientId: id }, { employeeId: id }] })

  if (!appoiment) return res.status(404).send()

  res.status(200).send(appoiment)
}

exports.editAppoiment = async (req, res) => {
  const enabledUpdates = ['date', 'locationId']
  const update = {}
  for (key in req.body) {
    if (enabledUpdates.includes(key)) {
      update[key] = req.body[key]
      if (key === 'date') update[key] = moment(req.body[key])
    }
  }
  const { _id } = req.body
  const { id: clientId } = req.user
  const { id: employeeId } = req.params

  const appoiment = await Appoiment.findOneAndUpdate({ _id, $or: [{ clientId }, { employeeId }] }, update)

  if (!appoiment) return res.status(404).send()
  res.redirect('back')
}

exports.deleteAppoiment = async (req, res) => {
  const { id } = req.user
  const { id: _id } = req.params

  const appoiment = await Appoiment.findOneAndRemove({ _id, $or: [{ clientId: id }, { employeeId: id }] })

  if (!appoiment) return res.status(404).send()
  res.status(200).send()
}

exports.setToActive = async (req, res) => {
  const { id } = req.body

  const appoiment = await Appoiment.findByIdAndUpdate(id, { active: true })

  if (!appoiment) res.status(404).send()

  res.status(200).send(appoiment)
}
