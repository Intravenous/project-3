//Need to complete address for user once confirmed by Pete
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const { secret } = require('../config/enviroment')

function register(req, res) {
  User
    .create(req.body)
    .then(user => {
      res.status(201).send(user)
    })
    .catch(error => res.status(401).send(error))
}

function login(req, res) {
  // Try and login with email and password
  User
    // Find the user by using the email they're trying to login with
    .findOne({ email: req.body.email })
    .then(user => {
      if (!user) return res.status(400).send({ message: 'User does not exist' })
      else if (!user.validatePassword(req.body.password)) {
        return res.status(401).send({ message: 'Unauthorized' })
      }
      // We now know the user is valid, and know that their email & password that they are trying to log in with matches what we have saved

      // jwt creates the token for us

      //NOTE - PG => This is where we will implement an if and send a message as to weather to send them to the categories selector page, otherwise we will also return the list of user catergories

      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '8h' })
      res.status(202).send({ message: `Welcome back ${user.username}`, token })
    })

    .catch(error => res.send(error))
}

function profile(req, res) {
  res.send({ catergories: ['hardcover-fiction', 'hardcover-nonfiction'], username: 'PeteG' })
  // profile code goes here
}

module.exports = {
  register,
  login,
  profile
}