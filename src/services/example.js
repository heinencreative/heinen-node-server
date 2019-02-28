const APIHelper = require('../util/apiHelper')
const config = require('../config')

const svcConf = {
  baseUrl: config.randomCatsAPIURL
}

/**
 * Service helper for interacting with the Random Cats API.
 */
class ExampleService extends APIHelper {
  /**
   * @param {Object} req - This endpoint's Express request object
   * @constructor
   */
  constructor (req) {
    const conf = Object.assign({}, svcConf, {req})
    super(conf)
  }

  /**
   * Fetches partner data.
   * @param {Object} opts - optional
   * @returns {Promise}
   */
  getCat (opts = {}) {
    const endpointUrl = `/meow`
    const dataOpts = Object.assign({}, opts)

    return this.get(endpointUrl, dataOpts)
      .tapCatch(err => console.log(`error retrieving: ${endpointUrl}`, err))
  }
}

module.exports = ExampleService
