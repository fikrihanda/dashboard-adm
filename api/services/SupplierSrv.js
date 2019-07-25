module.exports = {
  async find(query) {
    try {
      let supplier = await Supplier.find(query)
      return supplier
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
      let supplier = await Supplier.findOne(query)
      return _.isUndefined(supplier) ? {} : supplier
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
      let {name, street, bank, phone} = field
      let supplier = await Supplier.create({
        name, street, bank, phone
      }).fetch()
      return supplier
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
      let {id, name, street, bank, phone} = field
      let supplier = await Supplier.updateOne({id}).set({
        name, street, bank, phone
      })
      return supplier
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
      await Supplier.destroy({id})
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
