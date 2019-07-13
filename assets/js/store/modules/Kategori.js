import {Kategori} from '@/js/api'

export default {
  state: {
    all: [],
    id: '',
    name: ''
  },
  getters: {
    kategoris(state) {
      return state.all
    },
    kategorisFind(state) {
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
    kategori(state) {
      return _.pick(state, ['id', 'name'])
    }
  },
  mutations: {
    setKategoris(state, kats) {
      state.all = kats
    },
    addKategoris(state, kats) {
      state.all.push(kats)
    },
    updateKategoris(state, kats) {
      let index = _.findIndex(state.all, {id: kats.id})
      if (index === -1) return
      state.all.splice(index, 1, kats)
    },
    deleteKategoris(state, id) {
      id = parseInt(id)
      let index = _.findIndex(state.all, {id})
      if (index === -1) return
      state.all.splice(index, 1)
    },
    deleteAllKategoris(state) {
      state.all = []
    },
    setId(state, id) {
      id = parseInt(id)
      state.id = id
    },
    setName(state, name) {
      state.name = name
    },
    setKategori(state, kat) {
      _.forEach(kat, function (val, index) {
        if (index === 'id' || index === 'name')
          state[index] = val
      })
    }
  },
  actions: {
    async list({commit}) {
      try {
        let kategoris = await Kategori.list()
        commit('setKategoris', kategoris)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async add({commit}, field) {
      try {
        let kategori = await Kategori.add(field)
        commit('addKategoris', kategori)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async update({commit}, field) {
      try {
        let kategori = await Kategori.update(field)
        commit('updateKategoris', kategori)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async delete({commit}, field) {
      try {
        let {id} = field
        await Kategori.delete(field)
        commit('deleteKategoris', id)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
