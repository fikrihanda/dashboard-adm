module.exports = {
  attributes: {
    name: 'string',
    barang: {
      collection: 'barang',
      via: 'kategori'
    }
  }
}
