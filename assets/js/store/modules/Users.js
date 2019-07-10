import {Users} from '@/js/api'

export default {
  state: {
    all: [],
    auth: false,
    name: '',
    email: '',
    avatar: '',
    admin: false
  },
  getters: {
    users(state) {
      return state.users
    },
    usersFind(state) {
      return function (id) {
        id = parseInt(id)
        let find =_.find(state.all, {id})
        if (_.isUndefined(find)) return {}
        return find
      }
    },
    auth(state) {
      return state.auth
    },
    name(state) {
      return state.name
    },
    email(state) {
      return state.email
    },
    avatar(state) {
      return state.avatar
    },
    admin(state) {
      return state.admin
    },
    user(state) {
      return _.pick(state, ['name', 'email', 'avatar', 'admin'])
    }
  },
  mutations: {
    setUsers(state, users) {
      state.all = users
    },
    addUsers(state, users) {
      state.all.push(users)
    },
    deleteUsers(state, id) {
      id = parseInt(id)
      let index = _.findIndex(state.all, {id})
      if (index === -1) return
      state.all.splice(index, 1)
    },
    setAuth(state, auth) {
      state.auth = auth
    },
    setName(state, name) {
      state.name = name
    },
    setEmail(state, email) {
      state.email = email
    },
    setAvatar(state, avatar) {
      state.avatar = avatar
    },
    setAdmin(state, admin) {
      state.admin = admin
    },
    setUser(state, user) {
      _.forEach(user, function (val, index) {
        if (index === 'name' || index === 'email' || index === 'avatar' || index === 'admin')
          state[index] = user[index]
      })
    }
  },
  actions: {
    async session({commit, getters}) {
      try {
        let user = await Users.session()
        if (!getters.auth) commit('setAuth', true)
        commit('setUser', user)
      } catch (err) {
        if (getters.auth) commit('setAuth', false)
        commit('setUser', {
          name: '',
          email: '',
          avatar: ''
        })
      }
      return Promise.resolve()
    },
    async login({commit, getters}, field) {
      try {
        let user = await Users.login(field)
        if (!getters.auth) commit('setAuth', true)
        commit('setUser', user)
        return Promise.resolve()
      } catch (err) {
        if (getters.auth) commit('setAuth', false)
        commit('setUser', {
          name: '',
          email: '',
          avatar: ''
        })
        return Promise.reject(err)
      }
    },
    async upload({commit}, field) {
      try {
        let avatar = await Users.upload(field)
        commit('setAvatar', avatar)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async updateProfile({commit}, field) {
      try {
        let profile = await Users.updateProfile(field)
        commit('setUser', profile)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async updatePassword({commit}, field) {
      try {
        await Users.updatePassword(field)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async list({commit}) {
      try {
        let users = await Users.list()
        commit('setUsers', users)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async add({commit}, field) {
      try {
        let users = await Users.add(field)
        commit('addUsers', users)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    },
    async delete({commit}, field) {
      try {
        await Users.delete(field)
        commit('deleteUsers', field.id)
        return Promise.resolve()
      } catch (err) {
        return Promise.reject(err)
      }
    }
  }
}
