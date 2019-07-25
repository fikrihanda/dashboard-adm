module.exports = {
  async index(req, res) {
    try {
      if (req.method !== 'GET') return res.notFound()
      let param = req.allParams()
      let sup
      if (_.has(param, 'find')) sup = await SupplierSrv.find(param.find)
      else if (_.has(param, 'findOne')) sup = await SupplierSrv.findOne(param.findOne)
      else sup = await SupplierSrv.find({})
      res.json(sup)
    } catch (err) {
      res.serverError(err)
    }
  },
  async add(req, res) {
    try {
      if (req.method !== 'POST') return res.notFound()
      let supplier = await SupplierSrv.add(req.allParams())
      res.json(supplier)
    } catch (err) {
      res.serverError(err)
    }
  },
  async update(req, res) {
    try {
      if (req.method !== 'POST') return res.notFound()
      let supplier = await SupplierSrv.update(req.allParams())
      res.json(supplier)
    } catch (err) {
      res.serverError(err)
    }
  },
  async delete(req, res) {
    try {
      if (req.method !== 'POST') return res.notFound()
      await SupplierSrv.delete(req.allParams())
      res.json({})
    } catch (err) {
      res.serverError(err)
    }
  }
}
