const Appoiments = require('./../models/Appoiment')
const moment = require('moment')

exports.createAppoiment = async (req, res) => {
  const { address: locationId, date: dateString } = req.body
  const { id: employeeId } = req.params
  const { id: clientId } = req.user.id

  const date = moment(dateString)

  if (employeeId === clientId) return res.status(403).send()
  await Location.create({ locationId, employeeId, clientId, date })
}

exports.getAllAppoiments = (user) => (req, res) => {
  const { id } = req.user;
  let appoiments

  if(user === 'employee') {
    appoiments = await Location.find({ employeeId: id })
  } else if(user === 'client') {
    appoiments = await Location.find({ clientId: id })
  }
  
  res.status(200).send(appoiments);
}