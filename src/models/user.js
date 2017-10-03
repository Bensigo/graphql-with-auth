const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config/config')
// user schema 
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: String
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})
// user methods
userSchema.statics.createUser = async (email, username, password) => {
  // make new instance of user 
  const user = await new User({email, username, password})
  // hash user password then return the user
  user.password = await bcryptjs.hash(user.password, 10)
  return user.save()
}
userSchema.statics.auth = async (email, password) => {
  // check if user exits
  const user = await User.findOne({email})
  if (!user) {
    throw new Error('user not found')
  }
  // if user, verify the user password with the password provided
  const verify = await bcryptjs.compare(password, user.password)
  if (!verify) {
    throw new Error('password not match')
  }
  // assign the user a token 
  const token = jwt.sign({
    user
  }, config.SECRET, {
    expiresIn: '2d'
  })
  return token
}
// making a user colloection from schema
const User = mongoose.model('User', userSchema)

/// export user model
module.exports = User
