module.exports = {
  async find(query) {
    try {
      let barangs = await Barang.find(query).populate('kategori')
      return barangs
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
      let barang = await Barang.findOne(query).populate('kategori')
      return _.isUndefined(barang) ? {} : barang
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
  async add(field) {
    try {
      let {name, qty, price, kategori} = field
      let barang = await Barang.create({
        name, qty, price, kategori
      }).fetch()
      let kat = await Kategori.findOne({
        id: barang.kategori
      })
      if (_.isEmpty(kat)) return Promise.reject(
        ErrorSrv({
          name: 'KategoriNotFound',
          code: 'E_KATEGORI_NOTFOUND',
          message: 'Kategori tidak ada'
        })
      )
      barang.kategori = kat
      return barang
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
