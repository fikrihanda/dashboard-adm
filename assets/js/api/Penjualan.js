import tools from '@/js/utils/tools'

export default {
  async list() {
    try {
      let penjualan = await $.get('/penjualan')
      return penjualan
    } catch (err) {
      return Promise.reject(
        tools.error(err)
      )
    }
  }
}
