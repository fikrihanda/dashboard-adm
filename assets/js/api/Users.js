import tools from '@/js/utils/tools'

export default {
  async session() {
    try {
      let user = await $.get('/api/auth/session')
      return user
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async login(field) {
    try {
      let user = await $.post('/api/auth/login', field)
      return user
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async upload(field) {
    try {
      let avatar = await $.post({
        url: '/api/auth/update',
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
      let profile = await $.post('/api/auth/update', field)
      return profile
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async updatePassword(field) {
    try {
      await $.post('/api/auth/update', field)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async list() {
    try {
      let users = await $.get('/api/users')
      return users
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async add(field) {
    try {
      let users = await $.post('/api/users/add', field)
      return users
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async delete(field) {
    try {
      await $.post('/api/users/delete', field)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  }
}
