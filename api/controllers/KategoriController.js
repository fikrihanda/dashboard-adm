module.exports = {
  async index(req, res) {
    try {
      if (req.method !== 'GET') return res.notFound()
      let param = req.allParams()
      let kat
      if (_.has(param, 'find')) kat = await KategoriSrv.find(param.find)
      else if (_.has(param, 'findOne')) kat = await KategoriSrv.findOne(param.findOne)
      else kat = await KategoriSrv.find({})
      res.json(kat)
    } catch (err) {
      res.serverError(err)
    }
  },
  async add(req, res) {
    try {
      if (req.method !== 'POST') return res.notFound()
      let kategori = await KategoriSrv.add(req.allParams())
      res.json(kategori)
    } catch (err) {
      res.serverError(err)
    }
  },
  async update(req, res) {
    try {
      if (req.method !== 'POST') return res.notFound()
      let kategori = await KategoriSrv.update(req.allParams())
      res.json(kategori)
    } catch (err) {
      res.serverError(err)
    }
  },
  async delete(req, res) {
    try {
      if (req.method !== 'POST') return res.notFound()
      await KategoriSrv.delete(req.allParams())
      res.json({})
    } catch (err) {
      res.serverError(err)
    }
  }
}
