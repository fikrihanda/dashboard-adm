module.exports = {
  async find(query) {
    try {
      let kategori = await Kategori.find(query)
      return kategori
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
      let kategori = await Kategori.findOne(query)
      return _.isUndefined(kategori) ? {} : kategori
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
      let {name} = field
      let kategori = await Kategori.create({name}).fetch()
      return kategori
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
  async update(field) {
    try {
      let {name, id} = field
      let kategori = await Kategori.updateOne({id}).set({name})
      return kategori
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
  async delete(field) {
    try {
      let {id} = field
      await Kategori.destroy({id})
      return Promise.resolve()
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
