module.exports = {
  async index(req, res) {
    try {
      if (req.method !== 'GET') return res.notFound()
      let param = req.allParams()
      let bar
      if (_.has(param, 'find')) bar = await BarangSrv.find(param.find)
      else if (_.has(param, 'findOne')) bar = await BarangSrv.findOne(param.findOne)
      else bar = await BarangSrv.find({})
      res.json(bar)
    } catch (err) {
      res.serverError(err)
    }
  },
  async add(req, res) {
    try {
      if (req.method !== 'POST') return res.notFound()
      let barang = await BarangSrv.add(req.allParams())
      res.json(barang)
    } catch (err) {
      if (err.name === 'KategoriNotFound')
        return res.badRequest({
          name: err.name,
          message: err.message
        })
      res.serverError(err)
    }
  }
}
