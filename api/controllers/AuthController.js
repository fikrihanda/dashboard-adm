module.exports = {
  async session(req, res) {
    try {
      if (req.method !== 'GET') return res.notFound()
      let user = await AuthSrv.session(req.session.user)
      res.json(user)
    } catch (err) {
      delete req.session.user
      if (err.name === 'SesNotFound' || err.name === 'UserNotFound')
        return res.badRequest({
          name: err.name,
          message: err.message
        })
      res.serverError(err)
    }
  },
  async register(req, res) {
    try {
      if (req.method !== 'POST') return res.notFound()
      await AuthSrv.register(req.allParams())
      res.json({})
    } catch (err) {
      res.serverError(err)
    }
  },
  async login(req, res) {
    try {
      if (req.method !== 'POST') return res.notFound()
      let user = await AuthSrv.login(req.allParams())
      req.session.user = _.pick(user, ['username', 'admin', 'id'])
      res.json(
        _.pick(user, ['name', 'admin', 'email', 'avatar'])
      )
    } catch (err) {
      if (err.name === 'UserNotFound' || err.name === 'PassWrong')
        return res.badRequest({
          name: err.name,
          message: err.message
        })
      res.serverError(err)
    }
  },
  logout(req, res) {
    delete req.session.user
    return res.json({})
  },
  async update(req, res) {
    try {
      if (req.method !== 'POST') return res.notFound()
      let {method} = req.allParams()
      if (method === 'upload') {
        let avatar = await AuthSrv.upload(req.file('avatar'), req.session.user)
        return res.json(avatar)
      } else if (method === 'profile') {
        let user = await AuthSrv.updateProfile(req.allParams(), req.session.user)
        return res.json(user)
      } else if (method === 'password') {
        await AuthSrv.updatePassword(req.allParams(), req.session.user)
        return res.json({})
      }
      res.notFound()
    } catch (err) {
      if (err.name === 'UserNotFound') {
        delete req.session.user
        return res.badRequest({
          name: err.name,
          message: err.message
        })
      }
      res.serverError(err)
    }
  }
}
