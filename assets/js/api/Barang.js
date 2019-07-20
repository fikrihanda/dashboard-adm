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
  }
}
