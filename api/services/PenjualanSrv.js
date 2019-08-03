module.exports = {
  async find(query) {
    try {
      let penjualan = await Penjualan.find(query).populate('penbar')
      return penjualan
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
      let penjualan = await Penjualan.findOne(query).populate('penbar')
      return _.isUndefined(penjualan) ? {} : penjualan
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
