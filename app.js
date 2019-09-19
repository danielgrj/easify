require('dotenv').config()

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const hbs = require('hbs')
const session = require('express-session')
const passport = require('./config/passport')

const indexRoutes = require('./routes/index')
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const locationRoutes = require('./routes/locations')
const appoimentsRoutes = require('./routes/appoiments')
const raitingsRoutes = require('./routes/raitings')
const searchRoutes = require('./routes/search')

const { isLoggedIn } = require('./middleware')

const app = express()

app.use(
  session({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24
    },
    secret: process.env.SECRET
  })
)

app.use(passport.initialize())
app.use(passport.session())

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(res => {
    console.log(`Connected to Mongo! Database name: "${res.connections[0].name}"`)
  })
  .catch(err => console.error('Error connecting to mongo', err))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, '/views/partials'))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRoutes)
app.use('/', searchRoutes)
app.use('/auth/', authRoutes)
app.use('/user', isLoggedIn, userRoutes)
app.use('/locations', isLoggedIn, locationRoutes)
app.use('/appoiments', isLoggedIn, appoimentsRoutes)
app.use('/ratings', isLoggedIn, raitingsRoutes)

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is up on http://localhost:${process.env.PORT}`)
})
