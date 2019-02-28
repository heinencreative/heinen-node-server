const express = require('express')
const config = require('./config')
const routes = require('./routes')
const router = express.Router()

const app = express()

// Setup Routes
routes(app)

// Listen to Port
app.listen(config.port, function () {
  console.log(`Server listening on port: ${config.port}`)
})