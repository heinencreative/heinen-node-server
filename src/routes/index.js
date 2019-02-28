const getRoutes = require('./v1/get')

module.exports = function (app) {
  app.get('/', (req, res) => res.send('Hello!'))
  app.get('/v1/cat', getRoutes.cat)
}