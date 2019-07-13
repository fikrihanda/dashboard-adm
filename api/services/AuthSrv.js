const bcrypt = require('bcrypt')
const path = require('path')
const fs = require('fs')
const moment = require('moment')
const crypto = require('crypto')

module.exports = {
  async session(dataSes) {
    try {
      if (_.isEmpty(dataSes)) return Promise.reject(
        ErrorSrv({
          name: 'SesNotFound',
          code: 'E_SESSION_NOTFOUND',
          message: 'Session tidak ada'
        })
      )
      let {username, id} = dataSes
      let user = await Users.findOne({username, id})
      if (_.isEmpty(user)) return Promise.reject(
        ErrorSrv({
          name: 'UserNotFound',
          code: 'E_USER_NOTFOUND',
          message: 'User tidak ada'
        })
      )
      return _.pick(user, ['name', 'email', 'avatar', 'admin'])
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
  async register(dataParam) {
    try {
      let {name, username, email, password} = dataParam
      await Users.create({
        name, username, email, password
      })
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
  },
  async login(dataParam) {
    try {
      let {username, password} = dataParam
      let user = await Users.findOne({username})
      if (_.isEmpty(user)) return Promise.reject(
        ErrorSrv({
          name: 'UserNotFound',
          code: 'E_USERNAME_NOTFOUND',
          message: 'Username anda tidak ada'
        })
      )
      let check = await bcrypt.compare(password, user.password)
      if (!check) return Promise.reject(
        ErrorSrv({
          name: 'PassWrong',
          code: 'E_PASSWORD_WRONG',
          message: 'Password anda salah'
        })
      )
      return user
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
  async upload(reqFile, dataSes) {
    try {
      let {username, id} = dataSes
      let user = await Users.findOne({username, id})
      if (_.isEmpty(user)) return Promise.reject(
        ErrorSrv({
          name: 'UserNotFound',
          code: 'E_USER_NOTFOUND',
          message: 'Username tidak ada'
        })
      )
      if (!_.isEmpty(user.avatar)) {
        let delPath = path.resolve(sails.config.appPath, '.tmp/public/uploads/' + user.avatar)
        fs.unlinkSync(delPath)
      }
      let date = moment().format()
      let nameImg = crypto.createHmac('sha256', 'dashboard-adm')
        .update(user.username + '-' + date)
        .digest('hex') + '.png'
      await sails.uploadOne(reqFile, {
        maxBytes: 3500000,
        dirname: path.resolve(sails.config.appPath, '.tmp/public/uploads/' + user.username),
        saveAs: nameImg
      })
      let {avatar} = await Users.updateOne({
        username: user.username
      }).set({
        avatar: user.username + '/' + nameImg
      })
      return avatar
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
  async updateProfile(dataParam, dataSes) {
    try {
      let {username, id} = dataSes
      let user = await Users.findOne({username, id})
      if (_.isEmpty(user)) return Promise.reject(
        ErrorSrv({
          name: 'UserNotFound',
          code: 'E_USER_NOTFOUND',
          message: 'Username tidak ada'
        })
      )
      let {name, email} = dataParam
      let userUpdate = await Users.updateOne({
        username, id
      }).set({
        name, email
      })
      return _.pick(userUpdate, ['name', 'email'])
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
  async updatePassword(dataParam, dataSes) {
    try {
      let {username, id} = dataSes
      let user = await Users.findOne({username, id})
      if (_.isEmpty(user)) return Promise.reject(
        ErrorSrv({
          name: 'UserNotFound',
          code: 'E_USER_NOTFOUND',
          message: 'Username tidak ada'
        })
      )
      let {password} = dataParam
      await Users.updateOne({
        username, id
      }).set({password})
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
