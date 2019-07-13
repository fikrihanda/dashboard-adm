import tools from '@/js/utils/tools'

export default {
  async session() {
    try {
      let user = await $.get('/auth/session')
      return user
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async login(field) {
    try {
      let user = await $.post('/auth/login', field)
      return user
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async register(field) {
    try {
      await $.post('/auth/register', field)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async logout() {
    try {
      await $.get('/auth/logout')
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async upload(field) {
    try {
      let avatar = await $.post({
        url: '/auth/update',
        data: field,
        processData: false,
        contentType: false
      })
      return avatar
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async updateProfile(field) {
    try {
      let profile = await $.post('/auth/update', field)
      return profile
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async updatePassword(field) {
    try {
      await $.post('/auth/update', field)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async checkUsername(field) {
    try {
      let {username} = field
      let check = await $.get('/users', {
        findOne: {username}
      })
      return _.isEmpty(check)
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async list() {
    try {
      let users = await $.get('/users')
      return users
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async add(field) {
    try {
      let users = await $.post('/users/add', field)
      return users
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async delete(field) {
    try {
      await $.post('/users/delete', field)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  }
}
