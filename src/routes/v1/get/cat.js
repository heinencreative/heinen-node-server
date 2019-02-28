const { StatusCodeError } = require('request-promise/errors')
const BaseRouteHandler = require('../../../util/baseRouteHandler')

class GetCat extends BaseRouteHandler {
  constructor (req, res) {
    super(req, res)

    this.exampleSVC.getCat()
      .then(cat => {
        res.send(cat)
      })
      .catch(StatusCodeError, err => this.handleStatusCodeError(err))
      .catch(err => this.handleUnexpectedError(err))
  }
}

module.exports = (req, res) => new GetCat(req, res)
