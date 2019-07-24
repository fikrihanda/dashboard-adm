import tools from '@/js/utils/tools'

export default {
  async list() {
    try {
      let supplier = await $.get('/supplier')
      return supplier
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async add(field) {
    try {
      let supplier = await $.post('/supplier/add', field)
      return supplier
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async update(field) {
    try {
      let supplier = await $.post('/supplier/update', field)
      return supplier
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async delete(field) {
    try {
      await $.post('/supplier/delete', field)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  }
}
