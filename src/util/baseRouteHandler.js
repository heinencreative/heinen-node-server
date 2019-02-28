const ExampleService = require('../services/example')
const errors = require('./responseErrors')

/**
 * Provides a common base for v1 route handlers
 */
class BaseRouteHandler {
  /**
   * Constructor
   * @param {object} req - express request object
   * @param {object} res - express response object
   */
  constructor (req, res) {
    this.req = req
    this.res = res
  }

  handleStatusCodeError (err) {
    console.log('handleStatusCodeError', { err })
    if (/^422/.test(err.statusCode) || /^403/.test(err.statusCode)) {
      return this.res.status(err.statusCode).send(err)
    }
    if (/^4/.test('' + err.statusCode)) {
      return this.res.status(404).send({ error: errors.notFound() })
    }
    return this.res.status(502).send({ error: errors.upstream() })
  }

  handleUnexpectedError (err) {
    console.log('handleUnexpectedError', err)
    this.res.status(500).send({ error: errors.unexpected() })
  }

  /**
   * Creates an instance of ExampleService and returns it (memoized)
   * @return {ExampleService}
   */
  get exampleSVC () {
    if (!this._exampleSVC) {
      this._exampleSVC = new ExampleService(this.req)
    }
    return this._exampleSVC
  }
}

module.exports = BaseRouteHandler
