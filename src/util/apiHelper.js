const rp = require('request-promise')
const config =  require('../config')

/**
 * Remote API helper. Wraps methods for sending requests to remote servers.
 */
class APIHelper {
  /**
   * APIHelper constructor
   * @param opts - holds api key and baseUrl and initial path values.
   * @constructor
   */
  constructor (opts) {
    this.baseUrl = opts.baseUrl
    this.headers = opts.headers || {}
    this.req = opts.req || {}
  }

  /**
   * Makes a GET request to the given endpointUrl. Returns a Promise.
   * @param endpointUrl
   * @param config override default
   * @returns {Object|Function}
   * @returns {Promise}
   */
  get (endpointUrl, config = {}) {
    return this.request(endpointUrl, Object.assign({method: 'GET'}, config))
  }

  /**
   * Makes a POST request to the given endpointUrl. Returns a Promise.
   * @param endpointUrl
   * @param body object sent as the body of the request
   * @param config override settings
   * @returns {Promise}
   */
  post (endpointUrl, body, config = {}) {
    return this.request(endpointUrl, Object.assign({method: 'POST', body: body}, config))
  }

  /**
   * Makes a PUT request to the given endpointUrl. Returns a Promise.
   * @param endpointUrl
   * @param body object sent as the body of the request
   * @param config override settings
   * @returns {Promise}
   */
  put (endpointUrl, body, config = {}) {
    return this.request(endpointUrl, Object.assign({method: 'PUT', body: body}, config))
  }

  /**
   * Makes a PATCH request to the given endpointUrl. Returns a Promise.
   * @param endpointUrl
   * @param body object sent as the body of the request
   * @param config override settings
   * @returns {Promise}
   */
  patch (endpointUrl, body, config = {}) {
    return this.request(endpointUrl, Object.assign({method: 'PATCH', body: body}, config))
  }

  /**
   * Makes a DELETE request to the given endpointUrl. Returns a Promise.
   * @param endpointUrl
   * @param body object sent as the body of the request
   * @param config override settings
   * @returns {Promise}
   */
  delete (endpointUrl, body, config = {}) {
    return this.request(endpointUrl, Object.assign({method: 'DELETE', body: body}, config))
  }

  /**
   * Makes a request to the given endpointUrl. Returns a Promise.
   * @param endpointUrl
   * @param opts override default
   * @returns {Promise}
   */
  request (endpointUrl, opts = {}) {
    const options = {
      url: this.baseUrl + endpointUrl,
      json: true,
      resolveWithFullResponse: true,
      simple: true,
      timeout: config.outboundRequestTimeout
    }
    // Merge request options
    if (opts) Object.assign(options, opts, {headers: Object.assign({}, opts.headers || {}, this.headers)})

    console.log(`${options.method} ${options.url}`)

    // Return promise
    return rp(options).promise()
      .then((resp) => {
        return resp.body
      })
      .catch((error) => {
        return error
      })
  }
}

module.exports = APIHelper