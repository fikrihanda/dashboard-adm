import {Penjualan} from '@/js/api'

export default {
  state: {
    all: [],
    id: '',
    total_qty: '',
    total_price: '',
    debt_type: '',
    debt: {
      type: '',
      number: ''
    },
    name_buyer: '',
    barang: []
  },
  getters: {
    penjualans(state) {
      return state.all
    },
    penjualansFind(state) {
      return function (id) {
        id = parseInt(id)
        let find =_.find(state.all, {id})
        if (_.isUndefined(find)) return
        return find
      }
    },
    id(state) {
      return state.id
    },
    totalQty(state) {
      return state.total_qty
    },
    totalPrice(state) {
      return state.total_price
    },
    debt(state) {
      return state.debt
    },
    nameBuyer(state) {
      return state.name_buyer
    },
    barang(state) {
      return state.barang
    }
  },
  mutations: {
    setPenjualans(state, pens) {
      state.all = pens
    },
    addPenjualans(state, pen) {
      state.all.push(pen)
    },
    updatePenjualans(state, pen) {
      let index = _.findIndex(state.all, {id: pen.id})
      if (index === -1) return
      state.all.splice(index, 1, pen)
    },
    deletePenjualans(state, id) {
      id = parseInt(id)
      let index = _.findIndex(state.all, {id})
      if (index === -1) return
      state.all.splice(index, 1)
    },
    deleteAllPenjualans(state) {
      state.all = []
    },
    setId(state, id) {
      id = parseInt(id)
      state.id = id
    },
    setTotalQty(state, qty) {
      qty = parseInt(qty)
      state.total_qty = qty
    },
    setTotalPrice(state, price) {
      price = parseInt(price)
      state.total_price = price
    },
    setDebt(state, debt) {
      state.debt = debt
    },
    setNameBuyer(state, buyer) {
      state.name_buyer = buyer
    },
    setBarang(state, barang) {
      state.barang = barang
    }
  },
  actions: {
    async list({ commit }) {
      try {
        let penjualan = await Penjualan.list()
        commit('setPenjualans', penjualan)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
