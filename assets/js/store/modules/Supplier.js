import {Supplier} from '@/js/api'

export default {
  state: {
    all: [],
    id: '',
    name: '',
    street: '',
    phone: [],
    bank: []
  },
  getters: {
    suppliers(state) {
      return state.all
    },
    suppliersFind(state) {
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
    street(state) {
      return state.street
    },
    phone(state) {
      return state.phone
    },
    bank(state) {
      return state.bank
    }
  },
  mutations: {
    setSuppliers(state, sups) {
      state.all = sups
    },
    addSuppliers(state, sup) {
      state.all.push(sup)
    },
    updateSuppliers(state, sup) {
      let index = _.findIndex(state.all, {id: sup.id})
      if (index === -1) return
      state.all.splice(index, 1, sup)
    },
    deleteSuppliers(state, id) {
      id = parseInt(id)
      let index = _.findIndex(state.all, {id})
      if (index === -1) return
      state.all.splice(index, 1)
    },
    deleteAllSuppliers(state) {
      state.all = []
    },
    setId(state, id) {
      id = parseInt(id)
      state.id = id
    },
    setName(state, name) {
      state.name = name
    },
    setStreet(state, street) {
      state.street = street
    },
    setBank(state, bank) {
      state.bank = bank
    }
  },
  actions: {
    async list({commit}) {
      try {
        let supplier = await Supplier.list()
        commit('setSuppliers', supplier)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async add({commit}, field) {
      try {
        let supplier = await Supplier.add(field)
        commit('addSuppliers', supplier)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async update({commit}, field) {
      try {
        let supplier = await Supplier.update(field)
        commit('updateSuppliers', supplier)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async delete({commit}, field) {
      try {
        let {id} = field
        await Supplier.delete(field)
        commit('deleteSuppliers', id)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
