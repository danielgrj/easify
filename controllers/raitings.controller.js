const Rating = require('./../models/Rating')
const Occupation = require('./../models/Occupation')

exports.getAllRaitings = async (req, res) => {
  const { id: employeeId } = req.params
  const raitings = await Rating.find({ employeeId })

  res.status(200).send(raitings)
}

exports.getOneRaiting = async (req, res) => {
  const { id: employeeId, raitingId: _id } = req.params
  const { id: userId } = req.userId

  const raiting = await Rating.findOne({ employeeId, userId, _id })

  if (!raiting) return res.status(404).send()
  res.status(200).send(raiting)
}

exports.createRaiting = async (req, res) => {
  const { id: employeeId } = req.params
  const { id: userId } = req.user
  const { content, calification } = req.body

  if (employeeId === userId) return res.status(403).send()
  const rating = await Rating.create({ employeeId, userId, content, calification })
  const ratings = await Rating.find({ employeeId })

  console.log(ratings)

  const ratingNumber = parseInt(
    (
      ratings.reduce((accum, { calification }) => {
        return accum + calification
      }, 0) / ratings.length
    ).toFixed(2)
  )

  // console.log(ratingNumber)

  await Occupation.findOneAndUpdate({ userId: employeeId }, { rating: ratingNumber })
  res.send(rating)
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
