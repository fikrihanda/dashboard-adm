module.exports = {
  attributes: {
    name: 'string',
    qty: 'number',
    price: 'number',
    kategori: {
      model: 'kategori'
    },
    penbar: {
      collection: 'penbar',
      via: 'barang'
    }
  },
  async beforeCreate(valSet, next) {
    try {
      let kat = await Kategori.findOne({
        id: valSet.kategori
      })
      if (_.isUndefined(kat)) return next(
        ErrorSrv({
          name: 'KategoriNotFound',
          code: 'E_KAT_NOTFOUND',
          message: 'Kategori tidak ada'
        })
      )
      return next()
    } catch (err) {
      return next(err)
    }
  },
  async beforeUpdate(valSet, next) {
    try {
      if (
        _.isEmpty(valSet.kategori) && (!_.isNumber(valSet.kategori) || valSet.kategori === 0)
      ) return next()
      let kat = await Kategori.findOne({
        id: valSet.kategori
      })
      if (_.isUndefined(kat)) return next(
        ErrorSrv({
          name: 'KategoriNotFound',
          code: 'E_KAT_NOTFOUND',
          message: 'Kategori tidak ada'
        })
      )
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
