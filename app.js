require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const hbs = require('hbs');
const path = require('path');

const app = express();

const indexRoutes = require('./routes/index');

mongoose
  .connect(process.env.DB, { useNewUrlParser: true })
  .then(res => {
    console.log(`Connected to Mongo! Database name: "${res.connections[0].name}"`);
  })
  .catch(err => console.error('Error connecting to mongo', err));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);

app.listen(process.env.PORT, (req, res) => {
  console.log(`Server is up on http://localhost:${process.env.PORT}`);
});
