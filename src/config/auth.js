const jwt = require('jsonwebtoken')
const config = require('./config')

module.exports = async req => {
  // check for token in headers 
  const token = req.headers.authorization
  try {
    const {user} = await jwt.verify(token, config.SECRET)
    // asign the user to req.user
    req.user = user
  } catch (err) {
    console.log(err)
  }
}
