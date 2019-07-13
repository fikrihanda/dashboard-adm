import tools from '@/js/utils/tools'

export default {
  async list() {
    try {
      let kategori = await $.get('/kategori')
      return kategori
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async add(field) {
    try {
      let kategori = await $.post('/kategori/add', field)
      return kategori
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async update(field) {
    try {
      let kategori = await $.post('/kategori/update', field)
      return kategori
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async delete(field) {
    try {
      await $.post('/kategori/delete', field)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  }
}
