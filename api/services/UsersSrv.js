module.exports = {
  async find(query) {
    try {
      if (!_.has(query, 'select') && !_.isEmpty(query)) query = {
        ...query,
        select: ['name', 'email', 'avatar']
      }
      let user = await Users.find(query)
      return user
    } catch (err) {
      return Promise.reject(
        ErrorSrv({
          name: err.name || 'serverError',
          code: err.code || 'E_SERVER_ERROR',
          message: err.message || err.detail || 'Server Error'
        }, err)
      )
    }
  },
  async findOne(query) {
    try {
      let user = await Users.findOne(query)
      return _.isUndefined(user) ? {} : _.pick(user, ['name', 'email', 'avatar'])
    } catch (err) {
      return Promise.reject(
        ErrorSrv({
          name: err.name || 'serverError',
          code: err.code || 'E_SERVER_ERROR',
          message: err.message || err.detail || 'Server Error'
        }, err)
      )
    }
  }
}
