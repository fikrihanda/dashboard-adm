const bcrypt = require('bcrypt')

module.exports = {
  attributes: {
    username: 'string',
    password: 'string',
    name: 'string',
    email: 'string',
    avatar: {
      type: 'string',
      defaultsTo: ''
    },
    admin: {
      type: 'boolean',
      defaultsTo: false
    }
  },
  async beforeCreate(valSet, next) {
    try {
      valSet.password = await bcrypt.hash(valSet.password, 10)
      return next()
    } catch (err) {
      return next(err)
    }
  },
  async beforeUpdate(valSet, next) {
    try {
      if (_.isEmpty(valSet.password)) return next()
      valSet.password = await bcrypt.hash(valSet.password, 10)
      return next()
    } catch (err) {
      return next(err)
    }
  }
}
