module.exports = {
  attributes: {
    total_qty: 'number',
    total_price: 'number',
    debt_type: {
      type: 'string',
      isIn: ['debt', 'paidoff'],
      defaultsTo: 'paidoff'
    },
    debt: {
      type: 'number',
      defaultsTo: 0
    },
    name_buyer: 'string',
    penbar: {
      collection: 'penbar',
      via: 'penjualan'
    }
  }
}

