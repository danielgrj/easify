const Rating = require('./../models/Rating')

exports.getAllRaitings = async (req, res) => {
  const { id: employeeId } = req.params
  const raitings = await Rating.find({ employeeId })

  res.status(200).send(raitings)
}

exports.getOneRaiting = async (req, res) => {
  const { id: employeeId, raitingId: _id } = req.params
  const { id: userId } = req.userId

  const raiting = await raiting.findOne({ employeeId, userId, _id })

  if (!raiting) return res.status(404).send()
  res.status(200).send(raiting)
}

exports.createRaiting = async (req, res) => {
  const { id: employeeId } = req.params
  const { id: userId } = req.userId
  const { content, calification } = req.body

  if (employeeId === userId) return res.status(403).send()
  const raiting = await Rating.create({ employeeId, userId, content, calification })

  res.send(raiting)
}

exports.editRaiting = async (req, res) => {
  const enabledUpdates = ['content', 'calification']
  const { id: userId } = req.user
  const { id: employeeId } = req.params
  const updates = {}

  for (key in req.body) {
    if (enabledUpdates.includes(key)) user[key] = req.body[key]
  }

  const raiting = await Rating.findOneAndUpdate({ userId, employeeId }, updates)

  if (!raiting) return res.status(404).send()
  res.status(200).send(raiting)
}

exports.deleteRaiting = async (req, res) => {
  const { id: userId } = req.user
  const { id: employeeId } = req.params

  const raiting = await Rating.findOneAndRemove({ userId, employeeId })

  if (!raiting) return res.status(404).send()
  res.status(200).send(raiting)
}
