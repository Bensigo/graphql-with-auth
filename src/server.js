const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const cors = require('cors')
const {graphiqlExpress, graphqlExpress} = require('apollo-server-express')
const morgan = require('morgan')

// require app modules 
const config = require('./config/config')
const schema = require('./graphql')
const DB = require('./models')
const auth = require('./config/auth')

// making instance of app
const app = express()

// setting up middlewares
app.use(cors()) // TODO: add origin for the fontend 
app.use(morgan('dev'))
app.use(auth)

// setup graphiql and graphql server
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}))

app.use('/graphql', bodyParser.json(), graphqlExpress(req => ({
  schema,
  context: {
    DB
  }
})))

// connect to DB 
mongoose.connect(config.DBURI, () => {
  console.log('connected to DB successfully')
})

// start app server 
app.listen(config.PORT, () => {
  console.log('starting up graphql server')
})
