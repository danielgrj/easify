require('dotenv').config()

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
const hbs = require('hbs')
const session = require('express-session')
const passport = require('./config/passport')

const { isLoggedOut } = require('./middleware')
const { logoutUser } = require('./controllers/auth.controller')

const indexRoutes = require('./routes/index')
const authRoutes = require('./routes/auth')
const locationRoutes = require('./routes/locations')
const appoimentsRoutes = require('./routes/appoiments')

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
app.get('/auth/logout', logoutUser)
app.use('/auth/', isLoggedOut, authRoutes)
app.use('/locations', locationRoutes)
app.use('/appoiments', appoimentsRoutes)

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is up on http://localhost:${process.env.PORT}`)
})
