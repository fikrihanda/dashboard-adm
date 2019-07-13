module.exports = {
  async index(req, res) {
    try {
      if (req.method !== 'GET') return res.notFound()
      let param = req.allParams()
      let user
      if (_.has(param, 'find')) user = await UsersSrv.find(param.find)
      else if (_.has(param, 'findOne'))user = await UsersSrv.findOne(param.findOne)
      else user = await UsersSrv.find({})
      res.json(user)
    } catch (err) {
      res.serverError(err)
    }
  }
}
