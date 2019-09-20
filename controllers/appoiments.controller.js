const Appoiment = require('./../models/Appoiment')
const Location = require('./../models/Location')
const User = require('./../models/User')
const moment = require('moment')
const transport = require('./../config/sendMail')

exports.createAppoiment = async (req, res) => {
  const { locationId, date: dateString } = req.body
  const { id: employeeId } = req.params
  const { id: clientId, name, email } = req.user

  const { name: nameEmployee, email: emailEmployee } = await User.findById(employeeId)

  const date = moment(dateString)

  if (employeeId === clientId) return res.status(403).send()
  const appoiment = await Appoiment.create({ locationId, employeeId, clientId, date, clientConfirmation: true })

  const text = `
    ${name}, you have booked an appoinment with ${nameEmployee} for the ${dateString}
    <br>
    We will notify you when ${nameEmployee} accept your request.
    <br>
    You can see your current appoinments status <a href="${process.env.HOSTURL}/user/profile">
       here
    </a>
  `
  const textEmployee = `
    ${nameEmployee},  
    <br>
    ${name} has just booked an appoinment with you for the ${dateString}. Don't make your client wait, confirm 
    your attendance directly from your <a href="${process.env.HOSTURL}/user/emp/profile">
       profile
    </a>
  `

  await transport.sendMail({
    from: `"Raudo" <${process.env.EMAIL}>`,
    to: email,
    subject: 'Appoinment confirmation',
    text,
    html: `
      <p>${text}</p>
    `
  })

  await transport.sendMail({
    from: `"Raudo" <${process.env.EMAIL}>`,
    to: emailEmployee,
    subject: `${name} wants to hire you`,
    text: textEmployee,
    html: `
      <p>${textEmployee}</p>
    `
  })

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

  appoiment = await Appoiment.findOneAndRemove({ _id, $or: [{ clientId: id }, { employeeId: id }] })
    .populate('clientId')
    .populate('employeeId')

  const {
    clientId: { name, email, _id: clientId },
    employeeId: { name: nameEmployee, email: emailEmployee, _id: employeeId },
    date: dateString
  } = appoiment

  const clientCancelConfirmation = `
    ${name}, you have canceled an appoinment with ${nameEmployee} for the ${dateString}
    <br>
    We are sorry to hear that you will find the right person on Raudo. Maybe you want to <a href=${process.env.HOSTURL}/emp/profile/${employeeId} booked an appoinment for a different date.</a>.
    <br>
    <a href="${process.env.HOSTURL}/search">
      Or search for another person.
    </a>
  `

  const employeeCancelConfirmation = `
    ${nameEmployee},  
    <br>
    You have canceled an appoinment with ${name} for the ${dateString}. We are sorry to hear that, but
    don't worry we will notify your client inmediatly.
    <br>
    To see your current appoinments click <a href="${process.env.HOSTURL}/user/emp/profile">
       here
    </a>
  `
  const clientCancelNotify = `
    ${name}, we are sorry to let you know that ${nameEmployee} has just cancel your appoinment for the ${dateString}
    <br>
    But don't worry, we are sure that.
    <br>
    <a href="${process.env.HOSTURL}/search">
      You can find more experts on Raudo
    </a>
    avaible for your desire date.
  `

  const employeeCancelNotify = `
    ${nameEmployee},  
    <br>
    We are sorry to let you know that ${name} has just cancel an appoinment with you for the ${dateString}. 
    <br>
    To see your current appoinments click <a href="${process.env.HOSTURL}/user/emp/profile">
       here
    </a>
  `

  await transport.sendMail({
    from: `"Raudo" <${process.env.EMAIL}>`,
    to: email,
    subject: 'Appoinment cancel',
    text: id == clientId ? clientCancelConfirmation : clientCancelNotify,
    html: `
      <p>${id == clientId ? clientCancelConfirmation : clientCancelNotify}</p>
    `
  })

  await transport.sendMail({
    from: `"Raudo" <${process.env.EMAIL}>`,
    to: emailEmployee,
    subject: `Appoinment cancel`,
    text: id == employeeId ? employeeCancelConfirmation : employeeCancelNotify,
    html: `
      <p>${id == employeeId ? employeeCancelConfirmation : employeeCancelNotify}</p>
    `
  })

  if (!appoiment) return res.status(404).send()
  res.status(200).send()
}

exports.confirmAppoinment = async (req, res) => {
  const { id } = req.user
  const { id: _id } = req.params

  const appoiment = await Appoiment.findOne({ _id, $or: [{ clientId: id }, { employeeId: id }] })

  if (!appoiment) res.status(404).send()
  if (appoiment.active) return res.status(400).send()

  console.log('lodelid', id)
  console.log('lodelappoinment', appoiment.employeeId)

  if (id == appoiment.employeeId) {
    appoiment.employeeConfirmation = true
  } else if (id == appoiment.clientId) {
    appoiment.clientConfirmation = true
  }

  if (appoiment.employeeConfirmation && appoiment.clientConfirmation) appoiment.active = true

  await appoiment.save()

  res.status(200).send(appoiment)
}
