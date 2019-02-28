const errors = {

  error (type, message) {
    return { type, message }
  },

  notFound (msg) {
    msg = msg || 'Entity not found.'
    return errors.error('NotFoundError', msg)
  },

  unexpected (msg) {
    msg = msg || 'An unexpected error occurred.'
    return errors.error('UnexpectedError', msg)
  },

  upstream (msg) {
    msg = msg || 'Error while communicating with upstream service.'
    return errors.error('UpstreamError', msg)
  }

}

module.exports = errors
