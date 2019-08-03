module.exports = {
  async index(req, res) {
    try {
      if (req.method !== 'GET') return res.notFound()
      let param = req.allParams()
      let pen
      if (_.has(param, 'find')) pen = await PenjualanSrv.find(param.find)
      else if (_.has(param, 'findOne')) pen = await PenjualanSrv.findOne(param.findOne)
      else pen = await PenjualanSrv.find({})
      res.json(pen)
    } catch (err) {
      res.serverError(err)
    }
  }
}
