import tools from '@/js/utils/tools'

export default {
  async list() {
    try {
      let barang = await $.get('/barang')
      return barang
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async add(field) {
    try {
      let barang = await $.post('/barang/add', field)
      return barang
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async update(field) {
    try {
      let barang = await $.post('/barang/update', field)
      return barang
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  },
  async delete(field) {
    try {
      await $.post('/barang/delete', field)
      return Promise.resolve()
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  }
}
