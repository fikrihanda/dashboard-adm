import {Barang} from '@/js/api'

export default {
  state: {
    all: [],
    id: '',
    name: '',
    qty: '',
    price: '',
    kategori: {}
  },
  getters: {
    barangs(state) {
      return state.all
    },
    barangsFind(state) {
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
    name(state) {
      return state.name
    },
    qty(state) {
      return state.qty
    },
    price(state) {
      return state.price
    },
    kategori(state) {
      return state.kategori
    },
    barang(state) {
      return _.pick(state, [
        'id', 'name', 'qty', 'price', 'kategori'
      ])
    }
  },
  mutations: {
    setBarangs(state, bars) {
      state.all = bars
    },
    addBarangs(state, bars) {
      state.all.push(bars)
    },
    updateBarangs(state, bars) {
      let index = _.findIndex(state.all, {id: bars.id})
      if (index === -1) return
      state.all.splice(index, 1, bars)
    },
    deleteBarangs(state, id) {
      id = parseInt(id)
      let index = _.findIndex(state.all, {id})
      if (index === -1) return
      state.all.splice(index, 1)
    },
    deleteAllBarangs(state) {
      state.all = []
    },
    setId(state, id) {
      state.id = id
    },
    setName(state, name) {
      state.name = name
    },
    setQty(state, qty) {
      state.qty = qty
    },
    setPrice(state, price) {
      state.price = price
    },
    setKategori(state, kategori) {
      state.kategori = kategori
    },
    setBarang(state, bars) {
      _.forEach(bars, function (val, index) {
        if (index === 'id' || index === 'name' || name === 'qty' || name === 'price' || name === 'kategori')
          state[index] = val
      })
    }
  },
  actions: {
    async list({commit}) {
      try {
        let barangs = await Barang.list()
        commit('setBarangs', barangs)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async add({commit}, field) {
      try {
        let barang = await Barang.add(field)
        commit('addBarangs', barang)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async update({commit}, field) {
      try {
        let barang = await Barang.update(field)
        commit('updateBarangs', barang)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async delete({commit}, field) {
      try {
        let {id} = field
        await Barang.delete(field)
        commit('deleteBarangs', id)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
